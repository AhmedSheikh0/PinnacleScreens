import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Calendar,
  Filter,
  BookOpen,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { policies as initialPolicies } from '@/data/mockData';
import { Policy } from '@/types';
import { AddPolicyDialog } from '@/components/dialogs/AddPolicyDialog';

export default function PoliciesProcedures() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [policies, setPolicies] = useState(initialPolicies);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || policy.type === selectedType;
    const matchesDepartment = selectedDepartment === 'all' || policy.department === selectedDepartment;
    
    return matchesSearch && matchesType && matchesDepartment;
  });

  const handleAddPolicy = (newPolicyData: Omit<Policy, 'id'>) => {
    const newPolicy: Policy = {
      ...newPolicyData,
      id: `pol_${(policies.length + 1).toString().padStart(3, '0')}`
    };
    setPolicies([...policies, newPolicy]);
  };

  const handleViewPolicy = (policyId: string) => {
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      alert(`عرض السياسة: ${policy.titleAr}\n\n${policy.content}`);
    }
  };

  const handleDownloadPolicy = (policyId: string) => {
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      // محاكاة تحميل الملف
      const element = document.createElement('a');
      const file = new Blob([policy.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${policy.titleAr}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const getStatusColor = (status: Policy['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Policy['status']) => {
    switch (status) {
      case 'active': return 'سارية';
      case 'draft': return 'مسودة';
      case 'expired': return 'منتهية';
      default: return 'غير محدد';
    }
  };

  const getTypeIcon = (type: Policy['type']) => {
    switch (type) {
      case 'policy': return <FileText className="h-4 w-4" />;
      case 'procedure': return <FileCheck className="h-4 w-4" />;
      case 'manual': return <BookOpen className="h-4 w-4" />;
      case 'form': return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: Policy['type']) => {
    switch (type) {
      case 'policy': return 'سياسة';
      case 'procedure': return 'إجراء';
      case 'manual': return 'دليل';
      case 'form': return 'نموذج';
      default: return 'وثيقة';
    }
  };

  const departments = ['المراجعة الداخلية', 'إدارة المخاطر', 'المالية', 'الموارد البشرية', 'العمليات'];

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مكتبة السياسات والإجراءات</h1>
          <p className="text-gray-600">إدارة وتنظيم السياسات والإجراءات المؤسسية</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-1" />
            إضافة وثيقة جديدة
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير الكل
          </Button>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{policies.length}</p>
                <p className="text-sm text-gray-600">إجمالي الوثائق</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{policies.filter(p => p.status === 'active').length}</p>
                <p className="text-sm text-gray-600">الوثائق السارية</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Edit className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{policies.filter(p => p.status === 'draft').length}</p>
                <p className="text-sm text-gray-600">المسودات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{policies.filter(p => p.status === 'expired').length}</p>
                <p className="text-sm text-gray-600">منتهية الصلاحية</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* البحث والفلاتر */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في السياسات والإجراءات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الأنواع</option>
              <option value="policy">السياسات</option>
              <option value="procedure">الإجراءات</option>
              <option value="manual">الأدلة</option>
              <option value="form">النماذج</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الإدارات</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* محتوى الصفحة */}
      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">عرض البطاقات</TabsTrigger>
          <TabsTrigger value="list">عرض القائمة</TabsTrigger>
          <TabsTrigger value="tree">عرض الشجرة</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getTypeIcon(policy.type)}
                      <Badge variant="outline">{getTypeText(policy.type)}</Badge>
                    </div>
                    <Badge className={getStatusColor(policy.status)}>
                      {getStatusText(policy.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{policy.titleAr}</CardTitle>
                  <CardDescription>
                    {policy.department} • الإصدار {policy.version}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {policy.content}
                    </p>
                    
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>آخر تحديث: {policy.lastUpdated.toLocaleDateString('ar-SA')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy.id)}>
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadPolicy(policy.id)}>
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getTypeIcon(policy.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{policy.titleAr}</h3>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mt-1">
                              <span>{policy.department}</span>
                              <span>الإصدار {policy.version}</span>
                              <span>آخر تحديث: {policy.lastUpdated.toLocaleDateString('ar-SA')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge variant="outline">{getTypeText(policy.type)}</Badge>
                        <Badge className={getStatusColor(policy.status)}>
                          {getStatusText(policy.status)}
                        </Badge>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline" onClick={() => handleViewPolicy(policy.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDownloadPolicy(policy.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tree">
          <Card>
            <CardHeader>
              <CardTitle>هيكل السياسات حسب الإدارة</CardTitle>
              <CardDescription>
                عرض السياسات والإجراءات مرتبة حسب الإدارات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map(dept => {
                  const deptPolicies = filteredPolicies.filter(p => p.department === dept);
                  if (deptPolicies.length === 0) return null;
                  
                  return (
                    <div key={dept} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-3 flex items-center space-x-2 space-x-reverse">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span>{dept}</span>
                        <Badge variant="outline">{deptPolicies.length}</Badge>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {deptPolicies.map(policy => (
                          <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              {getTypeIcon(policy.type)}
                              <span className="text-sm font-medium">{policy.titleAr}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Badge className={getStatusColor(policy.status)} variant="secondary">
                                {getStatusText(policy.status)}
                              </Badge>
                              <Button size="sm" variant="ghost" onClick={() => handleViewPolicy(policy.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* حوار إضافة سياسة */}
      <AddPolicyDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddPolicy={handleAddPolicy}
      />
    </div>
  );
}