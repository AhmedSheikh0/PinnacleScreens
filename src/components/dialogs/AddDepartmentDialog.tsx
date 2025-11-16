import { useState } from 'react';
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

interface AddDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDepartment: (department: Omit<OrganizationalUnit, 'id' | 'children'>) => void;
  parentId?: string;
}

export function AddDepartmentDialog({ 
  open, 
  onOpenChange, 
  onAddDepartment, 
  parentId 
}: AddDepartmentDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    managerId: ''
  });

  const availableManagers = users.filter(user => 
    user.roles.some(role => ['cae', 'audit_manager', 'process_owner'].includes(role.id))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDepartment: Omit<OrganizationalUnit, 'id' | 'children'> = {
      name: formData.name,
      nameAr: formData.nameAr,
      managerId: formData.managerId,
      parentId: parentId,
      employees: []
    };

    onAddDepartment(newDepartment);
    
    // إعادة تعيين النموذج
    setFormData({
      name: '',
      nameAr: '',
      managerId: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة قسم جديد</DialogTitle>
          <DialogDescription>
            أدخل بيانات القسم الجديد
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
              إضافة القسم
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}