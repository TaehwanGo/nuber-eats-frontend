import React from 'react';
import nuberLogo from '../images/logo.svg';

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => (
  <header className="py-4">
    <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
      <img src={nuberLogo} alt="logoImg" className="w-24" />
      <span className="text-xs">{email}</span>
    </div>
  </header>
);
