import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Target,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

const navigation = [
  {
    name: 'لوحة المتابعة',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['cae', 'audit_manager', 'auditor', 'process_owner', 'senior_management']
  },
  {
    name: 'الهيكل التنظيمي',
    href: '/organizational-chart',
    icon: Building2,
    roles: ['cae', 'audit_manager']
  },
  {
    name: 'إدارة المستخدمين',
    href: '/users',
    icon: Users,
    roles: ['cae', 'audit_manager']
  },
  {
    name: 'السياسات والإجراءات',
    href: '/policies',
    icon: FileText,
    roles: ['cae', 'audit_manager', 'auditor', 'process_owner']
  },
  {
    name: 'تخطيط المراجعة',
    href: '/audit-planning',
    icon: Target,
    roles: ['cae', 'audit_manager']
  },
  {
    name: 'إدارة المخاطر',
    href: '/risk-management',
    icon: AlertTriangle,
    roles: ['cae', 'audit_manager', 'auditor', 'process_owner']
  },
  {
    name: 'متابعة الملاحظات',
    href: '/findings',
    icon: ClipboardList,
    roles: ['cae', 'audit_manager', 'auditor', 'process_owner']
  },
  {
    name: 'التقارير',
    href: '/reports',
    icon: BarChart3,
    roles: ['cae', 'audit_manager', 'senior_management', 'audit_committee']
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, hasRole } = useAuth();

  const filteredNavigation = navigation.filter(item =>
    item.roles.some(role => hasRole(role))
  );

  return (
    <div className={cn(
      "bg-white border-l border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">منصة المراجعة</div>
                <div className="text-xs text-gray-500">الداخلية</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50",
                collapsed && "justify-center px-2"
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user.roles[0]?.nameAr}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}