import React from 'react';
import Link from 'next/link';

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
}

const Categories: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      title: "Food Trucks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full text-red-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    },
    {
      title: "Kasi Shopping",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-red-500">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M9 20V10h6v10" />
        <path d="M4 10h16" />
        <path d="M2 6l2-2h16l2 2" />
        <rect x="10" y="13" width="4" height="3" />
      </svg>
      )
    },
    {
      title: "Everyday Markets",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full text-red-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>       
      )
    },
    {
      title: "Events",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-red-500">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="10" y1="16" x2="14" y2="16" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      <div className="mb-3 text-center">
        <h2 className="text-gray-700 text-2xl font-bold mb-6">Browse Categories</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
           <Link 
            key={category.title} 
            href={`/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="block w-full px-5 py-1.5 text-start text-xs font-bold leading-5 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out"
           >
            <div key={index} className="flex flex-col items-center cursor-pointer group">
            <div className="w-20 h-20 mb-3 flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              {category.icon}
            </div>
            <h3 className="text-base font-medium text-gray-700 dark:text-white mb-1.5">{category.title}</h3>
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;