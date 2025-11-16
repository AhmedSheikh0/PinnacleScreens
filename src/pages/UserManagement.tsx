import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield,
  UserCheck,
  UserX,
  Mail,
  Download,
  Filter
} from 'lucide-react';
import { users as initialUsers, roles } from '@/data/mockData';
import { User } from '@/types';
import { AddUserDialog } from '@/components/dialogs/AddUserDialog';
import { EditUserDialog } from '@/components/dialogs/EditUserDialog';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [users, setUsers] = useState(initialUsers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || 
                       user.roles.some(role => role.id === selectedRole);
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (newUserData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...newUserData,
      id: (users.length + 1).toString()
    };
    setUsers([...users, newUser]);
    console.log('تم إضافة المستخدم بنجاح:', newUser.name);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    console.log('تم تحديث المستخدم بنجاح:', updatedUser.name);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
    const user = users.find(u => u.id === userId);
    console.log(`تم ${user?.isActive ? 'إلغاء تفعيل' : 'تفعيل'} المستخدم:`, user?.name);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (confirm(`هل أنت متأكد من حذف المستخدم "${user?.name}"؟`)) {
      setUsers(users.filter(user => user.id !== userId));
      console.log('تم حذف المستخدم:', user?.name);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
    console.log('فتح حوار تعديل المستخدم:', user.name);
  };

  const handleManageRoles = (user: User) => {
    setSelectedUser(user);
    setShowEditDialog(true);
    console.log('إدارة أدوار المستخدم:', user.name);
  };

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "الاسم,البريد الإلكتروني,المنصب,القسم,الحالة\n"
      + users.map(user => 
          `${user.name},${user.email},${user.position},${user.department},${user.isActive ? 'نشط' : 'غير نشط'}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('تم تصدير قائمة المستخدمين');
  };

  const getRoleBadgeColor = (roleId: string) => {
    switch (roleId) {
      case 'cae': return 'bg-purple-100 text-purple-800';
      case 'audit_manager': return 'bg-blue-100 text-blue-800';
      case 'auditor': return 'bg-green-100 text-green-800';
      case 'process_owner': return 'bg-orange-100 text-orange-800';
      case 'senior_management': return 'bg-red-100 text-red-800';
      case 'audit_committee': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastLogin = (date: Date | undefined) => {
    if (!date) return 'لم يسجل دخول';
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ أقل من ساعة';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة المستخدمين والأدوار والصلاحيات</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-1" />
            إضافة مستخدم جديد
          </Button>
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="h-4 w-4 ml-1" />
            تصدير القائمة
          </Button>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.isActive).length}</p>
                <p className="text-sm text-gray-600">المستخدمين النشطين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-sm text-gray-600">الأدوار المتاحة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Mail className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{users.filter(u => !u.isActive).length}</p>
                <p className="text-sm text-gray-600">حسابات معطلة</p>
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
                placeholder="البحث بالاسم أو البريد الإلكتروني أو القسم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
              >
                <option value="all">جميع الأدوار</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.nameAr}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* جدول المستخدمين */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين ({filteredUsers.length})</CardTitle>
          <CardDescription>
            إدارة المستخدمين وأدوارهم وصلاحياتهم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">القسم</TableHead>
                  <TableHead className="text-right">الأدوار</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">آخر تسجيل دخول</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.position}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge 
                            key={role.id} 
                            className={getRoleBadgeColor(role.id)}
                            variant="secondary"
                          >
                            {role.nameAr}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {user.isActive ? (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-700">نشط</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-500">غير نشط</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {formatLastLogin(user.lastLogin)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditClick(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل المستخدم
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleManageRoles(user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            إدارة الأدوار
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                            {user.isActive ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                إلغاء التفعيل
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                تفعيل المستخدم
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            حذف المستخدم
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد نتائج مطابقة لبحثك</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* مصفوفة الأدوار والصلاحيات */}
      <Card>
        <CardHeader>
          <CardTitle>مصفوفة الأدوار والصلاحيات</CardTitle>
          <CardDescription>
            عرض الصلاحيات المخصصة لكل دور
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3 font-medium bg-gray-50">الصلاحية</th>
                  {roles.map(role => (
                    <th key={role.id} className="text-center p-3 font-medium min-w-[120px] bg-gray-50">
                      {role.nameAr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'إنشاء خطة المراجعة',
                  'الموافقة على الخطة',
                  'تعيين المراجعين',
                  'إعداد أوراق العمل',
                  'إصدار الملاحظات',
                  'مراجعة التقارير',
                  'الموافقة النهائية',
                  'إدارة المخاطر',
                  'الرد على الملاحظات'
                ].map((permission, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium">{permission}</td>
                    {roles.map((role, roleIndex) => (
                      <td key={role.id} className="text-center p-3">
                        <div className="flex justify-center">
                          {(index + roleIndex) % 3 !== 0 ? (
                            <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                          ) : (
                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* الحوارات */}
      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
      />

      <EditUserDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onEditUser={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
}