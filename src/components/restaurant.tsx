import React from 'react';

interface IRestaurantProps {
  id: string;
  coverImage: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImage,
  name,
  categoryName,
}) => (
  <div className="flex flex-col">
    {/* restaurant는 img(background img를 넣는게 더 쉽기 때문에 div태그 사용), title, category를 표시함 */}
    <div
      style={{ backgroundImage: `url(${coverImage})` }}
      className="py-28 mb-3 bg-cover bg-center"
    ></div>
    <h3 className="text-xl font-semibold">{name}</h3>
    <span className="border-t py-2 mt-2 text-xs opacity-50 border-gray-400">
      {categoryName}
    </span>
  </div>
);
