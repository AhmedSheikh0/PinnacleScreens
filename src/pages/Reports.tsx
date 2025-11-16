import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  TrendingUp,
  PieChart,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current_year');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReportType, setSelectedReportType] = useState('summary');

  const departments = [
    'المراجعة الداخلية',
    'المالية',
    'الموارد البشرية',
    'العمليات',
    'تقنية المعلومات',
    'إدارة المخاطر'
  ];

  const reportTypes = [
    { value: 'summary', label: 'تقرير ملخص', icon: FileText },
    { value: 'findings', label: 'تقرير الملاحظات', icon: AlertTriangle },
    { value: 'risks', label: 'تقرير المخاطر', icon: BarChart3 },
    { value: 'performance', label: 'تقرير الأداء', icon: TrendingUp },
    { value: 'compliance', label: 'تقرير الامتثال', icon: CheckCircle }
  ];

  const predefinedReports = [
    {
      id: 'monthly_summary',
      title: 'التقرير الشهري الموجز',
      description: 'ملخص شهري لأنشطة المراجعة والملاحظات',
      type: 'summary',
      lastGenerated: new Date('2024-11-01'),
      status: 'ready'
    },
    {
      id: 'findings_status',
      title: 'تقرير حالة الملاحظات',
      description: 'تقرير مفصل عن حالة جميع الملاحظات المفتوحة والمغلقة',
      type: 'findings',
      lastGenerated: new Date('2024-10-28'),
      status: 'ready'
    },
    {
      id: 'risk_register',
      title: 'سجل المخاطر الشامل',
      description: 'تقرير شامل عن جميع المخاطر المحددة وتقييماتها',
      type: 'risks',
      lastGenerated: new Date('2024-10-25'),
      status: 'ready'
    },
    {
      id: 'audit_performance',
      title: 'تقرير أداء المراجعة',
      description: 'تحليل أداء فريق المراجعة ومؤشرات الإنجاز',
      type: 'performance',
      lastGenerated: new Date('2024-10-20'),
      status: 'ready'
    }
  ];

  const getReportTypeIcon = (type: string) => {
    const reportType = reportTypes.find(rt => rt.value === type);
    const IconComponent = reportType?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'جاهز';
      case 'generating': return 'قيد الإنشاء';
      case 'error': return 'خطأ';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">التقارير والإحصائيات</h1>
          <p className="text-gray-600">إنشاء وإدارة التقارير التنفيذية والتفصيلية</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button>
            <FileText className="h-4 w-4 ml-1" />
            إنشاء تقرير مخصص
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير جميع التقارير
          </Button>
        </div>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">التقارير المتاحة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Download className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">مرات التحميل</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">تقارير مجدولة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">المستلمين</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* فلاتر التقارير */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع التقرير</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع التقرير" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">الفترة الزمنية</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current_month">الشهر الحالي</SelectItem>
                  <SelectItem value="current_quarter">الربع الحالي</SelectItem>
                  <SelectItem value="current_year">السنة الحالية</SelectItem>
                  <SelectItem value="last_year">السنة الماضية</SelectItem>
                  <SelectItem value="custom">فترة مخصصة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">القسم</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Filter className="h-4 w-4 ml-1" />
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* محتوى التقارير */}
      <Tabs defaultValue="predefined" className="space-y-4">
        <TabsList>
          <TabsTrigger value="predefined">التقارير المعدة مسبقاً</TabsTrigger>
          <TabsTrigger value="custom">التقارير المخصصة</TabsTrigger>
          <TabsTrigger value="scheduled">التقارير المجدولة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predefinedReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getReportTypeIcon(report.type)}
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {getStatusText(report.status)}
                    </Badge>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      آخر إنشاء: {report.lastGenerated.toLocaleDateString('ar-SA')}
                    </div>
                    
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" className="flex-1">
                        <FileText className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 ml-1" />
                        جدولة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء تقرير مخصص</CardTitle>
              <CardDescription>
                قم بإنشاء تقرير مخصص حسب احتياجاتك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">منشئ التقارير المخصصة</p>
                <p className="text-sm text-gray-400 mt-2">
                  سيتم تطوير أداة إنشاء التقارير المخصصة هنا
                </p>
                <Button className="mt-4">
                  <FileText className="h-4 w-4 ml-1" />
                  بدء إنشاء تقرير جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>التقارير المجدولة</CardTitle>
              <CardDescription>
                إدارة التقارير التي يتم إنشاؤها تلقائياً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'التقرير الشهري للإدارة العليا', frequency: 'شهرياً', nextRun: '2024-12-01' },
                  { name: 'تقرير الملاحظات الأسبوعي', frequency: 'أسبوعياً', nextRun: '2024-11-18' },
                  { name: 'تقرير المخاطر الربعي', frequency: 'ربعياً', nextRun: '2025-01-01' }
                ].map((scheduledReport, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{scheduledReport.name}</h3>
                      <p className="text-sm text-gray-500">
                        التكرار: {scheduledReport.frequency} • التشغيل التالي: {scheduledReport.nextRun}
                      </p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" variant="outline">تعديل</Button>
                      <Button size="sm" variant="outline">إيقاف</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <PieChart className="h-5 w-5" />
                  <span>توزيع الملاحظات حسب الأولوية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">رسم بياني دائري</p>
                  <p className="text-sm text-gray-400 mt-2">
                    سيعرض توزيع الملاحظات حسب مستوى الأولوية
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Activity className="h-5 w-5" />
                  <span>اتجاه الملاحظات الشهري</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">رسم بياني خطي</p>
                  <p className="text-sm text-gray-400 mt-2">
                    سيعرض اتجاه الملاحظات عبر الأشهر
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <BarChart3 className="h-5 w-5" />
                  <span>أداء الأقسام</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">رسم بياني عمودي</p>
                  <p className="text-sm text-gray-400 mt-2">
                    سيعرض مقارنة أداء الأقسام المختلفة
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <TrendingUp className="h-5 w-5" />
                  <span>مؤشرات الأداء الرئيسية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">معدل إغلاق الملاحظات</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-bold">75%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">الالتزام بالمواعيد</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-bold">85%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">رضا العملاء الداخليين</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-sm font-bold">90%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}