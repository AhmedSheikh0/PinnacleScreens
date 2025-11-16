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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Finding } from '@/types';
import { users } from '@/data/mockData';

interface AddFindingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFinding: (finding: Omit<Finding, 'id'>) => void;
}

export function AddFindingDialog({ open, onOpenChange, onAddFinding }: AddFindingDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    recommendation: '',
    severity: 'medium' as Finding['severity'],
    department: '',
    processOwner: '',
    targetDate: undefined as Date | undefined,
    auditId: 'audit_001'
  });

  const departments = [
    'المراجعة الداخلية',
    'المالية',
    'الموارد البشرية',
    'العمليات',
    'تقنية المعلومات',
    'إدارة المخاطر'
  ];

  const severityLevels = [
    { value: 'low', label: 'منخفضة', color: 'text-blue-600' },
    { value: 'medium', label: 'متوسطة', color: 'text-yellow-600' },
    { value: 'high', label: 'عالية', color: 'text-orange-600' },
    { value: 'critical', label: 'حرجة', color: 'text-red-600' }
  ];

  const processOwners = users.filter(user => 
    user.roles.some(role => role.id === 'process_owner')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFinding: Omit<Finding, 'id'> = {
      auditId: formData.auditId,
      title: formData.title,
      description: formData.description,
      recommendation: formData.recommendation,
      severity: formData.severity,
      department: formData.department,
      processOwner: formData.processOwner,
      status: 'open',
      issuedDate: new Date(),
      targetDate: formData.targetDate,
      responses: []
    };

    onAddFinding(newFinding);
    
    // إعادة تعيين النموذج
    setFormData({
      title: '',
      description: '',
      recommendation: '',
      severity: 'medium',
      department: '',
      processOwner: '',
      targetDate: undefined,
      auditId: 'audit_001'
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
          <DialogDescription>
            أدخل تفاصيل الملاحظة والتوصية المقترحة
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان الملاحظة *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان الملاحظة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">وصف الملاحظة *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="اكتب وصفاً تفصيلياً للملاحظة..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendation">التوصية *</Label>
            <Textarea
              id="recommendation"
              value={formData.recommendation}
              onChange={(e) => setFormData(prev => ({ ...prev, recommendation: e.target.value }))}
              placeholder="اكتب التوصية المقترحة لمعالجة الملاحظة..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>مستوى الأولوية *</Label>
              <Select
                value={formData.severity}
                onValueChange={(value: Finding['severity']) => setFormData(prev => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مستوى الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>القسم المعني *</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>مالك العملية *</Label>
              <Select
                value={formData.processOwner}
                onValueChange={(value) => setFormData(prev => ({ ...prev, processOwner: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر مالك العملية" />
                </SelectTrigger>
                <SelectContent>
                  {processOwners.map(owner => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {owner.name} - {owner.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>الموعد المستهدف للإنجاز</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.targetDate ? (
                      format(formData.targetDate, "PPP", { locale: ar })
                    ) : (
                      <span>اختر التاريخ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.targetDate}
                    onSelect={(date) => setFormData(prev => ({ ...prev, targetDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              إضافة الملاحظة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}