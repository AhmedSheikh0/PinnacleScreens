export interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  roles: Role[];
  isActive: boolean;
  lastLogin?: Date;
}

export interface Role {
  id: string;
  name: string;
  nameAr: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  nameAr: string;
  resource: string;
  action: string;
}

export interface OrganizationalUnit {
  id: string;
  name: string;
  nameAr: string;
  code?: string;
  type?: 'company' | 'division' | 'department' | 'unit' | 'support_office';
  parentId?: string;
  managerId?: string;
  employees: Employee[];
  children?: OrganizationalUnit[];
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  department: string;
  isActive: boolean;
  roles: Role[];
}

export interface Policy {
  id: string;
  titleAr: string;
  titleEn?: string;
  content: string;
  type: 'policy' | 'procedure' | 'manual' | 'form';
  department: string;
  version: string;
  status: 'active' | 'draft' | 'expired';
  effectiveDate: Date;
  lastUpdated: Date;
  approvedBy?: string;
  reviewDate?: Date;
}

export interface AuditPlan {
  id: string;
  title: string;
  description: string;
  auditType: 'operational' | 'financial' | 'compliance' | 'it' | 'quality';
  department: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  plannedStartDate: Date;
  plannedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  assignedAuditors: string[];
  estimatedHours: number;
  actualHours?: number;
  objectives: string[];
  scope: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  inherentRisk: RiskAssessment;
  residualRisk: RiskAssessment;
  controls: Control[];
  owner: string;
  lastReviewed: Date;
  nextReview: Date;
}

export interface RiskAssessment {
  probability: number; // 1-5
  impact: number; // 1-5
  score: number; // probability * impact
  level: 'low' | 'medium' | 'high' | 'critical';
}

export interface Control {
  id: string;
  title: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective';
  frequency: string;
  owner: string;
  effectiveness: 'effective' | 'partially_effective' | 'ineffective' | 'not_tested';
  lastTested?: Date;
  nextTest?: Date;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'response_pending' | 'action_plan_submitted' | 'action_plan_approved' | 'in_progress' | 'completed' | 'closed';
  department: string;
  processOwner: string;
  issuedDate: Date;
  targetDate?: Date;
  actualDate?: Date;
  responses: FindingResponse[];
}

export interface FindingResponse {
  id: string;
  findingId: string;
  respondent: string;
  response: string;
  responseType: 'agreement' | 'disagreement' | 'clarification';
  submittedDate: Date;
}

export interface ActionPlan {
  id: string;
  findingId: string;
  actions: ActionItem[];
  status: 'draft' | 'submitted' | 'approved' | 'in_progress' | 'completed';
  submittedBy: string;
  submittedDate?: Date;
  approvedBy?: string;
  approvedDate?: Date;
}

export interface ActionItem {
  id: string;
  description: string;
  responsible: string;
  targetDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  evidence?: string;
  completedDate?: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  userId: string;
  isRead: boolean;
  createdDate: Date;
  link?: string;
}