// components/Articles.tsx

import Image from 'next/image';

// Define the Article interface
interface Article {
  title: string;
  categories: string[];
  author: string;
  date: string;
  time: string;
  image: string;
}

// You could also add props if this component receives any
interface ArticlesProps {
  // Add any props here if needed in the future
}

export default function Articles(/* props: ArticlesProps */) {
  const articles: Article[] = [
    { 
      title: "Sunday markets are some of the most vibrant places around", 
      categories: ["Sunday Market", "Lifestyle"], 
      author: "Dianne Russell", 
      date: "10 August 2020", 
      time: "6 min", 
      image: "https://www.muizenmesh.co.za/wp/web/flearadar/milnerton-market.jpg" 
    },
    { 
      title: "Believe it or not but Saturday is an excellent time to shop bric-a-brac", 
      categories: ["Saturday Market", "Lifestyle"], 
      author: "Kathryn Murphy", 
      date: "10 August 2020", 
      time: "8 min", 
      image: "https://www.muizenmesh.co.za/wp/web/flearadar/Greenmarket-Square_GettyImages-940753486.webp" 
    },
    { 
      title: "Have you noticed local car-boot and yard-sales?", 
      categories: ["Carboot", "Lifestyle"], 
      author: "Darrell Steward", 
      date: "10 August 2020", 
      time: "5 min", 
      image: "https://www.muizenmesh.co.za/wp/web/flearadar/photo-1517101724602-c257fe568157.jpeg" 
    },
  ];

  return (
    <section className="pb-5 pt-5 text-gray-600">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="text-gray-800 text-2xl">Articles & Guides</h2>
          <p className="text-gray-600">Helpful reviews, details and advice on accessing your local informal marketplace</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {articles.map((article: Article, index: number) => (
            <div key={index} className="bg-gray-100 border rounded-lg flex flex-col h-full">
              <a href="#" className="d-block">
                <Image 
                  src={article.image} 
                  className="w-full h-47 object-cover rounded-t-lg" 
                  alt={article.title} 
                  width={500} 
                  height={500} 
                />
              </a>
              <div className="p-3">
                <div className="font-bold mb-2">
                  {article.categories.map((cat: string, i: number) => (
                    <a key={i} href="#" className="text-red-500">{cat}</a>
                  ))}
                </div>
                <a href="#" className="text-gray-800 no-underline">
                  <h3 className="text-lg mb-0">{article.title}</h3>
                </a>
              </div>
              <div className="border-t border-gray-200 flex items-center justify-between mt-auto p-3 text-sm">
                <a href="#" className="flex items-center text-gray-800">
                  <Image 
                    src="https://via.placeholder.com/48x48" 
                    className="mr-2 rounded-full" 
                    alt="Author Image" 
                    width={48} 
                    height={48} 
                  />
                  <div>
                    <h4 className="text-sm mb-0">{article.author}</h4>
                    <p className="text-gray-600 mb-0">{article.date}</p>
                  </div>
                </a>
                <span>{article.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-3 pt-3 text-center">
          <a href="#" className="btn bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
            View More
          </a>
        </div>
      </div>
    </section>
  );
}