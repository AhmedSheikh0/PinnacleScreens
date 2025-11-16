import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  FileText, 
  Calendar,
  User,
  Plus,
  Search,
  Filter,
  Download,
  Send
} from 'lucide-react';
import { findings as initialFindings, users } from '@/data/mockData';
import { Finding, FindingResponse } from '@/types';
import { AddFindingDialog } from '@/components/dialogs/AddFindingDialog';

export default function FindingsTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [findings, setFindings] = useState(initialFindings);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [responseType, setResponseType] = useState<'agreement' | 'disagreement' | 'clarification'>('agreement');

  const filteredFindings = findings.filter(finding => {
    const matchesSearch = finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || finding.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || finding.severity === selectedSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleAddFinding = (newFindingData: Omit<Finding, 'id'>) => {
    const newFinding: Finding = {
      ...newFindingData,
      id: `find_${(findings.length + 1).toString().padStart(3, '0')}`
    };
    setFindings([...findings, newFinding]);
  };

  const handleAddResponse = () => {
    if (!selectedFinding || !responseText.trim()) return;

    const newResponse: FindingResponse = {
      id: `resp_${Date.now()}`,
      findingId: selectedFinding.id,
      respondent: 'المستخدم الحالي', // في التطبيق الحقيقي، سيكون من المستخدم المسجل
      response: responseText,
      responseType: responseType,
      submittedDate: new Date()
    };

    setFindings(findings.map(finding => 
      finding.id === selectedFinding.id 
        ? { 
            ...finding, 
            responses: [...finding.responses, newResponse],
            status: 'response_pending' as Finding['status']
          }
        : finding
    ));

    setResponseText('');
    setShowResponseDialog(false);
    setSelectedFinding(null);
  };

  const handleUpdateStatus = (findingId: string, newStatus: Finding['status']) => {
    setFindings(findings.map(finding => 
      finding.id === findingId 
        ? { ...finding, status: newStatus }
        : finding
    ));
  };

  const getSeverityColor = (severity: Finding['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: Finding['severity']) => {
    switch (severity) {
      case 'critical': return 'حرجة';
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return 'غير محدد';
    }
  };

  const getStatusColor = (status: Finding['status']) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'response_pending': return 'bg-orange-100 text-orange-800';
      case 'action_plan_submitted': return 'bg-yellow-100 text-yellow-800';
      case 'action_plan_approved': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Finding['status']) => {
    switch (status) {
      case 'open': return 'مفتوحة';
      case 'response_pending': return 'في انتظار الرد';
      case 'action_plan_submitted': return 'تم تقديم خطة العمل';
      case 'action_plan_approved': return 'تمت الموافقة على الخطة';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتملة';
      case 'closed': return 'مغلقة';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: Finding['status']) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4" />;
      case 'response_pending': return <MessageSquare className="h-4 w-4" />;
      case 'action_plan_submitted': return <FileText className="h-4 w-4" />;
      case 'action_plan_approved': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const calculateDaysOverdue = (targetDate: Date | undefined) => {
    if (!targetDate) return 0;
    const today = new Date();
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getProcessOwnerName = (ownerId: string) => {
    const owner = users.find(u => u.id === ownerId);
    return owner ? owner.name : 'غير محدد';
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">متابعة الملاحظات وخطط العمل</h1>
          <p className="text-gray-600">إدارة ومتابعة الملاحظات وخطط العمل التصحيحية</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-1" />
            إضافة ملاحظة جديدة
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 ml-1" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{findings.length}</p>
                <p className="text-sm text-gray-600">إجمالي الملاحظات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{findings.filter(f => f.status === 'open' || f.status === 'response_pending').length}</p>
                <p className="text-sm text-gray-600">مفتوحة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">
                  {findings.filter(f => f.targetDate && calculateDaysOverdue(f.targetDate) > 0).length}
                </p>
                <p className="text-sm text-gray-600">متأخرة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{findings.filter(f => f.status === 'in_progress').length}</p>
                <p className="text-sm text-gray-600">قيد التنفيذ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{findings.filter(f => f.status === 'completed' || f.status === 'closed').length}</p>
                <p className="text-sm text-gray-600">مكتملة</p>
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
                placeholder="البحث في الملاحظات..."
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
              <option value="open">مفتوحة</option>
              <option value="response_pending">في انتظار الرد</option>
              <option value="action_plan_submitted">تم تقديم خطة العمل</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتملة</option>
            </select>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع المستويات</option>
              <option value="critical">حرجة</option>
              <option value="high">عالية</option>
              <option value="medium">متوسطة</option>
              <option value="low">منخفضة</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الملاحظات */}
      <div className="grid grid-cols-1 gap-6">
        {filteredFindings.map((finding) => {
          const daysOverdue = calculateDaysOverdue(finding.targetDate);
          const isOverdue = daysOverdue > 0;
          
          return (
            <Card key={finding.id} className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      {getStatusIcon(finding.status)}
                      <CardTitle className="text-lg">{finding.title}</CardTitle>
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          متأخرة {daysOverdue} يوم
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {finding.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getSeverityColor(finding.severity)}>
                      {getSeverityText(finding.severity)}
                    </Badge>
                    <Badge className={getStatusColor(finding.status)}>
                      {getStatusText(finding.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* معلومات الملاحظة */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">مالك العملية:</span>
                      <span className="font-medium">{getProcessOwnerName(finding.processOwner)}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">تاريخ الإصدار:</span>
                      <span className="font-medium">{finding.issuedDate.toLocaleDateString('ar-SA')}</span>
                    </div>
                    {finding.targetDate && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">الموعد المستهدف:</span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                          {finding.targetDate.toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* التوصية */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-1">التوصية:</h4>
                    <p className="text-blue-800 text-sm">{finding.recommendation}</p>
                  </div>

                  {/* الردود وخطط العمل */}
                  {finding.responses && finding.responses.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">الردود:</h4>
                      {finding.responses.map((response) => (
                        <div key={response.id} className="p-3 bg-gray-50 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{response.respondent}</span>
                            <span className="text-xs text-gray-500">
                              {response.submittedDate.toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{response.response}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* الإجراءات */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-2 space-x-reverse">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedFinding(finding);
                          setShowResponseDialog(true);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 ml-1" />
                        إضافة رد
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 ml-1" />
                        خطة العمل
                      </Button>
                      
                      <select
                        value={finding.status}
                        onChange={(e) => handleUpdateStatus(finding.id, e.target.value as Finding['status'])}
                        className="px-2 py-1 text-xs border border-gray-300 rounded"
                      >
                        <option value="open">مفتوحة</option>
                        <option value="response_pending">في انتظار الرد</option>
                        <option value="action_plan_submitted">تم تقديم خطة العمل</option>
                        <option value="action_plan_approved">تمت الموافقة على الخطة</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="completed">مكتملة</option>
                        <option value="closed">مغلقة</option>
                      </select>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      القسم: {finding.department}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* حوار إضافة ملاحظة */}
      <AddFindingDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddFinding={handleAddFinding}
      />

      {/* حوار إضافة رد */}
      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة رد على الملاحظة</DialogTitle>
            <DialogDescription>
              {selectedFinding?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">نوع الرد</label>
              <select 
                value={responseType}
                onChange={(e) => setResponseType(e.target.value as typeof responseType)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="agreement">موافقة</option>
                <option value="disagreement">اعتراض</option>
                <option value="clarification">طلب توضيح</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">الرد</label>
              <Textarea 
                className="mt-1" 
                placeholder="اكتب ردك هنا..."
                rows={4}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => setShowResponseDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddResponse}>
                <Send className="h-4 w-4 ml-1" />
                إرسال الرد
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}