// import React from 'react';

// interface Article {
//     title: string;
//     categories: string[];
//     author: string;
//     date: string;
//     time: string;
//     image: string;
// }

// interface DynamicArticleExpandableProps {
//     article: Article;
//   }

//   const DynamicArticlesExpandable: React.FC<DynamicArticleExpandableProps> = ({ article }) => {
//     return (
//       <div className="keen-slider__slide px-2">
//         <div className="bg-white dark:bg-gray-800 rounded shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 p-3 h-full flex flex-col">
//             <div className="font-bold mb-2">
//                 {article.categories.map((cat: string, i: number) => (
//                 <a key={i} href="#" className="text-red-500">
//                     {cat}
//                 </a>
//                 ))}
//             </div>
            
//             <div>
//              <h4 className="text-sm mb-0">{article.author}</h4>
//              <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
//               {new Date(article.date).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'short',
//               day: 'numeric',
//              })}
//              <span>{article.time}</span>
//             </p>
           
//            <p className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-3">
//           {article.title}
//         </p>
//             </div>
         
  
//           <div className="border-t border-gray-200 flex items-center justify-between mt-auto p-3 text-sm">
    
            
//           </div>
//         </div>
  
//         <div className="pb-3 pt-3 text-center">
//           <a href="#" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
//             View More
//           </a>
//         </div>
//       </div>
//     );
//   };

// export default DynamicArticlesExpandable;

'use client';

import React from 'react';
import Link from 'next/link';

interface Article {
    title: string;
    categories: string[];
    author: string;
    date: string;
    time: string;
    image: string;
    slug: string;
}

interface DynamicArticleExpandableProps {
    article: Article;
  }

  const DynamicArticlesExpandable: React.FC<DynamicArticleExpandableProps> = ({ article }) => {
    return (
      <div className="keen-slider__slide px-2">
        <div className="bg-white dark:bg-gray-800 rounded shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 p-3 h-full flex flex-col">
          <div className="font-bold mb-2 text-m-2 space-x-1">
            {article.categories.map((cat: string, i: number) => (
              <a key={i} href="#" className="text-red-500 hover:underline">{cat}</a>
            ))}
          </div>
  
          <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2 line-clamp-3">
            {article.title}
          </p>
  
          <div className="mt-auto border-t border-gray-200 pt-3 flex items-center justify-between text-sm">
            <a href="#" className="flex items-center text-gray-800 dark:text-white">
              <div>
                <h4 className="text-sm mb-0">By {article.author}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p><span className="text-xs text-gray-500 dark:text-gray-400">{article.time} ago</span></p>
              </div>
            </a>
          </div>
  
          <div className="pt-4 text-center pb-5">
            <Link
              href={`/articles/${article.slug}`}
              className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 text-sm"
          >
            Read more
           </Link>
          </div>
        </div>
      </div>
    );
  };  

export default DynamicArticlesExpandable;