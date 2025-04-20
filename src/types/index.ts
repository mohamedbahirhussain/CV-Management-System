export type JobCategory = 'it' | 'maintenance' | 'accounting';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'applicant' | 'staff';
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobCategory: JobCategory;
  cvUrl: string;
  appliedAt: string;
}

export interface DashboardStats {
  totalApplicants: number;
  byCategory: {
    it: number;
    maintenance: number;
    accounting: number;
  };
}