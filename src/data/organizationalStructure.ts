import { OrganizationalUnit } from '@/types';

export const suggestedOrgStructure: OrganizationalUnit = {
  id: 'company',
  name: 'Your Company',
  nameAr: 'شركتكم',
  code: 'COMP',
  type: 'company',
  managerId: 'ceo_001',
  employees: [
    {
      id: 'ceo_001',
      name: 'الرئيس التنفيذي',
      position: 'الرئيس التنفيذي',
      email: 'ceo@company.com',
      department: 'الإدارة العليا',
      isActive: true,
      roles: []
    }
  ],
  children: [
    // مكاتب مساندة مباشرة للرئيس التنفيذي
    {
      id: 'internal_audit',
      name: 'Internal Audit',
      nameAr: 'التدقيق الداخلي',
      code: 'IA',
      type: 'support_office',
      parentId: 'company',
      managerId: 'ia_manager',
      employees: [
        {
          id: 'ia_manager',
          name: 'مدير التدقيق الداخلي',
          position: 'مدير التدقيق الداخلي',
          email: 'ia.manager@company.com',
          department: 'التدقيق الداخلي',
          isActive: true,
          roles: []
        }
      ],
      children: []
    },
    {
      id: 'compliance',
      name: 'Compliance',
      nameAr: 'الامتثال',
      code: 'COMP',
      type: 'support_office',
      parentId: 'company',
      managerId: 'comp_manager',
      employees: [
        {
          id: 'comp_manager',
          name: 'مدير الامتثال',
          position: 'مدير الامتثال',
          email: 'compliance.manager@company.com',
          department: 'الامتثال',
          isActive: true,
          roles: []
        }
      ],
      children: []
    },
    {
      id: 'legal',
      name: 'Legal Affairs',
      nameAr: 'الشؤون القانونية',
      code: 'LEG',
      type: 'support_office',
      parentId: 'company',
      managerId: 'legal_manager',
      employees: [
        {
          id: 'legal_manager',
          name: 'مدير الشؤون القانونية',
          position: 'مدير الشؤون القانونية',
          email: 'legal.manager@company.com',
          department: 'الشؤون القانونية',
          isActive: true,
          roles: []
        }
      ],
      children: []
    },
    
    // العمليات التشغيلية
    {
      id: 'operations',
      name: 'Operations',
      nameAr: 'العمليات التشغيلية',
      code: 'OPS',
      type: 'division',
      parentId: 'company',
      managerId: 'ops_director',
      employees: [
        {
          id: 'ops_director',
          name: 'مدير العمليات التشغيلية',
          position: 'مدير العمليات التشغيلية',
          email: 'ops.director@company.com',
          department: 'العمليات التشغيلية',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'production',
          name: 'Production',
          nameAr: 'الإنتاج',
          code: 'PROD',
          type: 'department',
          parentId: 'operations',
          managerId: 'prod_manager',
          employees: [
            {
              id: 'prod_manager',
              name: 'مدير الإنتاج',
              position: 'مدير الإنتاج',
              email: 'production.manager@company.com',
              department: 'الإنتاج',
              isActive: true,
              roles: []
            }
          ],
          children: [
            {
              id: 'prod_line_1',
              name: 'Production Line 1',
              nameAr: 'خط إنتاج 1',
              code: 'PL1',
              type: 'unit',
              parentId: 'production',
              managerId: 'pl1_supervisor',
              employees: [
                {
                  id: 'pl1_supervisor',
                  name: 'مشرف خط الإنتاج 1',
                  position: 'مشرف خط الإنتاج',
                  email: 'pl1.supervisor@company.com',
                  department: 'الإنتاج',
                  isActive: true,
                  roles: []
                }
              ],
              children: []
            },
            {
              id: 'prod_line_2',
              name: 'Production Line 2',
              nameAr: 'خط إنتاج 2',
              code: 'PL2',
              type: 'unit',
              parentId: 'production',
              managerId: 'pl2_supervisor',
              employees: [
                {
                  id: 'pl2_supervisor',
                  name: 'مشرف خط الإنتاج 2',
                  position: 'مشرف خط الإنتاج',
                  email: 'pl2.supervisor@company.com',
                  department: 'الإنتاج',
                  isActive: true,
                  roles: []
                }
              ],
              children: []
            }
          ]
        },
        {
          id: 'maintenance',
          name: 'Maintenance',
          nameAr: 'الصيانة',
          code: 'MAINT',
          type: 'department',
          parentId: 'operations',
          managerId: 'maint_manager',
          employees: [
            {
              id: 'maint_manager',
              name: 'مدير الصيانة',
              position: 'مدير الصيانة',
              email: 'maintenance.manager@company.com',
              department: 'الصيانة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'quality',
          name: 'Quality',
          nameAr: 'الجودة',
          code: 'QC',
          type: 'department',
          parentId: 'operations',
          managerId: 'quality_manager',
          employees: [
            {
              id: 'quality_manager',
              name: 'مدير الجودة',
              position: 'مدير الجودة',
              email: 'quality.manager@company.com',
              department: 'الجودة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'hse',
          name: 'Health, Safety & Environment',
          nameAr: 'السلامة والصحة والبيئة',
          code: 'HSE',
          type: 'department',
          parentId: 'operations',
          managerId: 'hse_manager',
          employees: [
            {
              id: 'hse_manager',
              name: 'مدير السلامة والصحة والبيئة',
              position: 'مدير HSE',
              email: 'hse.manager@company.com',
              department: 'السلامة والصحة والبيئة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // الشؤون التجارية
    {
      id: 'commercial',
      name: 'Commercial Affairs',
      nameAr: 'الشؤون التجارية',
      code: 'COM',
      type: 'division',
      parentId: 'company',
      managerId: 'com_director',
      employees: [
        {
          id: 'com_director',
          name: 'مدير الشؤون التجارية',
          position: 'مدير الشؤون التجارية',
          email: 'commercial.director@company.com',
          department: 'الشؤون التجارية',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'sales',
          name: 'Sales',
          nameAr: 'المبيعات',
          code: 'SALES',
          type: 'department',
          parentId: 'commercial',
          managerId: 'sales_manager',
          employees: [
            {
              id: 'sales_manager',
              name: 'مدير المبيعات',
              position: 'مدير المبيعات',
              email: 'sales.manager@company.com',
              department: 'المبيعات',
              isActive: true,
              roles: []
            }
          ],
          children: [
            {
              id: 'b2b_sales',
              name: 'B2B Sales',
              nameAr: 'مبيعات الشركات',
              code: 'B2B',
              type: 'unit',
              parentId: 'sales',
              managerId: 'b2b_manager',
              employees: [
                {
                  id: 'b2b_manager',
                  name: 'مدير مبيعات الشركات',
                  position: 'مدير مبيعات B2B',
                  email: 'b2b.manager@company.com',
                  department: 'المبيعات',
                  isActive: true,
                  roles: []
                }
              ],
              children: []
            },
            {
              id: 'b2c_sales',
              name: 'B2C Sales',
              nameAr: 'مبيعات التجزئة',
              code: 'B2C',
              type: 'unit',
              parentId: 'sales',
              managerId: 'b2c_manager',
              employees: [
                {
                  id: 'b2c_manager',
                  name: 'مدير مبيعات التجزئة',
                  position: 'مدير مبيعات B2C',
                  email: 'b2c.manager@company.com',
                  department: 'المبيعات',
                  isActive: true,
                  roles: []
                }
              ],
              children: []
            }
          ]
        },
        {
          id: 'marketing',
          name: 'Marketing',
          nameAr: 'التسويق',
          code: 'MKT',
          type: 'department',
          parentId: 'commercial',
          managerId: 'mkt_manager',
          employees: [
            {
              id: 'mkt_manager',
              name: 'مدير التسويق',
              position: 'مدير التسويق',
              email: 'marketing.manager@company.com',
              department: 'التسويق',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'key_accounts',
          name: 'Key Account Management',
          nameAr: 'إدارة الحسابات الرئيسية',
          code: 'KAM',
          type: 'department',
          parentId: 'commercial',
          managerId: 'kam_manager',
          employees: [
            {
              id: 'kam_manager',
              name: 'مدير الحسابات الرئيسية',
              position: 'مدير الحسابات الرئيسية',
              email: 'kam.manager@company.com',
              department: 'إدارة الحسابات الرئيسية',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // المالية
    {
      id: 'finance',
      name: 'Finance',
      nameAr: 'المالية',
      code: 'FIN',
      type: 'division',
      parentId: 'company',
      managerId: 'fin_director',
      employees: [
        {
          id: 'fin_director',
          name: 'المدير المالي',
          position: 'المدير المالي',
          email: 'finance.director@company.com',
          department: 'المالية',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'general_accounting',
          name: 'General Accounting',
          nameAr: 'المحاسبة العامة',
          code: 'GA',
          type: 'department',
          parentId: 'finance',
          managerId: 'ga_manager',
          employees: [
            {
              id: 'ga_manager',
              name: 'مدير المحاسبة العامة',
              position: 'مدير المحاسبة العامة',
              email: 'ga.manager@company.com',
              department: 'المحاسبة العامة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'accounts_payable',
          name: 'Accounts Payable',
          nameAr: 'الحسابات الدائنة',
          code: 'AP',
          type: 'department',
          parentId: 'finance',
          managerId: 'ap_manager',
          employees: [
            {
              id: 'ap_manager',
              name: 'مدير الحسابات الدائنة',
              position: 'مدير الحسابات الدائنة',
              email: 'ap.manager@company.com',
              department: 'الحسابات الدائنة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'accounts_receivable',
          name: 'Accounts Receivable',
          nameAr: 'الحسابات المدينة',
          code: 'AR',
          type: 'department',
          parentId: 'finance',
          managerId: 'ar_manager',
          employees: [
            {
              id: 'ar_manager',
              name: 'مدير الحسابات المدينة',
              position: 'مدير الحسابات المدينة',
              email: 'ar.manager@company.com',
              department: 'الحسابات المدينة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'treasury',
          name: 'Treasury',
          nameAr: 'الخزانة',
          code: 'TREAS',
          type: 'department',
          parentId: 'finance',
          managerId: 'treas_manager',
          employees: [
            {
              id: 'treas_manager',
              name: 'مدير الخزانة',
              position: 'مدير الخزانة',
              email: 'treasury.manager@company.com',
              department: 'الخزانة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'cost_accounting',
          name: 'Cost Accounting',
          nameAr: 'محاسبة التكاليف',
          code: 'COST',
          type: 'department',
          parentId: 'finance',
          managerId: 'cost_manager',
          employees: [
            {
              id: 'cost_manager',
              name: 'مدير محاسبة التكاليف',
              position: 'مدير محاسبة التكاليف',
              email: 'cost.manager@company.com',
              department: 'محاسبة التكاليف',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'fpa',
          name: 'Financial Planning & Analysis',
          nameAr: 'التخطيط والتحليل المالي',
          code: 'FPA',
          type: 'department',
          parentId: 'finance',
          managerId: 'fpa_manager',
          employees: [
            {
              id: 'fpa_manager',
              name: 'مدير التخطيط والتحليل المالي',
              position: 'مدير FP&A',
              email: 'fpa.manager@company.com',
              department: 'التخطيط والتحليل المالي',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // الموارد البشرية
    {
      id: 'hr',
      name: 'Human Resources',
      nameAr: 'الموارد البشرية',
      code: 'HR',
      type: 'division',
      parentId: 'company',
      managerId: 'hr_director',
      employees: [
        {
          id: 'hr_director',
          name: 'مدير الموارد البشرية',
          position: 'مدير الموارد البشرية',
          email: 'hr.director@company.com',
          department: 'الموارد البشرية',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'recruitment',
          name: 'Recruitment',
          nameAr: 'التوظيف',
          code: 'REC',
          type: 'department',
          parentId: 'hr',
          managerId: 'rec_manager',
          employees: [
            {
              id: 'rec_manager',
              name: 'مدير التوظيف',
              position: 'مدير التوظيف',
              email: 'recruitment.manager@company.com',
              department: 'التوظيف',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'employee_affairs',
          name: 'Employee Affairs & Payroll',
          nameAr: 'شؤون الموظفين والرواتب',
          code: 'EMP',
          type: 'department',
          parentId: 'hr',
          managerId: 'emp_manager',
          employees: [
            {
              id: 'emp_manager',
              name: 'مدير شؤون الموظفين والرواتب',
              position: 'مدير شؤون الموظفين',
              email: 'employee.manager@company.com',
              department: 'شؤون الموظفين والرواتب',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'learning_development',
          name: 'Learning & Development',
          nameAr: 'التعلم والتطوير',
          code: 'LD',
          type: 'department',
          parentId: 'hr',
          managerId: 'ld_manager',
          employees: [
            {
              id: 'ld_manager',
              name: 'مدير التعلم والتطوير',
              position: 'مدير التعلم والتطوير',
              email: 'ld.manager@company.com',
              department: 'التعلم والتطوير',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // تقنية المعلومات
    {
      id: 'it',
      name: 'Information Technology',
      nameAr: 'تقنية المعلومات',
      code: 'IT',
      type: 'division',
      parentId: 'company',
      managerId: 'it_director',
      employees: [
        {
          id: 'it_director',
          name: 'مدير تقنية المعلومات',
          position: 'مدير تقنية المعلومات',
          email: 'it.director@company.com',
          department: 'تقنية المعلومات',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'infrastructure',
          name: 'Infrastructure',
          nameAr: 'البنية التحتية',
          code: 'INFRA',
          type: 'department',
          parentId: 'it',
          managerId: 'infra_manager',
          employees: [
            {
              id: 'infra_manager',
              name: 'مدير البنية التحتية',
              position: 'مدير البنية التحتية',
              email: 'infra.manager@company.com',
              department: 'البنية التحتية',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'helpdesk',
          name: 'User Support (Helpdesk)',
          nameAr: 'دعم المستخدمين',
          code: 'HELP',
          type: 'department',
          parentId: 'it',
          managerId: 'help_manager',
          employees: [
            {
              id: 'help_manager',
              name: 'مدير دعم المستخدمين',
              position: 'مدير دعم المستخدمين',
              email: 'helpdesk.manager@company.com',
              department: 'دعم المستخدمين',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'applications',
          name: 'Applications (ERP/CRM)',
          nameAr: 'التطبيقات',
          code: 'APP',
          type: 'department',
          parentId: 'it',
          managerId: 'app_manager',
          employees: [
            {
              id: 'app_manager',
              name: 'مدير التطبيقات',
              position: 'مدير التطبيقات',
              email: 'apps.manager@company.com',
              department: 'التطبيقات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'security',
          name: 'Information Security',
          nameAr: 'أمن المعلومات',
          code: 'SEC',
          type: 'department',
          parentId: 'it',
          managerId: 'sec_manager',
          employees: [
            {
              id: 'sec_manager',
              name: 'مدير أمن المعلومات',
              position: 'مدير أمن المعلومات',
              email: 'security.manager@company.com',
              department: 'أمن المعلومات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // سلسلة الإمداد
    {
      id: 'supply_chain',
      name: 'Supply Chain',
      nameAr: 'سلسلة الإمداد',
      code: 'SC',
      type: 'division',
      parentId: 'company',
      managerId: 'sc_director',
      employees: [
        {
          id: 'sc_director',
          name: 'مدير سلسلة الإمداد',
          position: 'مدير سلسلة الإمداد',
          email: 'sc.director@company.com',
          department: 'سلسلة الإمداد',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'procurement',
          name: 'Procurement',
          nameAr: 'المشتريات',
          code: 'PROC',
          type: 'department',
          parentId: 'supply_chain',
          managerId: 'proc_manager',
          employees: [
            {
              id: 'proc_manager',
              name: 'مدير المشتريات',
              position: 'مدير المشتريات',
              email: 'procurement.manager@company.com',
              department: 'المشتريات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'vendor_management',
          name: 'Vendor Management',
          nameAr: 'إدارة الموردين',
          code: 'VM',
          type: 'department',
          parentId: 'supply_chain',
          managerId: 'vm_manager',
          employees: [
            {
              id: 'vm_manager',
              name: 'مدير إدارة الموردين',
              position: 'مدير إدارة الموردين',
              email: 'vendor.manager@company.com',
              department: 'إدارة الموردين',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'warehouses',
          name: 'Warehouses',
          nameAr: 'المستودعات',
          code: 'WH',
          type: 'department',
          parentId: 'supply_chain',
          managerId: 'wh_manager',
          employees: [
            {
              id: 'wh_manager',
              name: 'مدير المستودعات',
              position: 'مدير المستودعات',
              email: 'warehouse.manager@company.com',
              department: 'المستودعات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'planning_demand',
          name: 'Planning & Demand',
          nameAr: 'التخطيط والطلب',
          code: 'PD',
          type: 'department',
          parentId: 'supply_chain',
          managerId: 'pd_manager',
          employees: [
            {
              id: 'pd_manager',
              name: 'مدير التخطيط والطلب',
              position: 'مدير التخطيط والطلب',
              email: 'planning.manager@company.com',
              department: 'التخطيط والطلب',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'logistics',
          name: 'Logistics',
          nameAr: 'اللوجستيات',
          code: 'LOG',
          type: 'department',
          parentId: 'supply_chain',
          managerId: 'log_manager',
          employees: [
            {
              id: 'log_manager',
              name: 'مدير اللوجستيات',
              position: 'مدير اللوجستيات',
              email: 'logistics.manager@company.com',
              department: 'اللوجستيات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // البحث والتطوير
    {
      id: 'rd',
      name: 'Research & Development',
      nameAr: 'البحث والتطوير',
      code: 'RD',
      type: 'division',
      parentId: 'company',
      managerId: 'rd_director',
      employees: [
        {
          id: 'rd_director',
          name: 'مدير البحث والتطوير',
          position: 'مدير البحث والتطوير',
          email: 'rd.director@company.com',
          department: 'البحث والتطوير',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'product_development',
          name: 'Product Development',
          nameAr: 'تطوير المنتجات',
          code: 'PD',
          type: 'department',
          parentId: 'rd',
          managerId: 'pd_manager_rd',
          employees: [
            {
              id: 'pd_manager_rd',
              name: 'مدير تطوير المنتجات',
              position: 'مدير تطوير المنتجات',
              email: 'product.dev@company.com',
              department: 'تطوير المنتجات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'engineering',
          name: 'Engineering',
          nameAr: 'الهندسة',
          code: 'ENG',
          type: 'department',
          parentId: 'rd',
          managerId: 'eng_manager',
          employees: [
            {
              id: 'eng_manager',
              name: 'مدير الهندسة',
              position: 'مدير الهندسة',
              email: 'engineering.manager@company.com',
              department: 'الهندسة',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'laboratories',
          name: 'Laboratories',
          nameAr: 'المختبرات',
          code: 'LAB',
          type: 'department',
          parentId: 'rd',
          managerId: 'lab_manager',
          employees: [
            {
              id: 'lab_manager',
              name: 'مدير المختبرات',
              position: 'مدير المختبرات',
              email: 'lab.manager@company.com',
              department: 'المختبرات',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // مكتب إدارة المشاريع
    {
      id: 'pmo',
      name: 'Project Management Office',
      nameAr: 'مكتب إدارة المشاريع',
      code: 'PMO',
      type: 'division',
      parentId: 'company',
      managerId: 'pmo_director',
      employees: [
        {
          id: 'pmo_director',
          name: 'مدير مكتب إدارة المشاريع',
          position: 'مدير PMO',
          email: 'pmo.director@company.com',
          department: 'مكتب إدارة المشاريع',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'portfolio_management',
          name: 'Portfolio/Project Management',
          nameAr: 'إدارة المحافظ والمشاريع',
          code: 'PM',
          type: 'department',
          parentId: 'pmo',
          managerId: 'pm_manager',
          employees: [
            {
              id: 'pm_manager',
              name: 'مدير إدارة المشاريع',
              position: 'مدير إدارة المشاريع',
              email: 'pm.manager@company.com',
              department: 'إدارة المحافظ والمشاريع',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'continuous_improvement',
          name: 'Continuous Improvement',
          nameAr: 'التحسين المستمر',
          code: 'CI',
          type: 'department',
          parentId: 'pmo',
          managerId: 'ci_manager',
          employees: [
            {
              id: 'ci_manager',
              name: 'مدير التحسين المستمر',
              position: 'مدير التحسين المستمر',
              email: 'ci.manager@company.com',
              department: 'التحسين المستمر',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    },

    // خدمة العملاء
    {
      id: 'customer_service',
      name: 'Customer Service',
      nameAr: 'خدمة العملاء',
      code: 'CS',
      type: 'division',
      parentId: 'company',
      managerId: 'cs_director',
      employees: [
        {
          id: 'cs_director',
          name: 'مدير خدمة العملاء',
          position: 'مدير خدمة العملاء',
          email: 'cs.director@company.com',
          department: 'خدمة العملاء',
          isActive: true,
          roles: []
        }
      ],
      children: [
        {
          id: 'call_center',
          name: 'Call Center',
          nameAr: 'مركز الاتصال',
          code: 'CC',
          type: 'department',
          parentId: 'customer_service',
          managerId: 'cc_manager',
          employees: [
            {
              id: 'cc_manager',
              name: 'مدير مركز الاتصال',
              position: 'مدير مركز الاتصال',
              email: 'callcenter.manager@company.com',
              department: 'مركز الاتصال',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'complaints',
          name: 'Complaints',
          nameAr: 'الشكاوى',
          code: 'COMP',
          type: 'department',
          parentId: 'customer_service',
          managerId: 'comp_manager_cs',
          employees: [
            {
              id: 'comp_manager_cs',
              name: 'مدير الشكاوى',
              position: 'مدير الشكاوى',
              email: 'complaints.manager@company.com',
              department: 'الشكاوى',
              isActive: true,
              roles: []
            }
          ],
          children: []
        },
        {
          id: 'customer_experience',
          name: 'Customer Experience',
          nameAr: 'تجربة العميل',
          code: 'CX',
          type: 'department',
          parentId: 'customer_service',
          managerId: 'cx_manager',
          employees: [
            {
              id: 'cx_manager',
              name: 'مدير تجربة العميل',
              position: 'مدير تجربة العميل',
              email: 'cx.manager@company.com',
              department: 'تجربة العميل',
              isActive: true,
              roles: []
            }
          ],
          children: []
        }
      ]
    }
  ]
};