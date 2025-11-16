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
import { OrganizationalUnit } from '@/types';

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCompany: (company: OrganizationalUnit) => void;
}

export function AddCompanyDialog({ open, onOpenChange, onAddCompany }: AddCompanyDialogProps) {
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    code: '',
    description: '',
    industry: '',
    location: '',
    establishedYear: '',
    ceoName: '',
    ceoEmail: ''
  });

  const industries = [
    'التصنيع',
    'التجارة',
    'الخدمات المالية',
    'التقنية',
    'الصحة',
    'التعليم',
    'النقل واللوجستيات',
    'الطاقة',
    'العقارات',
    'الاتصالات',
    'أخرى'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCompany: OrganizationalUnit = {
      id: `company_${Date.now()}`,
      name: formData.nameEn,
      nameAr: formData.nameAr,
      code: formData.code,
      type: 'company',
      managerId: `ceo_${Date.now()}`,
      employees: [
        {
          id: `ceo_${Date.now()}`,
          name: formData.ceoName,
          position: 'الرئيس التنفيذي',
          email: formData.ceoEmail,
          department: 'الإدارة العليا',
          isActive: true,
          roles: []
        }
      ],
      children: []
    };

    onAddCompany(newCompany);
    
    // إعادة تعيين النموذج
    setFormData({
      nameAr: '',
      nameEn: '',
      code: '',
      description: '',
      industry: '',
      location: '',
      establishedYear: '',
      ceoName: '',
      ceoEmail: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة شركة جديدة</DialogTitle>
          <DialogDescription>
            أدخل بيانات الشركة الجديدة لإنشاء هيكل تنظيمي جديد
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* معلومات الشركة الأساسية */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">معلومات الشركة الأساسية</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">اسم الشركة بالعربية *</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                  placeholder="أدخل اسم الشركة بالعربية"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameEn">اسم الشركة بالإنجليزية *</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                  placeholder="Company Name in English"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">رمز الشركة *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="COMP"
                  required
                  maxLength={10}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">القطاع *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">المقر الرئيسي</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="المدينة، البلد"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="establishedYear">سنة التأسيس</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: e.target.value }))}
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الشركة</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف مختصر عن نشاط الشركة وأهدافها..."
                rows={3}
              />
            </div>
          </div>

          {/* معلومات الرئيس التنفيذي */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">معلومات الرئيس التنفيذي</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ceoName">اسم الرئيس التنفيذي *</Label>
                <Input
                  id="ceoName"
                  value={formData.ceoName}
                  onChange={(e) => setFormData(prev => ({ ...prev, ceoName: e.target.value }))}
                  placeholder="أدخل اسم الرئيس التنفيذي"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ceoEmail">البريد الإلكتروني للرئيس التنفيذي *</Label>
                <Input
                  id="ceoEmail"
                  type="email"
                  value={formData.ceoEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, ceoEmail: e.target.value }))}
                  placeholder="ceo@company.com"
                  required
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit">
              إنشاء الشركة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}