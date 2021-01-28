import React from 'react';

interface ICategoriesProps {
  id: string;
  coverImage?: string;
  name: string;
}

export const Categories: React.FC<ICategoriesProps> = ({
  id,
  coverImage,
  name,
}) => (
  <div key={id} className="group flex flex-col items-center cursor-pointer">
    <div
      className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100"
      style={{ backgroundImage: `url(${coverImage})` }}
    ></div>
    <span className="text-sm text-center font-semibold mt-1">{name}</span>
  </div>
);
