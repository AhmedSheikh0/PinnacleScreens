import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Building2,
  Users,
  Mail,
  MapPin,
  Calendar,
  Factory,
  Edit,
  Trash2
} from 'lucide-react';
import { OrganizationalUnit } from '@/types';

interface CompanyDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: OrganizationalUnit | null;
  onEdit: () => void;
  onDelete: () => void;
}

export function CompanyDetailsDialog({ 
  open, 
  onOpenChange, 
  company, 
  onEdit, 
  onDelete 
}: CompanyDetailsDialogProps) {
  if (!company) return null;

  const ceo = company.employees.find(emp => emp.position === 'الرئيس التنفيذي');
  
  const getTotalEmployees = (unit: OrganizationalUnit): number => {
    let count = unit.employees.length;
    if (unit.children) {
      unit.children.forEach(child => {
        count += getTotalEmployees(child);
      });
    }
    return count;
  };

  const getTotalDepartments = (unit: OrganizationalUnit): number => {
    let count = unit.children?.length || 0;
    if (unit.children) {
      unit.children.forEach(child => {
        count += getTotalDepartments(child);
      });
    }
    return count;
  };

  const getMaxDepth = (unit: OrganizationalUnit, currentDepth: number = 0): number => {
    let maxDepth = currentDepth;
    if (unit.children && unit.children.length > 0) {
      unit.children.forEach(child => {
        const childDepth = getMaxDepth(child, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      });
    }
    return maxDepth;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Building2 className="h-6 w-6 text-purple-600" />
              <div>
                <DialogTitle className="text-xl">{company.nameAr}</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {company.name}
                </DialogDescription>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800">
              {company.code}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات الشركة الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">إجمالي الموظفين</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{getTotalEmployees(company)}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">الوحدات التنظيمية</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{getTotalDepartments(company) + 1}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <Factory className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">مستويات الهيكل</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{getMaxDepth(company) + 1}</p>
            </div>
          </div>

          {/* معلومات الرئيس التنفيذي */}
          {ceo && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 flex items-center space-x-2 space-x-reverse">
                <Users className="h-5 w-5 text-gray-600" />
                <span>الرئيس التنفيذي</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium">{ceo.name}</span>
                  <Badge variant={ceo.isActive ? 'default' : 'secondary'}>
                    {ceo.isActive ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{ceo.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* القطاعات الرئيسية */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center space-x-2 space-x-reverse">
              <Factory className="h-5 w-5 text-gray-600" />
              <span>القطاعات الرئيسية ({company.children?.length || 0})</span>
            </h3>
            {company.children && company.children.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {company.children.map(division => (
                  <div key={division.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Factory className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{division.nameAr}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge variant="outline" className="text-xs">
                        {division.children?.length || 0} إدارة
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {division.employees.length} موظف
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">لا توجد قطاعات مضافة بعد</p>
            )}
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex justify-end space-x-2 space-x-reverse pt-4 border-t">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 ml-1" />
              تعديل الشركة
            </Button>
            <Button variant="outline" onClick={onDelete} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 ml-1" />
              حذف الشركة
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}