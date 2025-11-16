// بيانات تجريبية للمنصة
import { User, Role, Permission, OrganizationalUnit, Policy, Risk, Finding, AuditPlan, DashboardMetrics } from '../types';

// الأدوار والصلاحيات
export const permissions: Permission[] = [
  // إدارة الهيكل والسياسات
  { id: 'view_policies', action: 'VIEW', resource: 'POLICIES' },
  { id: 'edit_policies', action: 'EDIT', resource: 'POLICIES' },
  
  // تخطيط المراجعة
  { id: 'create_audit_plan', action: 'CREATE', resource: 'AUDIT_PLAN' },
  { id: 'approve_audit_plan', action: 'APPROVE', resource: 'AUDIT_PLAN' },
  { id: 'assign_auditors', action: 'ASSIGN', resource: 'AUDITORS' },
  
  // تنفيذ المراجعة
  { id: 'create_working_papers', action: 'CREATE', resource: 'WORKING_PAPERS' },
  { id: 'issue_findings', action: 'CREATE', resource: 'FINDINGS' },
  
  // التقارير والمتابعة
  { id: 'create_report_draft', action: 'CREATE', resource: 'AUDIT_REPORT' },
  { id: 'review_reports', action: 'REVIEW', resource: 'AUDIT_REPORT' },
  { id: 'approve_final_report', action: 'APPROVE', resource: 'AUDIT_REPORT' },
  { id: 'view_all_reports', action: 'VIEW_ALL', resource: 'AUDIT_REPORT' },
  { id: 'view_department_findings', action: 'VIEW_DEPARTMENT', resource: 'FINDINGS' },
  
  // إدارة المخاطر
  { id: 'manage_risk_register', action: 'MANAGE', resource: 'RISK_REGISTER' },
  { id: 'assess_risks', action: 'ASSESS', resource: 'RISKS' },
  { id: 'propose_controls', action: 'PROPOSE', resource: 'CONTROLS' },
  { id: 'approve_risk_treatment', action: 'APPROVE', resource: 'RISK_TREATMENT' },
  { id: 'update_control_status', action: 'UPDATE', resource: 'CONTROL_STATUS' },
  
  // متابعة خطط العمل
  { id: 'submit_response', action: 'SUBMIT', resource: 'FINDING_RESPONSE' },
  { id: 'review_action_plan', action: 'REVIEW', resource: 'ACTION_PLAN' },
  { id: 'approve_action_plan', action: 'APPROVE', resource: 'ACTION_PLAN' },
  { id: 'update_action_status', action: 'UPDATE', resource: 'ACTION_STATUS' },
  { id: 'verify_closure', action: 'VERIFY', resource: 'FINDING_CLOSURE' },
  { id: 'final_close_finding', action: 'CLOSE', resource: 'FINDING' }
];

export const roles: Role[] = [
  {
    id: 'cae',
    name: 'Chief Audit Executive',
    nameAr: 'المدير التنفيذي للمراجعة',
    level: 1,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'create_audit_plan')!,
      permissions.find(p => p.id === 'approve_audit_plan')!,
      permissions.find(p => p.id === 'assign_auditors')!,
      permissions.find(p => p.id === 'review_reports')!,
      permissions.find(p => p.id === 'approve_final_report')!,
      permissions.find(p => p.id === 'view_all_reports')!,
      permissions.find(p => p.id === 'manage_risk_register')!,
      permissions.find(p => p.id === 'approve_risk_treatment')!,
    ]
  },
  {
    id: 'audit_manager',
    name: 'Audit Manager',
    nameAr: 'مدير المراجعة',
    level: 2,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'create_audit_plan')!,
      permissions.find(p => p.id === 'assign_auditors')!,
      permissions.find(p => p.id === 'create_working_papers')!,
      permissions.find(p => p.id === 'issue_findings')!,
      permissions.find(p => p.id === 'create_report_draft')!,
      permissions.find(p => p.id === 'review_reports')!,
      permissions.find(p => p.id === 'manage_risk_register')!,
      permissions.find(p => p.id === 'assess_risks')!,
      permissions.find(p => p.id === 'propose_controls')!,
      permissions.find(p => p.id === 'review_action_plan')!,
      permissions.find(p => p.id === 'approve_action_plan')!,
      permissions.find(p => p.id === 'verify_closure')!,
      permissions.find(p => p.id === 'final_close_finding')!,
    ]
  },
  {
    id: 'auditor',
    name: 'Auditor',
    nameAr: 'مراجع',
    level: 3,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'create_working_papers')!,
      permissions.find(p => p.id === 'issue_findings')!,
      permissions.find(p => p.id === 'create_report_draft')!,
      permissions.find(p => p.id === 'assess_risks')!,
      permissions.find(p => p.id === 'propose_controls')!,
      permissions.find(p => p.id === 'update_control_status')!,
      permissions.find(p => p.id === 'verify_closure')!,
    ]
  },
  {
    id: 'process_owner',
    name: 'Process Owner',
    nameAr: 'مالك العملية',
    level: 4,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'view_department_findings')!,
      permissions.find(p => p.id === 'assess_risks')!,
      permissions.find(p => p.id === 'propose_controls')!,
      permissions.find(p => p.id === 'update_control_status')!,
      permissions.find(p => p.id === 'submit_response')!,
      permissions.find(p => p.id === 'update_action_status')!,
    ]
  },
  {
    id: 'senior_management',
    name: 'Senior Management',
    nameAr: 'الإدارة العليا',
    level: 5,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'view_all_reports')!,
    ]
  },
  {
    id: 'audit_committee',
    name: 'Audit Committee',
    nameAr: 'لجنة المراجعة',
    level: 6,
    permissions: [
      permissions.find(p => p.id === 'view_policies')!,
      permissions.find(p => p.id === 'view_all_reports')!,
    ]
  }
];

// المستخدمون
export const users: User[] = [
  {
    id: '1',
    name: 'أحمد محمد السالم',
    email: 'ahmed.salem@company.com',
    position: 'المدير التنفيذي للمراجعة الداخلية',
    department: 'المراجعة الداخلية',
    roles: [roles[0]], // CAE
    isActive: true,
    lastLogin: new Date('2024-11-10T09:00:00')
  },
  {
    id: '2',
    name: 'فاطمة عبدالله النصر',
    email: 'fatima.alnasr@company.com',
    position: 'مدير المراجعة',
    department: 'المراجعة الداخلية',
    roles: [roles[1]], // Audit Manager
    isActive: true,
    lastLogin: new Date('2024-11-11T08:30:00')
  },
  {
    id: '3',
    name: 'محمد علي الخالدي',
    email: 'mohammed.alkhaldi@company.com',
    position: 'مراجع أول',
    department: 'المراجعة الداخلية',
    roles: [roles[2]], // Auditor
    isActive: true,
    lastLogin: new Date('2024-11-11T09:15:00')
  },
  {
    id: '4',
    name: 'سارة أحمد الزهراني',
    email: 'sara.alzahrani@company.com',
    position: 'مدير المالية',
    department: 'المالية',
    roles: [roles[3]], // Process Owner
    isActive: true,
    lastLogin: new Date('2024-11-10T14:20:00')
  },
  {
    id: '5',
    name: 'عبدالرحمن سعد المطيري',
    email: 'abdulrahman.almutairi@company.com',
    position: 'الرئيس التنفيذي',
    department: 'الإدارة العليا',
    roles: [roles[4]], // Senior Management
    isActive: true,
    lastLogin: new Date('2024-11-09T16:00:00')
  }
];

// الهيكل التنظيمي
export const organizationalChart: OrganizationalUnit = {
  id: 'root',
  name: 'الشركة السعودية المحدودة',
  nameAr: 'الشركة السعودية المحدودة',
  managerId: '5',
  employees: [],
  children: [
    {
      id: 'audit',
      name: 'إدارة المراجعة الداخلية',
      nameAr: 'إدارة المراجعة الداخلية',
      parentId: 'root',
      managerId: '1',
      employees: [users[0], users[1], users[2]],
      children: []
    },
    {
      id: 'finance',
      name: 'الإدارة المالية',
      nameAr: 'الإدارة المالية',
      parentId: 'root',
      managerId: '4',
      employees: [users[3]],
      children: [
        {
          id: 'accounting',
          name: 'قسم المحاسبة',
          nameAr: 'قسم المحاسبة',
          parentId: 'finance',
          employees: [],
          children: []
        },
        {
          id: 'treasury',
          name: 'قسم الخزينة',
          nameAr: 'قسم الخزينة',
          parentId: 'finance',
          employees: [],
          children: []
        }
      ]
    },
    {
      id: 'operations',
      name: 'إدارة العمليات',
      nameAr: 'إدارة العمليات',
      parentId: 'root',
      employees: [],
      children: [
        {
          id: 'procurement',
          name: 'قسم المشتريات',
          nameAr: 'قسم المشتريات',
          parentId: 'operations',
          employees: [],
          children: []
        },
        {
          id: 'logistics',
          name: 'قسم اللوجستيات',
          nameAr: 'قسم اللوجستيات',
          parentId: 'operations',
          employees: [],
          children: []
        }
      ]
    },
    {
      id: 'hr',
      name: 'إدارة الموارد البشرية',
      nameAr: 'إدارة الموارد البشرية',
      parentId: 'root',
      employees: [],
      children: []
    }
  ]
};

// السياسات والإجراءات
export const policies: Policy[] = [
  {
    id: 'pol_001',
    title: 'سياسة المراجعة الداخلية',
    titleAr: 'سياسة المراجعة الداخلية',
    type: 'policy',
    department: 'المراجعة الداخلية',
    version: '2.1',
    status: 'active',
    lastUpdated: new Date('2024-01-15'),
    content: 'هذه السياسة تحدد إطار عمل المراجعة الداخلية...',
    sections: [
      {
        id: 'sec_001_1',
        title: 'الهدف والنطاق',
        content: 'تهدف هذه السياسة إلى تحديد إطار عمل شامل للمراجعة الداخلية...',
        order: 1
      },
      {
        id: 'sec_001_2',
        title: 'المسؤوليات',
        content: 'يتحمل المدير التنفيذي للمراجعة الداخلية مسؤولية...',
        order: 2
      }
    ]
  },
  {
    id: 'pol_002',
    title: 'إجراءات إدارة المخاطر',
    titleAr: 'إجراءات إدارة المخاطر',
    type: 'procedure',
    department: 'إدارة المخاطر',
    version: '1.3',
    status: 'active',
    lastUpdated: new Date('2024-03-20'),
    content: 'هذه الإجراءات تحدد كيفية تحديد وتقييم ومعالجة المخاطر...',
    sections: [
      {
        id: 'sec_002_1',
        title: 'تحديد المخاطر',
        content: 'يتم تحديد المخاطر من خلال ورش العمل والمقابلات...',
        order: 1
      }
    ]
  }
];

// المخاطر
export const risks: Risk[] = [
  {
    id: 'risk_001',
    title: 'مخاطر الائتمان',
    description: 'مخاطر عدم سداد العملاء لالتزاماتهم المالية',
    category: 'مخاطر مالية',
    department: 'المالية',
    processOwner: '4',
    inherentRisk: {
      probability: 4,
      impact: 5,
      score: 20,
      level: 'high'
    },
    residualRisk: {
      probability: 2,
      impact: 4,
      score: 8,
      level: 'medium'
    },
    controls: [
      {
        id: 'ctrl_001',
        title: 'مراجعة الجدارة الائتمانية',
        description: 'مراجعة دورية للجدارة الائتمانية للعملاء',
        type: 'preventive',
        frequency: 'monthly',
        owner: '4',
        effectiveness: 'effective',
        lastTested: new Date('2024-10-15')
      }
    ],
    status: 'monitored',
    lastReviewed: new Date('2024-11-01')
  }
];

// الملاحظات
export const findings: Finding[] = [
  {
    id: 'find_001',
    auditId: 'audit_001',
    title: 'ضعف في ضوابط الموافقة على المشتريات',
    description: 'تم اكتشاف عدم التزام بحدود الموافقة المحددة في سياسة المشتريات',
    recommendation: 'تطبيق نظام موافقات إلكتروني يضمن التزام حدود الموافقة',
    severity: 'high',
    department: 'المشتريات',
    processOwner: '4',
    status: 'action_plan_submitted',
    issuedDate: new Date('2024-10-15'),
    targetDate: new Date('2024-12-31'),
    responses: [
      {
        id: 'resp_001',
        findingId: 'find_001',
        respondent: '4',
        response: 'نوافق على الملاحظة ونلتزم بتطبيق التوصية',
        responseType: 'agreement',
        submittedDate: new Date('2024-10-20')
      }
    ]
  }
];

// خطة المراجعة
export const auditPlan: AuditPlan = {
  id: 'plan_2024',
  title: 'خطة المراجعة السنوية 2024',
  year: 2024,
  status: 'approved',
  approvedBy: '1',
  approvedDate: new Date('2024-01-10'),
  audits: [
    {
      id: 'audit_001',
      title: 'مراجعة عملية المشتريات',
      department: 'المشتريات',
      processOwner: '4',
      assignedAuditors: ['2', '3'],
      plannedStartDate: new Date('2024-10-01'),
      plannedEndDate: new Date('2024-11-15'),
      actualStartDate: new Date('2024-10-01'),
      status: 'report_draft',
      riskLevel: 'high'
    },
    {
      id: 'audit_002',
      title: 'مراجعة النظم المالية',
      department: 'المالية',
      processOwner: '4',
      assignedAuditors: ['2'],
      plannedStartDate: new Date('2024-12-01'),
      plannedEndDate: new Date('2025-01-15'),
      status: 'planned',
      riskLevel: 'medium'
    }
  ]
};

// مقاييس لوحة المتابعة
export const dashboardMetrics: DashboardMetrics = {
  totalFindings: 15,
  openFindings: 8,
  overdueFindings: 3,
  completedFindings: 7,
  highRiskFindings: 4,
  auditProgress: {
    planned: 5,
    inProgress: 3,
    completed: 7
  },
  riskMetrics: {
    totalRisks: 25,
    highRisks: 6,
    mediumRisks: 12,
    lowRisks: 7
  }
};

// المستخدم الحالي (للمحاكاة)
export const currentUser = users[0]; // CAE