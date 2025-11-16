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
import { Policy } from '@/types';

interface AddPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPolicy: (policy: Omit<Policy, 'id'>) => void;
}

export function AddPolicyDialog({ open, onOpenChange, onAddPolicy }: AddPolicyDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    type: 'policy' as Policy['type'],
    department: '',
    version: '1.0',
    status: 'draft' as Policy['status'],
    content: '',
    sections: []
  });

  const departments = [
    'المراجعة الداخلية',
    'المالية',
    'الموارد البشرية',
    'العمليات',
    'تقنية المعلومات',
    'إدارة المخاطر'
  ];

  const policyTypes = [
    { value: 'policy', label: 'سياسة' },
    { value: 'procedure', label: 'إجراء' },
    { value: 'manual', label: 'دليل' },
    { value: 'form', label: 'نموذج' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPolicy: Omit<Policy, 'id'> = {
      title: formData.title,
      titleAr: formData.titleAr,
      type: formData.type,
      department: formData.department,
      version: formData.version,
      status: formData.status,
      lastUpdated: new Date(),
      content: formData.content,
      sections: []
    };

    onAddPolicy(newPolicy);
    
    // إعادة تعيين النموذج
    setFormData({
      title: '',
      titleAr: '',
      type: 'policy',
      department: '',
      version: '1.0',
      status: 'draft',
      content: '',
      sections: []
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة وثيقة جديدة</DialogTitle>
          <DialogDescription>
            أدخل بيانات السياسة أو الإجراء الجديد
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titleAr">العنوان بالعربية *</Label>
              <Input
                id="titleAr"
                value={formData.titleAr}
                onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                placeholder="أدخل العنوان بالعربية"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">العنوان بالإنجليزية</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title in English"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>نوع الوثيقة *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Policy['type']) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  {policyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>القسم المالك *</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="version">رقم الإصدار *</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="1.0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">محتوى الوثيقة *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="أدخل محتوى السياسة أو الإجراء..."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>حالة الوثيقة</Label>
            <Select
              value={formData.status}
              onValueChange={(value: Policy['status']) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="active">سارية</SelectItem>
                <SelectItem value="expired">منتهية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              حفظ الوثيقة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}