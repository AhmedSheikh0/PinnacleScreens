import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  FileText,
  Target,
  Shield
} from 'lucide-react';
import { dashboardMetrics } from '@/data/mockData';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'إجمالي الملاحظات',
      value: dashboardMetrics.totalFindings,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'الملاحظات المفتوحة',
      value: dashboardMetrics.openFindings,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'الملاحظات المتأخرة',
      value: dashboardMetrics.overdueFindings,
      icon: Clock,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'الملاحظات المكتملة',
      value: dashboardMetrics.completedFindings,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const riskLevels = [
    { level: 'عالية', count: dashboardMetrics.riskMetrics.highRisks, color: 'bg-red-500' },
    { level: 'متوسطة', count: dashboardMetrics.riskMetrics.mediumRisks, color: 'bg-yellow-500' },
    { level: 'منخفضة', count: dashboardMetrics.riskMetrics.lowRisks, color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-6">
      {/* ترحيب */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h1>
        <p className="text-blue-100">
          مرحباً بك في منصة المراجعة الداخلية وإدارة المخاطر
        </p>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* تقدم المراجعات */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Target className="h-5 w-5" />
              <span>تقدم المراجعات</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">مخططة</span>
              <Badge variant="outline">{dashboardMetrics.auditProgress.planned}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">قيد التنفيذ</span>
              <Badge variant="secondary">{dashboardMetrics.auditProgress.inProgress}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">مكتملة</span>
              <Badge variant="default">{dashboardMetrics.auditProgress.completed}</Badge>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>معدل الإنجاز</span>
                <span>47%</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* توزيع المخاطر */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Shield className="h-5 w-5" />
              <span>توزيع المخاطر</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskLevels.map((risk, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                    <span className="text-sm font-medium">مخاطر {risk.level}</span>
                  </div>
                  <Badge variant="outline">{risk.count}</Badge>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">إجمالي المخاطر</span>
                  <span className="font-bold">{dashboardMetrics.riskMetrics.totalRisks}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الملاحظات الحديثة */}
      <Card>
        <CardHeader>
          <CardTitle>الملاحظات التي تتطلب اهتماماً</CardTitle>
          <CardDescription>الملاحظات المفتوحة والمتأخرة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">ضعف في ضوابط الموافقة على المشتريات</p>
                  <p className="text-sm text-gray-500">قسم المشتريات • متأخرة 5 أيام</p>
                </div>
              </div>
              <Badge variant="destructive">عالية</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">عدم توثيق إجراءات المراجعة المالية</p>
                  <p className="text-sm text-gray-500">الإدارة المالية • تتطلب رد خلال 3 أيام</p>
                </div>
              </div>
              <Badge variant="secondary">متوسطة</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">تحسين نظام إدارة المخزون</p>
                  <p className="text-sm text-gray-500">إدارة العمليات • خطة عمل قيد المراجعة</p>
                </div>
              </div>
              <Badge variant="outline">منخفضة</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}