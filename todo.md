# منصة المراجعة الداخلية وإدارة المخاطر - خطة التطوير

## الملفات المطلوبة للتطوير:

### 1. الصفحات الرئيسية (Pages)
- `src/pages/Dashboard.tsx` - الصفحة الرئيسية ولوحة المتابعة
- `src/pages/OrganizationalChart.tsx` - إدارة الهيكل التنظيمي
- `src/pages/PoliciesProcedures.tsx` - مكتبة السياسات والإجراءات
- `src/pages/UserManagement.tsx` - إدارة المستخدمين والأدوار
- `src/pages/AuditPlanning.tsx` - تخطيط المراجعة
- `src/pages/RiskManagement.tsx` - إدارة المخاطر
- `src/pages/FindingsTracking.tsx` - متابعة الملاحظات وخطط العمل
- `src/pages/Reports.tsx` - التقارير والإحصائيات

### 2. المكونات المشتركة (Components)
- `src/components/Sidebar.tsx` - الشريط الجانبي للتنقل
- `src/components/Header.tsx` - رأس الصفحة
- `src/components/Layout.tsx` - تخطيط الصفحة العام
- `src/components/OrgChart.tsx` - مكون الهيكل التنظيمي التفاعلي
- `src/components/PermissionMatrix.tsx` - مصفوفة الصلاحيات
- `src/components/FindingCard.tsx` - بطاقة الملاحظة
- `src/components/ActionPlanForm.tsx` - نموذج خطة العمل

### 3. الخدمات والبيانات (Services & Data)
- `src/lib/auth.ts` - خدمات المصادقة والتخويل
- `src/lib/permissions.ts` - منطق الصلاحيات
- `src/data/mockData.ts` - بيانات تجريبية للعرض
- `src/types/index.ts` - تعريفات الأنواع

### 4. التحديثات على الملفات الموجودة
- تحديث `src/App.tsx` لإضافة التوجيه للصفحات الجديدة
- تحديث `index.html` لتغيير العنوان والوصف
- تحديث `src/pages/Index.tsx` لتكون صفحة تسجيل الدخول

## الميزات الرئيسية:
1. نظام تسجيل دخول آمن مع أدوار متعددة
2. هيكل تنظيمي تفاعلي قابل للتحرير
3. مكتبة سياسات منظمة مع محرك بحث
4. نظام صلاحيات متقدم (RBAC)
5. دورة حياة كاملة للملاحظات وخطط العمل
6. لوحات متابعة تفاعلية
7. تقارير وإحصائيات شاملة
8. إشعارات وتنبيهات آلية