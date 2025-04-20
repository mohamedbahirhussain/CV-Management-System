import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { School, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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
            <CardTitle className="text-2xl">Staff Login</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Al Modaqdimah School Dashboard
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
                placeholder="Enter your password"
                required
              />
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark"
                isLoading={isLoading}
                leftIcon={<Lock className="h-4 w-4" />}
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;