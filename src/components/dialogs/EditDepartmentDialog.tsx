import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { OrganizationalUnit } from '@/types';
import { users } from '@/data/mockData';

interface EditDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditDepartment: (department: OrganizationalUnit) => void;
  department: OrganizationalUnit | null;
}

export function EditDepartmentDialog({ 
  open, 
  onOpenChange, 
  onEditDepartment, 
  department 
}: EditDepartmentDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    managerId: ''
  });

  const availableManagers = users.filter(user => 
    user.roles.some(role => ['cae', 'audit_manager', 'process_owner'].includes(role.id))
  );

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        nameAr: department.nameAr,
        managerId: department.managerId || ''
      });
    }
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!department) return;

    const updatedDepartment: OrganizationalUnit = {
      ...department,
      name: formData.name,
      nameAr: formData.nameAr,
      managerId: formData.managerId
    };

    onEditDepartment(updatedDepartment);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>تعديل القسم</DialogTitle>
          <DialogDescription>
            تعديل بيانات القسم
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameAr">اسم القسم بالعربية *</Label>
            <Input
              id="nameAr"
              value={formData.nameAr}
              onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
              placeholder="أدخل اسم القسم"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">اسم القسم بالإنجليزية</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter department name"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label>مدير القسم</Label>
            <Select
              value={formData.managerId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, managerId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر مدير القسم" />
              </SelectTrigger>
              <SelectContent>
                {availableManagers.map(manager => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name} - {manager.position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}