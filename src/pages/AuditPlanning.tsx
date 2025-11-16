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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Target, 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  MoreHorizontal,
  Edit,
  Trash2,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { auditPlan, users } from '@/data/mockData';
import { AuditEngagement } from '@/types';

export default function AuditPlanning() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredAudits = auditPlan.audits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || audit.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: AuditEngagement['status']) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'fieldwork_complete': return 'bg-purple-100 text-purple-800';
      case 'report_draft': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: AuditEngagement['status']) => {
    switch (status) {
      case 'planned': return 'مخططة';
      case 'in_progress': return 'قيد التنفيذ';
      case 'fieldwork_complete': return 'العمل الميداني مكتمل';
      case 'report_draft': return 'مسودة التقرير';
      case 'completed': return 'مكتملة';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: AuditEngagement['status']) => {
    switch (status) {
      case 'planned': return <Calendar className="h-4 w-4" />;
      case 'in_progress': return <Play className="h-4 w-4" />;
      case 'fieldwork_complete': return <CheckCircle className="h-4 w-4" />;
      case 'report_draft': return <Edit className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getRiskLevelColor = (risk: AuditEngagement['riskLevel']) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelText = (risk: AuditEngagement['riskLevel']) => {
    switch (risk) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  const getAssignedAuditorsNames = (auditorIds: string[]) => {
    return auditorIds.map(id => {
      const auditor = users.find(u => u.id === id);
      return auditor ? auditor.name : 'غير محدد';
    }).join(', ');
  };

  const calculateProgress = (audit: AuditEngagement) => {
    const statusProgress = {
      'planned': 0,
      'in_progress': 25,
      'fieldwork_complete': 60,
      'report_draft': 80,
      'completed': 100
    };
    return statusProgress[audit.status] || 0;
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تخطيط المراجعة</h1>
          <p className="text-gray-600">إدارة خطة المراجعة السنوية ومتابعة تنفيذ المراجعات</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 ml-1" />
                إضافة مراجعة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة مراجعة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل المراجعة الجديدة لإضافتها للخطة السنوية
                </DialogDescription>
              </DialogHeader>
              <div className="text-center py-8">
                <p className="text-gray-500">نموذج إضافة المراجعة سيتم تطويره هنا</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  إلغاء
                </Button>
                <Button>
                  إضافة المراجعة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Target className="h-4 w-4 ml-1" />
            إعداد الخطة السنوية
          </Button>
        </div>
      </div>

      {/* معلومات الخطة السنوية */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Target className="h-5 w-5" />
                <span>{auditPlan.title}</span>
              </CardTitle>
              <CardDescription>
                السنة المالية {auditPlan.year} • تمت الموافقة في {auditPlan.approvedDate?.toLocaleDateString('ar-SA')}
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {auditPlan.status === 'approved' ? 'معتمدة' : 'مسودة'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{auditPlan.audits.length}</div>
              <div className="text-sm text-blue-800">إجمالي المراجعات</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {auditPlan.audits.filter(a => a.status === 'in_progress').length}
              </div>
              <div className="text-sm text-yellow-800">قيد التنفيذ</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {auditPlan.audits.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-green-800">مكتملة</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {auditPlan.audits.filter(a => a.riskLevel === 'high').length}
              </div>
              <div className="text-sm text-red-800">عالية المخاطر</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* البحث والفلاتر */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المراجعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="planned">مخططة</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="fieldwork_complete">العمل الميداني مكتمل</option>
              <option value="report_draft">مسودة التقرير</option>
              <option value="completed">مكتملة</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* جدول المراجعات */}
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">عرض الجدول</TabsTrigger>
          <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
          <TabsTrigger value="calendar">التقويم</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>قائمة المراجعات</CardTitle>
              <CardDescription>
                جميع المراجعات المخططة والجارية للسنة المالية الحالية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المراجعة</TableHead>
                    <TableHead className="text-right">القسم</TableHead>
                    <TableHead className="text-right">المراجعين</TableHead>
                    <TableHead className="text-right">التواريخ</TableHead>
                    <TableHead className="text-right">المخاطر</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">التقدم</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{audit.title}</div>
                          <div className="text-sm text-gray-500">ID: {audit.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{audit.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {getAssignedAuditorsNames(audit.assignedAuditors)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>البداية: {audit.plannedStartDate.toLocaleDateString('ar-SA')}</div>
                          <div>النهاية: {audit.plannedEndDate.toLocaleDateString('ar-SA')}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskLevelColor(audit.riskLevel)}>
                          {getRiskLevelText(audit.riskLevel)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(audit.status)}
                          <Badge className={getStatusColor(audit.status)}>
                            {getStatusText(audit.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${calculateProgress(audit)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateProgress(audit)}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              تعديل المراجعة
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              إدارة الفريق
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              بدء المراجعة
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              حذف المراجعة
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>الجدول الزمني للمراجعات</CardTitle>
              <CardDescription>
                عرض زمني لجميع المراجعات المخططة والجارية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAudits.map((audit, index) => (
                  <div key={audit.id} className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{audit.title}</h3>
                      <p className="text-sm text-gray-500">{audit.department}</p>
                      <div className="flex items-center space-x-4 space-x-reverse mt-2 text-sm">
                        <span>من: {audit.plannedStartDate.toLocaleDateString('ar-SA')}</span>
                        <span>إلى: {audit.plannedEndDate.toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge className={getRiskLevelColor(audit.riskLevel)}>
                        {getRiskLevelText(audit.riskLevel)}
                      </Badge>
                      <Badge className={getStatusColor(audit.status)}>
                        {getStatusText(audit.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>تقويم المراجعات</CardTitle>
              <CardDescription>
                عرض المراجعات على التقويم الشهري
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">عرض التقويم سيتم تطويره هنا</p>
                <p className="text-sm text-gray-400 mt-2">
                  سيعرض جميع المراجعات المجدولة على التقويم الشهري
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}