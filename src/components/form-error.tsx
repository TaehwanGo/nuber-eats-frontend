import React from 'react';

// React.FC에 의해 errorMessage는 children 이 필요함
interface IFormErrorProps {
  errorMessage: string;
}
// FC : Functional Component
export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-red-500">{errorMessage}</span>
);
