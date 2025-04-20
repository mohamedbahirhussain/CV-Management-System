import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div 
    className={cn(
      "bg-white rounded-lg shadow-md overflow-hidden",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <div 
    className={cn(
      "px-6 py-4 border-b border-gray-200",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => (
  <h3 
    className={cn(
      "text-lg font-semibold text-gray-800",
      className
    )} 
    {...props}
  >
    {children}
  </h3>
);

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => (
  <p 
    className={cn(
      "text-sm text-gray-500 mt-1",
      className
    )} 
    {...props}
  >
    {children}
  </p>
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <div 
    className={cn(
      "px-6 py-4",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div 
    className={cn(
      "px-6 py-4 bg-gray-50 border-t border-gray-200",
      className
    )} 
    {...props}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };