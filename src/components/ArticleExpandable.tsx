import React from 'react';

interface Article {
    title: string;
    categories: string[];
    author: string;
    date: string;
    time: string;
    image: string;
}

interface ArticleExpandableProps {
    article: Article;
  }

const ArticleExpandable: React.FC<ArticleExpandableProps> = ({article}) => {
  return (
    <section className="pb-5 pt-5 text-gray-600">
        <div className="container">
           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
               <div className="bg-gray-100 border rounded-lg flex flex-col h-full">
                 <div className="p-3 py-6">
                   <div className="font-bold mb-2">
                     {article.categories.map((cat: string, i: number) => (
                       <a key={i} href="#" className="text-red-500">{cat}</a>
                     ))}
                   </div>
                   <a href="#" className="text-gray-800 no-underline">
                     <h3 className="text-lg mb-0 py-6">{article.title}</h3>
                   </a>
                 </div>
                 <div className="border-t border-gray-200 flex items-center justify-between mt-auto p-3 text-sm">
                   <a href="#" className="flex items-center text-gray-800">
                     {/* <Image 
                       src="/images/flea.png"
                       className="mr-2 rounded-full" 
                       alt="Author Image" 
                       width={48} 
                       height={48} 
                     /> */}
                     <div>
                       <h4 className="text-sm mb-0">{article.author}</h4>
                       <p className="text-gray-600 mb-0">{article.date}</p>
                     </div>
                   </a>
                   <span>{article.time}</span>
                 </div>
               </div>
           </div>
           <div className="pb-3 pt-3 text-center">
             <a href="#" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
               View More
             </a>
           </div>
         </div>
       </section>
  );
};

export default ArticleExpandable;
