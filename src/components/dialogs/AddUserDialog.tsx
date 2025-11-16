import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { roles } from '@/data/mockData';
import { User, Role } from '@/types';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: Omit<User, 'id'>) => void;
}

export function AddUserDialog({ open, onOpenChange, onAddUser }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    selectedRoles: [] as string[],
    isActive: true
  });

  const departments = [
    'المراجعة الداخلية',
    'المالية',
    'الموارد البشرية',
    'العمليات',
    'تقنية المعلومات',
    'إدارة المخاطر'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedRoleObjects = roles.filter(role => 
      formData.selectedRoles.includes(role.id)
    );

    const newUser: Omit<User, 'id'> = {
      name: formData.name,
      email: formData.email,
      position: formData.position,
      department: formData.department,
      roles: selectedRoleObjects,
      isActive: formData.isActive,
      lastLogin: new Date()
    };

    onAddUser(newUser);
    
    // إعادة تعيين النموذج
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      selectedRoles: [],
      isActive: true
    });
    
    onOpenChange(false);
  };

  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        selectedRoles: [...prev.selectedRoles, roleId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        selectedRoles: prev.selectedRoles.filter(id => id !== roleId)
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات المستخدم الجديد وحدد الأدوار المناسبة
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="أدخل الاسم الكامل"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@company.com"
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">المنصب *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                placeholder="أدخل المنصب"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">القسم *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>الأدوار والصلاحيات *</Label>
            <div className="grid grid-cols-2 gap-2 p-4 border rounded-lg">
              {roles.map(role => (
                <div key={role.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={role.id}
                    checked={formData.selectedRoles.includes(role.id)}
                    onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                  />
                  <Label htmlFor={role.id} className="text-sm font-normal">
                    {role.nameAr}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked as boolean }))}
            />
            <Label htmlFor="isActive">تفعيل المستخدم</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              إضافة المستخدم
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}