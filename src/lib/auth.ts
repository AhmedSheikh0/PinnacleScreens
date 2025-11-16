// خدمات المصادقة والتخويل
import { User, Role, Permission } from '../types';
import { currentUser } from '../data/mockData';

class AuthService {
  private static instance: AuthService;
  private user: User | null = null;

  private constructor() {
    // محاكاة تسجيل الدخول
    this.user = currentUser;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public getCurrentUser(): User | null {
    return this.user;
  }

  public login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // محاكاة عملية تسجيل الدخول
      setTimeout(() => {
        if (email && password) {
          this.user = currentUser;
          resolve(currentUser);
        } else {
          reject(new Error('بيانات تسجيل الدخول غير صحيحة'));
        }
      }, 1000);
    });
  }

  public logout(): void {
    this.user = null;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public hasRole(roleId: string): boolean {
    if (!this.user) return false;
    return this.user.roles.some(role => role.id === roleId);
  }

  public hasPermission(action: string, resource: string): boolean {
    if (!this.user) return false;
    
    return this.user.roles.some(role => 
      role.permissions.some(permission => 
        permission.action === action && permission.resource === resource
      )
    );
  }

  public canAccessDepartment(department: string): boolean {
    if (!this.user) return false;
    
    // CAE و Audit Manager يمكنهم الوصول لجميع الأقسام
    if (this.hasRole('cae') || this.hasRole('audit_manager')) {
      return true;
    }
    
    // Process Owner يمكنه الوصول فقط لقسمه
    if (this.hasRole('process_owner')) {
      return this.user.department === department;
    }
    
    return false;
  }
}

export const authService = AuthService.getInstance();

// Hook للاستخدام في المكونات
export const useAuth = () => {
  return {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    hasPermission: authService.hasPermission.bind(authService),
    canAccessDepartment: authService.canAccessDepartment.bind(authService)
  };
};