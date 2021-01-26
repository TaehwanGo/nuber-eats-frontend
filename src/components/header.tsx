import React from 'react';
import nuberLogo from '../images/logo.svg'; // svg는 import 가능

export const Header = () => (
  <header className="bg-red-500 py-4">
    <div className="w-full max-w-screen-xl mx-auto">
      <img src={nuberLogo} alt="logoImg" className="w-40 mb-10" />
      I'm the header
    </div>
  </header>
);
