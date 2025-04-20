import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { School, UserPlus } from 'lucide-react';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-primary p-3 rounded-full">
            <School className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Staff Registration</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Create your Al Modaqdimah School staff account
            </p>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark"
                isLoading={isLoading}
                leftIcon={<UserPlus className="h-4 w-4" />}
              >
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;