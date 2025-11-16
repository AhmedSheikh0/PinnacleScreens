import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Shield, 
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Edit,
  Target
} from 'lucide-react';
import { risks } from '@/data/mockData';
import { Risk, RiskAssessment } from '@/types';

export default function RiskManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || risk.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getRiskLevelColor = (level: RiskAssessment['level']) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelText = (level: RiskAssessment['level']) => {
    switch (level) {
      case 'critical': return 'حرجة';
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  const getControlTypeIcon = (type: string) => {
    switch (type) {
      case 'preventive': return <Shield className="h-4 w-4 text-green-600" />;
      case 'detective': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'corrective': return <Target className="h-4 w-4 text-orange-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getControlTypeText = (type: string) => {
    switch (type) {
      case 'preventive': return 'وقائي';
      case 'detective': return 'كشفي';
      case 'corrective': return 'تصحيحي';
      default: return 'غير محدد';
    }
  };

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'effective': return 'bg-green-100 text-green-800';
      case 'partially_effective': return 'bg-yellow-100 text-yellow-800';
      case 'ineffective': return 'bg-red-100 text-red-800';
      case 'not_tested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffectivenessText = (effectiveness: string) => {
    switch (effectiveness) {
      case 'effective': return 'فعال';
      case 'partially_effective': return 'فعال جزئياً';
      case 'ineffective': return 'غير فعال';
      case 'not_tested': return 'لم يتم اختباره';
      default: return 'غير محدد';
    }
  };

  const getRiskMatrix = () => {
    const matrix = [];
    for (let impact = 5; impact >= 1; impact--) {
      const row = [];
      for (let probability = 1; probability <= 5; probability++) {
        const score = probability * impact;
        let level: RiskAssessment['level'] = 'low';
        let color = 'bg-green-100';
        
        if (score >= 20) {
          level = 'critical';
          color = 'bg-red-500';
        } else if (score >= 15) {
          level = 'high';
          color = 'bg-orange-500';
        } else if (score >= 10) {
          level = 'medium';
          color = 'bg-yellow-500';
        } else if (score >= 5) {
          level = 'low';
          color = 'bg-green-500';
        } else {
          color = 'bg-green-300';
        }
        
        row.push({ probability, impact, score, level, color });
      }
      matrix.push(row);
    }
    return matrix;
  };

  const riskMatrix = getRiskMatrix();
  const categories = ['مخاطر مالية', 'مخاطر تشغيلية', 'مخاطر تقنية', 'مخاطر قانونية', 'مخاطر استراتيجية'];

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المخاطر</h1>
          <p className="text-gray-600">تحديد وتقييم ومعالجة المخاطر المؤسسية</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-1" />
                إضافة مخاطرة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>إضافة مخاطرة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل المخاطرة وقم بتقييمها
                </DialogDescription>
              </DialogHeader>
              <div className="text-center py-8">
                <p className="text-gray-500">نموذج إضافة المخاطرة سيتم تطويره هنا</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  إلغاء
                </Button>
                <Button>
                  إضافة المخاطرة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 ml-1" />
            تقرير المخاطر
          </Button>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">25</p>
                <p className="text-sm text-gray-600">إجمالي المخاطر</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-gray-600">مخاطر عالية</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Minus className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">مخاطر متوسطة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingDown className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-gray-600">مخاطر منخفضة</p>
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
                placeholder="البحث في المخاطر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الفئات</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* محتوى الصفحة */}
      <Tabs defaultValue="risks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risks">سجل المخاطر</TabsTrigger>
          <TabsTrigger value="matrix">مصفوفة المخاطر</TabsTrigger>
          <TabsTrigger value="controls">الضوابط</TabsTrigger>
          <TabsTrigger value="dashboard">لوحة المتابعة</TabsTrigger>
        </TabsList>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>سجل المخاطر</CardTitle>
              <CardDescription>
                جميع المخاطر المحددة مع تقييماتها والضوابط المرتبطة بها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRisks.map((risk) => (
                  <Card key={risk.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg mb-2">{risk.title}</h3>
                          <p className="text-gray-600 mb-3">{risk.description}</p>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                            <span>الفئة: {risk.category}</span>
                            <span>القسم: {risk.department}</span>
                            <span>آخر مراجعة: {risk.lastReviewed.toLocaleDateString('ar-SA')}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getRiskLevelColor(risk.inherentRisk.level)}>
                            المخاطر الأصلية: {getRiskLevelText(risk.inherentRisk.level)}
                          </Badge>
                          <Badge className={getRiskLevelColor(risk.residualRisk.level)}>
                            المخاطر المتبقية: {getRiskLevelText(risk.residualRisk.level)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* تقييم المخاطر الأصلية */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-3">المخاطر الأصلية</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <div className="font-medium">الاحتمالية</div>
                              <div className="text-2xl font-bold text-blue-600">{risk.inherentRisk.probability}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">التأثير</div>
                              <div className="text-2xl font-bold text-orange-600">{risk.inherentRisk.impact}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">النتيجة</div>
                              <div className="text-2xl font-bold text-red-600">{risk.inherentRisk.score}</div>
                            </div>
                          </div>
                        </div>

                        {/* تقييم المخاطر المتبقية */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-3">المخاطر المتبقية</h4>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="text-center">
                              <div className="font-medium">الاحتمالية</div>
                              <div className="text-2xl font-bold text-blue-600">{risk.residualRisk.probability}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">التأثير</div>
                              <div className="text-2xl font-bold text-orange-600">{risk.residualRisk.impact}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">النتيجة</div>
                              <div className="text-2xl font-bold text-green-600">{risk.residualRisk.score}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* الضوابط */}
                      <div className="mt-4">
                        <h4 className="font-medium mb-3">الضوابط ({risk.controls.length})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {risk.controls.map((control) => (
                            <div key={control.id} className="p-3 border rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2 space-x-reverse">
                                  {getControlTypeIcon(control.type)}
                                  <span className="font-medium text-sm">{control.title}</span>
                                </div>
                                <Badge className={getEffectivenessColor(control.effectiveness)} variant="secondary">
                                  {getEffectivenessText(control.effectiveness)}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{control.description}</p>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{getControlTypeText(control.type)}</span>
                                <span>التكرار: {control.frequency}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* الإجراءات */}
                      <div className="flex justify-end space-x-2 space-x-reverse mt-4 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 ml-1" />
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 ml-1" />
                          تعديل التقييم
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4 ml-1" />
                          إدارة الضوابط
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>مصفوفة المخاطر</CardTitle>
              <CardDescription>
                مصفوفة تقييم المخاطر حسب الاحتمالية والتأثير
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border p-2 bg-gray-100 text-center font-medium">
                          التأثير / الاحتمالية
                        </th>
                        {[1, 2, 3, 4, 5].map(prob => (
                          <th key={prob} className="border p-2 bg-gray-100 text-center font-medium w-20">
                            {prob}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {riskMatrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border p-2 bg-gray-100 text-center font-medium w-20">
                            {5 - rowIndex}
                          </td>
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex} 
                              className={`border p-2 text-center text-white font-bold ${cell.color} h-16 w-20`}
                            >
                              {cell.score}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="mt-4 flex justify-center space-x-6 space-x-reverse">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">منخفضة (1-4)</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-sm">متوسطة (5-14)</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="text-sm">عالية (15-19)</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm">حرجة (20-25)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الضوابط</CardTitle>
              <CardDescription>
                جميع الضوابط المطبقة لمعالجة المخاطر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الضابط</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">المالك</TableHead>
                    <TableHead className="text-right">التكرار</TableHead>
                    <TableHead className="text-right">الفعالية</TableHead>
                    <TableHead className="text-right">آخر اختبار</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {risks.flatMap(risk => risk.controls).map((control) => (
                    <TableRow key={control.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{control.title}</div>
                          <div className="text-sm text-gray-500">{control.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getControlTypeIcon(control.type)}
                          <span>{getControlTypeText(control.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{control.owner}</TableCell>
                      <TableCell>{control.frequency}</TableCell>
                      <TableCell>
                        <Badge className={getEffectivenessColor(control.effectiveness)}>
                          {getEffectivenessText(control.effectiveness)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {control.lastTested ? control.lastTested.toLocaleDateString('ar-SA') : 'لم يتم'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Target className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المخاطر حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(index + 1) * 20}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{index + 2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اتجاه المخاطر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">رسم بياني لاتجاه المخاطر</p>
                  <p className="text-sm text-gray-400 mt-2">
                    سيعرض تطور مستويات المخاطر عبر الزمن
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}