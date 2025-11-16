// منطق الصلاحيات والأدوار
import { Role, Permission, User } from '../types';

export class PermissionManager {
  private static instance: PermissionManager;

  private constructor() {}

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  // التحقق من صلاحية محددة
  public checkPermission(user: User, action: string, resource: string, context?: Record<string, unknown>): boolean {
    if (!user || !user.roles) return false;

    // التحقق من الصلاحيات الأساسية
    const hasBasicPermission = user.roles.some(role =>
      role.permissions.some(permission =>
        permission.action === action && permission.resource === resource
      )
    );

    if (!hasBasicPermission) return false;

    // تطبيق القيود السياقية
    return this.applyContextualRestrictions(user, action, resource, context);
  }

  // تطبيق القيود السياقية
  private applyContextualRestrictions(user: User, action: string, resource: string, context?: Record<string, unknown>): boolean {
    // قيود خاصة بـ Process Owner
    if (user.roles.some(role => role.id === 'process_owner')) {
      // يمكن للـ Process Owner الوصول فقط للبيانات الخاصة بقسمه
      if (resource === 'FINDINGS' && action === 'VIEW_DEPARTMENT') {
        return context?.department === user.department;
      }
      
      if (resource === 'FINDING_RESPONSE' && action === 'SUBMIT') {
        return context?.processOwner === user.id;
      }
      
      if (resource === 'ACTION_STATUS' && action === 'UPDATE') {
        return context?.processOwner === user.id;
      }
    }

    // قيود خاصة بالمراجعين
    if (user.roles.some(role => role.id === 'auditor')) {
      // المراجع يمكنه التعديل فقط على المراجعات المعينة له
      if (resource === 'WORKING_PAPERS' || resource === 'FINDINGS') {
        const assignedAuditors = context?.assignedAuditors as string[] | undefined;
        return assignedAuditors?.includes(user.id) ?? false;
      }
    }

    // قيود الحالة - لا يمكن التعديل على التقارير المعتمدة
    if (action === 'EDIT' && resource === 'AUDIT_REPORT') {
      return context?.status === 'draft';
    }

    return true;
  }

  // الحصول على جميع الصلاحيات للمستخدم
  public getUserPermissions(user: User): Permission[] {
    if (!user || !user.roles) return [];

    const allPermissions: Permission[] = [];
    user.roles.forEach(role => {
      allPermissions.push(...role.permissions);
    });

    // إزالة الصلاحيات المكررة
    return allPermissions.filter((permission, index, self) =>
      index === self.findIndex(p => p.id === permission.id)
    );
  }

  // التحقق من إمكانية الوصول للقسم
  public canAccessDepartment(user: User, department: string): boolean {
    if (!user) return false;

    // الأدوار العليا يمكنها الوصول لجميع الأقسام
    const highLevelRoles = ['cae', 'audit_manager', 'senior_management', 'audit_committee'];
    if (user.roles.some(role => highLevelRoles.includes(role.id))) {
      return true;
    }

    // Process Owner يمكنه الوصول فقط لقسمه
    if (user.roles.some(role => role.id === 'process_owner')) {
      return user.department === department;
    }

    return false;
  }

  // التحقق من مستوى الدور
  public hasMinimumRoleLevel(user: User, minimumLevel: number): boolean {
    if (!user || !user.roles) return false;
    
    return user.roles.some(role => role.level <= minimumLevel);
  }

  // الحصول على الأقسام المسموح للمستخدم بالوصول إليها
  public getAccessibleDepartments(user: User, allDepartments: string[]): string[] {
    if (!user) return [];

    // الأدوار العليا يمكنها الوصول لجميع الأقسام
    const highLevelRoles = ['cae', 'audit_manager', 'senior_management', 'audit_committee'];
    if (user.roles.some(role => highLevelRoles.includes(role.id))) {
      return allDepartments;
    }

    // Process Owner يمكنه الوصول فقط لقسمه
    if (user.roles.some(role => role.id === 'process_owner')) {
      return [user.department];
    }

    return [];
  }
}

export const permissionManager = PermissionManager.getInstance();

// دوال مساعدة للاستخدام في المكونات
export const checkPermission = (user: User, action: string, resource: string, context?: Record<string, unknown>): boolean => {
  return permissionManager.checkPermission(user, action, resource, context);
};

export const canAccessDepartment = (user: User, department: string): boolean => {
  return permissionManager.canAccessDepartment(user, department);
};

export const hasMinimumRoleLevel = (user: User, minimumLevel: number): boolean => {
  return permissionManager.hasMinimumRoleLevel(user, minimumLevel);
};