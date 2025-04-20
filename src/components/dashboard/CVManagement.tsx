import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { Filter, FileText, Download, Trash2, Eye } from 'lucide-react';
import { Applicant, JobCategory } from '../../types';

// Mock data
const mockApplicants: Applicant[] = [
  {
    id: '1',
    name: 'Ahmed Mahmoud',
    email: 'ahmed.m@example.com',
    phone: '+966 50 123 4567',
    jobCategory: 'it',
    cvUrl: '#',
    appliedAt: '2023-04-01T10:30:00Z'
  },
  {
    id: '2',
    name: 'Fatima Al-Sayed',
    email: 'fatima.a@example.com',
    phone: '+966 55 987 6543',
    jobCategory: 'accounting',
    cvUrl: '#',
    appliedAt: '2023-03-28T14:15:00Z'
  },
  {
    id: '3',
    name: 'Mohammed Al-Qassim',
    email: 'mohammed.q@example.com',
    phone: '+966 56 456 7890',
    jobCategory: 'maintenance',
    cvUrl: '#',
    appliedAt: '2023-03-25T09:45:00Z'
  },
  {
    id: '4',
    name: 'Layla Khalid',
    email: 'layla.k@example.com',
    phone: '+966 54 567 8901',
    jobCategory: 'it',
    cvUrl: '#',
    appliedAt: '2023-03-20T16:20:00Z'
  },
  {
    id: '5',
    name: 'Omar Saleh',
    email: 'omar.s@example.com',
    phone: '+966 59 234 5678',
    jobCategory: 'accounting',
    cvUrl: '#',
    appliedAt: '2023-03-15T11:10:00Z'
  },
  {
    id: '6',
    name: 'Noor Abdullah',
    email: 'noor.a@example.com',
    phone: '+966 50 345 6789',
    jobCategory: 'maintenance',
    cvUrl: '#',
    appliedAt: '2023-03-10T13:40:00Z'
  },
];

const CVManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const handleCategoryChange = (category: JobCategory | 'all') => {
    setSelectedCategory(category);
  };

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesCategory = selectedCategory === 'all' || applicant.jobCategory === selectedCategory;
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const viewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setSelectedApplicant(null);
  };

  const getCategoryLabel = (category: JobCategory): string => {
    const labels = {
      it: 'IT Services',
      maintenance: 'Maintenance Services',
      accounting: 'Accounting Services'
    };
    return labels[category];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">CV Management</h1>
        <p className="text-gray-500 mt-1">Manage and organize job applications by category</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>Applications</CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applicants..."
                className="px-4 py-2 border rounded-md w-full sm:w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            <div className="relative">
              <select
                className="px-4 py-2 border rounded-md appearance-none pr-8 bg-white"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value as JobCategory | 'all')}
              >
                <option value="all">All Categories</option>
                <option value="it">IT Services</option>
                <option value="maintenance">Maintenance Services</option>
                <option value="accounting">Accounting Services</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Job Category</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Applied Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{applicant.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        applicant.jobCategory === 'it' ? 'bg-blue-100 text-blue-800' :
                        applicant.jobCategory === 'maintenance' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getCategoryLabel(applicant.jobCategory)}
                      </span>
                    </td>
                    <td className="px-6 py-4">{applicant.email}</td>
                    <td className="px-6 py-4">{formatDate(applicant.appliedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => viewApplicant(applicant)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          title="Download CV"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          title="Delete Application"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No applications found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">{selectedApplicant.name}</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Job Category</p>
                  <p className="text-gray-900 mt-1">{getCategoryLabel(selectedApplicant.jobCategory)}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900 mt-1">{selectedApplicant.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900 mt-1">{selectedApplicant.phone}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Applied On</p>
                  <p className="text-gray-900 mt-1">{formatDate(selectedApplicant.appliedAt)}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Curriculum Vitae</p>
                    <p className="text-blue-600 mt-1">applicant_cv.pdf</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                  >
                    Download CV
                  </Button>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={closeModal}
                >
                  Close
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<Eye className="h-4 w-4" />}
                >
                  Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVManagement;