import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Briefcase, Monitor, Calculator, PenTool as Tool } from 'lucide-react';
import { DashboardStats } from '../../types';

// Mock data
const mockStats: DashboardStats = {
  totalApplicants: 42,
  byCategory: {
    it: 18,
    maintenance: 12,
    accounting: 12
  }
};

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the Al Modaqdimah School job application dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Applications" 
          value={mockStats.totalApplicants} 
          icon={<Briefcase className="h-8 w-8 text-primary" />} 
          change="+12% from last month"
          changeType="increase"
        />
        <StatsCard 
          title="IT Services" 
          value={mockStats.byCategory.it} 
          icon={<Monitor className="h-8 w-8 text-blue-500" />} 
          change="+8% from last month"
          changeType="increase"
        />
        <StatsCard 
          title="Maintenance" 
          value={mockStats.byCategory.maintenance} 
          icon={<Tool className="h-8 w-8 text-green-500" />} 
          change="-3% from last month"
          changeType="decrease"
        />
        <StatsCard 
          title="Accounting" 
          value={mockStats.byCategory.accounting} 
          icon={<Calculator className="h-8 w-8 text-yellow-500" />} 
          change="+15% from last month"
          changeType="increase"
        />
      </div>

      {/* Recent applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Applied Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <AppRow 
                  name="Ahmed Mahmoud" 
                  category="IT Services" 
                  date="2023-04-01" 
                  status="New"
                />
                <AppRow 
                  name="Fatima Al-Sayed" 
                  category="Accounting" 
                  date="2023-03-28" 
                  status="In Review"
                />
                <AppRow 
                  name="Mohammed Al-Qassim" 
                  category="Maintenance" 
                  date="2023-03-25" 
                  status="Contacted"
                />
                <AppRow 
                  name="Layla Khalid" 
                  category="IT Services" 
                  date="2023-03-20" 
                  status="Interviewed"
                />
                <AppRow 
                  name="Omar Saleh" 
                  category="Accounting" 
                  date="2023-03-15" 
                  status="Declined"
                />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Application trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Applications by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">IT Services (43%)</span>
                </div>
                <span className="text-sm font-medium">{mockStats.byCategory.it}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '43%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-4 mt-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Maintenance (28%)</span>
                </div>
                <span className="text-sm font-medium">{mockStats.byCategory.maintenance}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-4 mt-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Accounting (29%)</span>
                </div>
                <span className="text-sm font-medium">{mockStats.byCategory.accounting}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '29%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Application Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="w-full px-4">
              <div className="flex items-end space-x-2 justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-primary rounded-t-md" style={{ height: '50px' }}></div>
                  <span className="text-xs mt-1">Jan</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-primary rounded-t-md" style={{ height: '70px' }}></div>
                  <span className="text-xs mt-1">Feb</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-primary rounded-t-md" style={{ height: '85px' }}></div>
                  <span className="text-xs mt-1">Mar</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-primary rounded-t-md" style={{ height: '120px' }}></div>
                  <span className="text-xs mt-1">Apr</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-200 rounded-t-md" style={{ height: '60px' }}></div>
                  <span className="text-xs mt-1">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 bg-gray-200 rounded-t-md" style={{ height: '40px' }}></div>
                  <span className="text-xs mt-1">Jun</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColors = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-500'
  };

  return (
    <Card className="transform transition-transform hover:scale-105">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            <p className={`text-xs ${changeColors[changeType]} mt-2`}>
              {change}
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AppRowProps {
  name: string;
  category: string;
  date: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Interviewed' | 'Declined';
}

const AppRow: React.FC<AppRowProps> = ({ name, category, date, status }) => {
  const statusClasses = {
    'New': 'bg-blue-100 text-blue-800',
    'In Review': 'bg-yellow-100 text-yellow-800',
    'Contacted': 'bg-purple-100 text-purple-800',
    'Interviewed': 'bg-green-100 text-green-800',
    'Declined': 'bg-red-100 text-red-800'
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {name}
      </td>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">{date}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default Overview;