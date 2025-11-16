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
  Building2, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ChevronDown,
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  Factory,
  Briefcase,
  Shield,
  Cog,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { organizationalChart as initialOrgChart } from '@/data/mockData';
import { suggestedOrgStructure } from '@/data/organizationalStructure';
import { OrganizationalUnit } from '@/types';
import { AddDepartmentDialog } from '@/components/dialogs/AddDepartmentDialog';
import { EditDepartmentDialog } from '@/components/dialogs/EditDepartmentDialog';
import { AddUserDialog } from '@/components/dialogs/AddUserDialog';
import { AddCompanyDialog } from '@/components/dialogs/AddCompanyDialog';
import { EditCompanyDialog } from '@/components/dialogs/EditCompanyDialog';
import { CompanyDetailsDialog } from '@/components/dialogs/CompanyDetailsDialog';

interface FlatUnit {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  type: string;
  level: number;
  parentId: string;
  managerId: string;
  employeeCount: number;
  path: string;
}

export default function OrganizationalChart() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['company', 'operations', 'commercial', 'finance']));
  const [orgChart, setOrgChart] = useState(initialOrgChart);
  const [showAddDeptDialog, setShowAddDeptDialog] = useState(false);
  const [showEditDeptDialog, setShowEditDeptDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddCompanyDialog, setShowAddCompanyDialog] = useState(false);
  const [showEditCompanyDialog, setShowEditCompanyDialog] = useState(false);
  const [showCompanyDetailsDialog, setShowCompanyDetailsDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<OrganizationalUnit | null>(null);
  const [parentDepartmentId, setParentDepartmentId] = useState<string>('');
  const [showSuggestedStructure, setShowSuggestedStructure] = useState(false);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const getAllNodeIds = (unit: OrganizationalUnit): string[] => {
      const ids = [unit.id];
      if (unit.children) {
        unit.children.forEach(child => {
          ids.push(...getAllNodeIds(child));
        });
      }
      return ids;
    };
    setExpandedNodes(new Set(getAllNodeIds(showSuggestedStructure ? suggestedOrgStructure : orgChart)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['company']));
  };

  const loadSuggestedStructure = () => {
    if (confirm('هل تريد تحميل الهيكل التنظيمي المقترح؟ سيتم استبدال الهيكل الحالي.')) {
      setOrgChart(suggestedOrgStructure);
      setShowSuggestedStructure(true);
      setExpandedNodes(new Set(['company', 'operations', 'commercial', 'finance', 'hr', 'it']));
    }
  };

  const resetToOriginal = () => {
    if (confirm('هل تريد العودة للهيكل الأصلي؟')) {
      setOrgChart(initialOrgChart);
      setShowSuggestedStructure(false);
      setExpandedNodes(new Set(['root']));
    }
  };

  const createNewCompany = () => {
    if (confirm('هل تريد إنشاء شركة جديدة؟ سيتم حذف الهيكل الحالي.')) {
      setShowAddCompanyDialog(true);
    }
  };

  const handleAddCompany = (newCompany: OrganizationalUnit) => {
    setOrgChart(newCompany);
    setShowSuggestedStructure(false);
    setExpandedNodes(new Set([newCompany.id]));
    console.log('تم إنشاء شركة جديدة:', newCompany.nameAr);
  };

  const handleEditCompany = (updatedCompany: OrganizationalUnit) => {
    setOrgChart(updatedCompany);
    console.log('تم تحديث بيانات الشركة:', updatedCompany.nameAr);
  };

  const handleDeleteCompany = () => {
    if (confirm('هل أنت متأكد من حذف الشركة بالكامل؟ سيتم حذف جميع البيانات والهيكل التنظيمي.')) {
      // إنشاء شركة فارغة جديدة
      const emptyCompany: OrganizationalUnit = {
        id: 'empty_company',
        name: 'New Company',
        nameAr: 'شركة جديدة',
        code: 'NEW',
        type: 'company',
        employees: [],
        children: []
      };
      setOrgChart(emptyCompany);
      setShowSuggestedStructure(false);
      setExpandedNodes(new Set(['empty_company']));
      setShowCompanyDetailsDialog(false);
      console.log('تم حذف الشركة وإنشاء هيكل فارغ');
    }
  };

  const handleAddDepartment = (newDeptData: Omit<OrganizationalUnit, 'id' | 'children'>) => {
    const newDept: OrganizationalUnit = {
      ...newDeptData,
      id: `dept_${Date.now()}`,
      children: []
    };

    const addToParent = (unit: OrganizationalUnit): OrganizationalUnit => {
      if (unit.id === parentDepartmentId) {
        return {
          ...unit,
          children: [...(unit.children || []), newDept]
        };
      }
      
      if (unit.children) {
        return {
          ...unit,
          children: unit.children.map(addToParent)
        };
      }
      
      return unit;
    };

    setOrgChart(addToParent(orgChart));
  };

  const handleEditDepartment = (updatedDept: OrganizationalUnit) => {
    const updateInTree = (unit: OrganizationalUnit): OrganizationalUnit => {
      if (unit.id === updatedDept.id) {
        return updatedDept;
      }
      
      if (unit.children) {
        return {
          ...unit,
          children: unit.children.map(updateInTree)
        };
      }
      
      return unit;
    };

    setOrgChart(updateInTree(orgChart));
  };

  const handleDeleteDepartment = (deptId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع الأقسام الفرعية أيضاً.')) {
      const deleteFromTree = (unit: OrganizationalUnit): OrganizationalUnit => {
        if (unit.children) {
          return {
            ...unit,
            children: unit.children.filter(child => child.id !== deptId).map(deleteFromTree)
          };
        }
        return unit;
      };

      setOrgChart(deleteFromTree(orgChart));
    }
  };

  const exportOrgChart = () => {
    const flattenOrgChart = (unit: OrganizationalUnit, level: number = 0): FlatUnit[] => {
      const result = [{
        id: unit.id,
        name: unit.name,
        nameAr: unit.nameAr,
        code: unit.code || '',
        type: unit.type || 'department',
        level: level,
        parentId: unit.parentId || '',
        managerId: unit.managerId || '',
        employeeCount: unit.employees.length,
        path: ''
      }];

      if (unit.children) {
        unit.children.forEach(child => {
          result.push(...flattenOrgChart(child, level + 1));
        });
      }

      return result;
    };

    const data = flattenOrgChart(orgChart);
    const csvContent = "data:text/csv;charset=utf-8," 
      + "unit_id,name_ar,name_en,type,parent_id,code,manager_id,level,employee_count\n"
      + data.map(row => 
          `${row.id},${row.nameAr},${row.name},${row.type},${row.parentId},${row.code},${row.managerId},${row.level},${row.employeeCount}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "organizational_chart.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // تحويل الهيكل الشجري إلى قائمة مسطحة
  const flattenOrgChart = (unit: OrganizationalUnit, level: number = 0, parentPath: string = ''): FlatUnit[] => {
    const currentPath = parentPath ? `${parentPath} > ${unit.nameAr}` : unit.nameAr;
    
    const result: FlatUnit[] = [{
      id: unit.id,
      name: unit.name,
      nameAr: unit.nameAr,
      code: unit.code || '',
      type: unit.type || 'department',
      level: level,
      parentId: unit.parentId || '',
      managerId: unit.managerId || '',
      employeeCount: unit.employees.length,
      path: currentPath
    }];

    if (unit.children) {
      unit.children.forEach(child => {
        result.push(...flattenOrgChart(child, level + 1, currentPath));
      });
    }

    return result;
  };

  const getUnitTypeIcon = (type?: string) => {
    switch (type) {
      case 'company': return <Building2 className="h-5 w-5 text-purple-600" />;
      case 'division': return <Factory className="h-5 w-5 text-blue-600" />;
      case 'department': return <Briefcase className="h-5 w-5 text-green-600" />;
      case 'unit': return <Cog className="h-5 w-5 text-orange-600" />;
      case 'support_office': return <Shield className="h-5 w-5 text-red-600" />;
      default: return <Building2 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getUnitTypeText = (type?: string) => {
    switch (type) {
      case 'company': return 'شركة';
      case 'division': return 'قطاع';
      case 'department': return 'إدارة';
      case 'unit': return 'وحدة';
      case 'support_office': return 'مكتب مساند';
      default: return 'قسم';
    }
  };

  const getUnitTypeColor = (type?: string) => {
    switch (type) {
      case 'company': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'division': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'department': return 'bg-green-100 text-green-800 border-green-200';
      case 'unit': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'support_office': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderOrgUnit = (unit: OrganizationalUnit, level: number = 0) => {
    const isExpanded = expandedNodes.has(unit.id);
    const hasChildren = unit.children && unit.children.length > 0;

    return (
      <div key={unit.id} className="space-y-2">
        <Card className={`${level > 0 ? 'mr-8' : ''} transition-all hover:shadow-md ${unit.type === 'company' ? 'border-2 border-purple-200' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(unit.id)}
                    className="p-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {getUnitTypeIcon(unit.type)}
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse mb-1">
                    <h3 className="font-medium">{unit.nameAr}</h3>
                    <Badge className={getUnitTypeColor(unit.type)} variant="secondary">
                      {getUnitTypeText(unit.type)}
                    </Badge>
                    {unit.code && (
                      <Badge variant="outline" className="text-xs">
                        {unit.code}
                      </Badge>
                    )}
                  </div>
                  {unit.name !== unit.nameAr && (
                    <p className="text-sm text-gray-500 mb-1">{unit.name}</p>
                  )}
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Users className="h-4 w-4" />
                      <span>{unit.employees.length} موظف</span>
                    </div>
                    {hasChildren && (
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Building2 className="h-4 w-4" />
                        <span>{unit.children?.length} قسم فرعي</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                {unit.type === 'company' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCompanyDetailsDialog(true)}
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    عرض التفاصيل
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (unit.type === 'company') {
                      setShowEditCompanyDialog(true);
                    } else {
                      setSelectedDepartment(unit);
                      setShowEditDeptDialog(true);
                    }
                  }}
                >
                  <Edit className="h-4 w-4 ml-1" />
                  تعديل
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setParentDepartmentId(unit.id);
                    setShowAddDeptDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4 ml-1" />
                  إضافة قسم
                </Button>
                {unit.type !== 'company' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteDepartment(unit.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* عرض الموظفين */}
            {unit.employees.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">الموظفين:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {unit.employees.map(employee => (
                    <div key={employee.id} className="flex items-center space-x-2 space-x-reverse p-2 bg-gray-50 rounded">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{employee.name}</p>
                        <p className="text-xs text-gray-500 truncate">{employee.position}</p>
                      </div>
                      <Badge variant={employee.isActive ? 'default' : 'secondary'} className="text-xs">
                        {employee.isActive ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* عرض الأقسام الفرعية */}
        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {unit.children.map(child => renderOrgUnit(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getTotalDepartments = (unit: OrganizationalUnit): number => {
    let count = 1;
    if (unit.children) {
      unit.children.forEach(child => {
        count += getTotalDepartments(child);
      });
    }
    return count;
  };

  const getTotalEmployees = (unit: OrganizationalUnit): number => {
    let count = unit.employees.length;
    if (unit.children) {
      unit.children.forEach(child => {
        count += getTotalEmployees(child);
      });
    }
    return count;
  };

  const getMaxDepth = (unit: OrganizationalUnit, currentDepth: number = 0): number => {
    let maxDepth = currentDepth;
    if (unit.children && unit.children.length > 0) {
      unit.children.forEach(child => {
        const childDepth = getMaxDepth(child, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      });
    }
    return maxDepth;
  };

  const currentChart = showSuggestedStructure ? suggestedOrgStructure : orgChart;
  const flatUnits = flattenOrgChart(currentChart);

  // فلترة الوحدات حسب البحث
  const filteredFlatUnits = flatUnits.filter(unit => 
    unit.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الهيكل التنظيمي التفاعلي</h1>
          <p className="text-gray-600">إدارة الهيكل التنظيمي والموظفين بشكل تفاعلي</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button onClick={createNewCompany} variant="outline" className="text-green-600">
            <Plus className="h-4 w-4 ml-1" />
            إنشاء شركة جديدة
          </Button>
          <Button onClick={loadSuggestedStructure} variant="outline">
            <RefreshCw className="h-4 w-4 ml-1" />
            الهيكل المقترح
          </Button>
          <Button onClick={() => {
            setParentDepartmentId(currentChart.id);
            setShowAddDeptDialog(true);
          }}>
            <Plus className="h-4 w-4 ml-1" />
            إضافة إدارة جديدة
          </Button>
          <Button variant="outline" onClick={() => setShowAddUserDialog(true)}>
            <Users className="h-4 w-4 ml-1" />
            إضافة موظف
          </Button>
        </div>
      </div>

      {/* تحذير للهياكل الفارغة */}
      {currentChart.id === 'empty_company' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">هيكل تنظيمي فارغ</span>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              لا يوجد هيكل تنظيمي حالياً. يمكنك إنشاء شركة جديدة أو تحميل الهيكل المقترح.
            </p>
          </CardContent>
        </Card>
      )}

      {/* شريط الأدوات */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الهيكل التنظيمي..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 min-w-[300px]"
                />
              </div>
              <Button variant="outline" onClick={expandAll}>
                توسيع الكل
              </Button>
              <Button variant="outline" onClick={collapseAll}>
                طي الكل
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              {showSuggestedStructure && (
                <Button variant="outline" onClick={resetToOriginal}>
                  العودة للأصلي
                </Button>
              )}
              <Button variant="outline" onClick={exportOrgChart}>
                <Download className="h-4 w-4 ml-1" />
                تصدير CSV
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 ml-1" />
                استيراد
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{getTotalDepartments(currentChart)}</p>
                <p className="text-sm text-gray-600">إجمالي الوحدات</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{getTotalEmployees(currentChart)}</p>
                <p className="text-sm text-gray-600">إجمالي الموظفين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Factory className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{currentChart.children?.length || 0}</p>
                <p className="text-sm text-gray-600">القطاعات الرئيسية</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">{getMaxDepth(currentChart)}</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{getMaxDepth(currentChart)}</p>
                <p className="text-sm text-gray-600">مستويات الهيكل</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* الهيكل التنظيمي */}
      <Tabs defaultValue="tree" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tree">العرض الشجري</TabsTrigger>
          <TabsTrigger value="list">العرض القائمي</TabsTrigger>
          <TabsTrigger value="summary">ملخص الهيكل</TabsTrigger>
        </TabsList>

        <TabsContent value="tree">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                {showSuggestedStructure && (
                  <Badge className="bg-green-100 text-green-800">الهيكل المقترح</Badge>
                )}
                <span>الهيكل التنظيمي التفاعلي</span>
              </CardTitle>
              <CardDescription>
                انقر على الأسهم لتوسيع أو طي الأقسام الفرعية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentChart.id !== 'empty_company' ? (
                  renderOrgUnit(currentChart)
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد هيكل تنظيمي</h3>
                    <p className="text-gray-500 mb-4">ابدأ بإنشاء شركة جديدة أو تحميل الهيكل المقترح</p>
                    <div className="flex justify-center space-x-2 space-x-reverse">
                      <Button onClick={createNewCompany}>
                        <Plus className="h-4 w-4 ml-1" />
                        إنشاء شركة جديدة
                      </Button>
                      <Button variant="outline" onClick={loadSuggestedStructure}>
                        <RefreshCw className="h-4 w-4 ml-1" />
                        تحميل الهيكل المقترح
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>العرض القائمي للهيكل التنظيمي ({filteredFlatUnits.length} وحدة)</CardTitle>
              <CardDescription>
                جميع الوحدات التنظيمية في قائمة مسطحة مع المسار الهرمي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الوحدة التنظيمية</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">الكود</TableHead>
                      <TableHead className="text-right">المستوى</TableHead>
                      <TableHead className="text-right">عدد الموظفين</TableHead>
                      <TableHead className="text-right">المسار الهرمي</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFlatUnits.map((unit) => (
                      <TableRow key={unit.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {getUnitTypeIcon(unit.type)}
                            <div>
                              <div className="font-medium">{unit.nameAr}</div>
                              {unit.name !== unit.nameAr && (
                                <div className="text-sm text-gray-500">{unit.name}</div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getUnitTypeColor(unit.type)} variant="secondary">
                            {getUnitTypeText(unit.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {unit.code ? (
                            <Badge variant="outline" className="text-xs">
                              {unit.code}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="flex">
                              {Array.from({ length: unit.level }, (_, i) => (
                                <div key={i} className="w-2 h-2 bg-blue-200 rounded-full ml-1"></div>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">المستوى {unit.level}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{unit.employeeCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600 max-w-xs truncate" title={unit.path}>
                            {unit.path}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {unit.type === 'company' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setShowCompanyDetailsDialog(true)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                if (unit.type === 'company') {
                                  setShowEditCompanyDialog(true);
                                } else {
                                  // البحث عن الوحدة في الهيكل الأصلي لتمرير البيانات الكاملة
                                  const findUnit = (searchUnit: OrganizationalUnit): OrganizationalUnit | null => {
                                    if (searchUnit.id === unit.id) return searchUnit;
                                    if (searchUnit.children) {
                                      for (const child of searchUnit.children) {
                                        const found = findUnit(child);
                                        if (found) return found;
                                      }
                                    }
                                    return null;
                                  };
                                  const fullUnit = findUnit(currentChart);
                                  if (fullUnit) {
                                    setSelectedDepartment(fullUnit);
                                    setShowEditDeptDialog(true);
                                  }
                                }
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            {unit.type !== 'company' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteDepartment(unit.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredFlatUnits.length === 0 && (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد وحدات تنظيمية مطابقة لبحثك</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الهيكل التنظيمي</CardTitle>
              <CardDescription>
                إحصائيات وتحليلات الهيكل التنظيمي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">توزيع الوحدات حسب النوع</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">شركة</span>
                      <Badge variant="outline">{flatUnits.filter(u => u.type === 'company').length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">قطاعات</span>
                      <Badge variant="outline">{flatUnits.filter(u => u.type === 'division').length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">إدارات</span>
                      <Badge variant="outline">{flatUnits.filter(u => u.type === 'department').length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">وحدات</span>
                      <Badge variant="outline">{flatUnits.filter(u => u.type === 'unit').length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">مكاتب مساندة</span>
                      <Badge variant="outline">{flatUnits.filter(u => u.type === 'support_office').length}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">توزيع الموظفين حسب المستوى</h3>
                  <div className="space-y-2">
                    {Array.from({ length: getMaxDepth(currentChart) + 1 }, (_, level) => {
                      const unitsAtLevel = flatUnits.filter(u => u.level === level);
                      const employeesAtLevel = unitsAtLevel.reduce((sum, u) => sum + u.employeeCount, 0);
                      const percentage = getTotalEmployees(currentChart) > 0 
                        ? Math.round((employeesAtLevel / getTotalEmployees(currentChart)) * 100)
                        : 0;
                      
                      return (
                        <div key={level} className="flex justify-between items-center">
                          <span className="text-sm">المستوى {level}</span>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge variant="outline">{employeesAtLevel} موظف</Badge>
                            <Badge variant="secondary">{percentage}%</Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">أكبر الوحدات (حسب عدد الموظفين)</h3>
                  <div className="space-y-2">
                    {flatUnits
                      .filter(u => u.employeeCount > 0)
                      .sort((a, b) => b.employeeCount - a.employeeCount)
                      .slice(0, 5)
                      .map(unit => (
                        <div key={unit.id} className="flex justify-between items-center">
                          <span className="text-sm truncate max-w-[200px]" title={unit.nameAr}>
                            {unit.nameAr}
                          </span>
                          <Badge variant="outline">{unit.employeeCount} موظف</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">معلومات إضافية</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">متوسط الموظفين لكل وحدة</span>
                      <Badge variant="outline">
                        {getTotalDepartments(currentChart) > 0 
                          ? Math.round(getTotalEmployees(currentChart) / getTotalDepartments(currentChart))
                          : 0}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">الوحدات بدون موظفين</span>
                      <Badge variant="outline">
                        {flatUnits.filter(u => u.employeeCount === 0).length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">عمق الهيكل التنظيمي</span>
                      <Badge variant="outline">{getMaxDepth(currentChart)} مستوى</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* الحوارات */}
      <AddDepartmentDialog
        open={showAddDeptDialog}
        onOpenChange={setShowAddDeptDialog}
        onAddDepartment={handleAddDepartment}
        parentId={parentDepartmentId}
      />

      <EditDepartmentDialog
        open={showEditDeptDialog}
        onOpenChange={setShowEditDeptDialog}
        onEditDepartment={handleEditDepartment}
        department={selectedDepartment}
      />

      <AddUserDialog
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
        onAddUser={(user) => {
          console.log('إضافة مستخدم جديد:', user);
        }}
      />

      <AddCompanyDialog
        open={showAddCompanyDialog}
        onOpenChange={setShowAddCompanyDialog}
        onAddCompany={handleAddCompany}
      />

      <EditCompanyDialog
        open={showEditCompanyDialog}
        onOpenChange={setShowEditCompanyDialog}
        onEditCompany={handleEditCompany}
        company={currentChart}
      />

      <CompanyDetailsDialog
        open={showCompanyDetailsDialog}
        onOpenChange={setShowCompanyDetailsDialog}
        company={currentChart}
        onEdit={() => {
          setShowCompanyDetailsDialog(false);
          setShowEditCompanyDialog(true);
        }}
        onDelete={handleDeleteCompany}
      />
    </div>
  );
}