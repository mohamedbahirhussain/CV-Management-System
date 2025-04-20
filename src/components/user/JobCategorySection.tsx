import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import { Monitor, PenTool as Tool, Calculator, Upload } from 'lucide-react';
import { JobCategory } from '../../types';

interface JobCategorySectionProps {
  onSelectCategory: (category: JobCategory) => void;
  onSubmitCV: (formData: FormData) => void;
}

const JobCategorySection: React.FC<JobCategorySectionProps> = ({ 
  onSelectCategory, 
  onSubmitCV 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategorySelect = (category: JobCategory) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-()]{8,20}$/.test(phone)) {
      newErrors.phone = 'Phone number format is invalid';
    }
    
    if (!file) newErrors.file = 'CV file is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedCategory) return;
    
    setIsSubmitting(true);
    
    // Create FormData for CV submission
    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('jobCategory', selectedCategory);
    if (file) formData.append('cv', file);
    
    // Simulate API call
    setTimeout(() => {
      onSubmitCV(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setFile(null);
      setSelectedCategory(null);
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Join Our Team</h2>
        <p className="mt-4 text-lg text-gray-500">
          Al Modaqdimah School is seeking talented individuals to help shape the future of education.
        </p>
      </div>

      {isSuccess && (
        <div className="mb-8 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium">Your application was submitted successfully!</p>
          </div>
          <p className="mt-2 text-sm">Thank you for your interest in joining Al Modaqdimah School. Our team will review your application and contact you soon.</p>
        </div>
      )}

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Job Category</CardTitle>
            <CardDescription>Choose the department that matches your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CategoryCard
                title="IT Services"
                description="Technical support, networking, and software development positions"
                icon={<Monitor className="h-10 w-10" />}
                isSelected={selectedCategory === 'it'}
                onClick={() => handleCategorySelect('it')}
                iconColor="bg-blue-100 text-blue-600"
              />
              <CategoryCard
                title="Maintenance Services"
                description="Facility maintenance, repairs, and equipment management"
                icon={<Tool className="h-10 w-10" />}
                isSelected={selectedCategory === 'maintenance'}
                onClick={() => handleCategorySelect('maintenance')}
                iconColor="bg-green-100 text-green-600"
              />
              <CategoryCard
                title="Accounting Services"
                description="Financial management, accounting, and administrative roles"
                icon={<Calculator className="h-10 w-10" />}
                isSelected={selectedCategory === 'accounting'}
                onClick={() => handleCategorySelect('accounting')}
                iconColor="bg-yellow-100 text-yellow-600"
              />
            </div>
          </CardContent>
        </Card>

        {selectedCategory && (
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Application</CardTitle>
              <CardDescription>
                Please provide your details and upload your CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                      placeholder="+966 XX XXX XXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload CV (PDF format)
                    </label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                      errors.file ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 10MB
                        </p>
                        {file && (
                          <p className="text-sm text-gray-700 font-medium">
                            Selected: {file.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.file && (
                      <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark"
                    isLoading={isSubmitting}
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  iconColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
  iconColor
}) => {
  return (
    <div
      className={`border rounded-lg p-6 transition-all cursor-pointer transform hover:scale-105 ${
        isSelected
          ? 'border-primary bg-primary bg-opacity-5 shadow-md'
          : 'border-gray-200 hover:border-primary hover:shadow'
      }`}
      onClick={onClick}
    >
      <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-4 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {isSelected && (
        <div className="mt-4 flex items-center text-primary">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium">Selected</span>
        </div>
      )}
    </div>
  );
};

export default JobCategorySection;