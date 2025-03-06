//components/Categories

// Define the Category interface
interface Category {
  name: string;
  icon: string;
}

// Optional props interface for future use
interface CategoriesProps {
  // Add props here if needed
}

export default function Categories(/* props: CategoriesProps */): JSX.Element {
  const categories: Category[] = [
    { 
      name: "Weekend Markets", 
      icon: "M21 3a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5V4a1 1 0 0 1 1-1h18zm-1 2H4v2.968l.156.081a4.5 4.5 0 0 1 2.34 3.74L6.5 12a4.499 4.499 0 0 1-2.344 3.95L4 16.032V19h16v-2.969l-.156-.08a4.5 4.5 0 0 1-2.34-3.74L17.5 12c0-1.704.947-3.187 2.344-3.95L20 7.967V5z" 
    },
    { 
      name: "Food Trucks", 
      icon: "M21 3a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5V4a1 1 0 0 1 1-1h18zm-1 2H4v2.968l.156.081a4.5 4.5 0 0 1 2.34 3.74L6.5 12a4.499 4.499 0 0 1-2.344 3.95L4 16.032V19h16v-2.969l-.156-.08a4.5 4.5 0 0 1-2.34-3.74L17.5 12c0-1.704.947-3.187 2.344-3.95L20 7.967V5z" 
    },
    { 
      name: "Kasi Shopping", 
      icon: "M21 13.242V20h1v2H2v-2h1v-6.758A4.496 4.496 0 0 1 1 9.5c0-.827.224-1.624.633-2.303L4.345 2.5a1 1 0 0 1 .866-.5H18.79a1 1 0 0 1 .866.5l2.702 4.682A4.496 4.496 0 0 1 21 13.242zm-2 .73a4.496 4.496 0 0 1-3.75-1.36A4.496 4.496 0 0 1 12 14.001a4.496 4.496 0 0 1-3.25-1.387A4.496 4.496 0 0 1 5 13.973V20h14v-6.027zM5.789 4L3.356 8.213a2.5 2.5 0 0 0 4.466 2.216c.335-.837 1.52-.837 1.856 0a2.5 2.5 0 0 0 4.644 0c.335-.837 1.52-.837 1.856 0a2.5 2.5 0 1 0 4.457-2.232L18.21 4H5.79z" 
    },
    { 
      name: "Everyday Markets", 
      icon: "M16 1c.552 0 1 .448 1 1v3h4c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V6c0-.552.448-1 1-1h4V2c0-.552.448-1 1-1h8zm4 6H4v12h16V7zm-7 2v3h3v2h-3.001L13 17h-2l-.001-3H8v-2h3V9h2zm2-6H9v2h6V3z" 
    },
    { 
      name: "Events", 
      icon: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1.67 14h-3.34l-1.38 1.897.554 1.706A7.993 7.993 0 0 0 12 20c.871 0 1.71-.14 2.496-.397l.553-1.706L13.669 16zm-8.376-5.128l-1.292.937L4 12c0 1.73.549 3.331 1.482 4.64h1.91l1.323-1.82-1.028-3.17-2.393-.778zm13.412 0l-2.393.778-1.028 3.17 1.322 1.82h1.91A7.964 7.964 0 0 0 20 12l-.003-.19-1.291-.938zM12 9.536l-2.344 1.702.896 2.762h2.895l.896-2.762L12 9.536zm2.291-5.203L13 5.273V7.79l2.694 1.957 2.239-.727.554-1.703a8.014 8.014 0 0 0-4.196-2.984zm-4.583 0a8.014 8.014 0 0 0-4.195 2.985l.554 1.702 2.239.727L11 7.79V5.273l-1.292-.94z" 
    },
  ];

  return (
    <section className="mt-n5 pb-3 position-relative text-center">
      <div className="container">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center">
            {categories.map((category: Category, index: number) => (
              <div key={index} className="col-span-1">
                <a href="#" className="bg-white d-block p-4 text-gray-600 hover:text-gray-800 flex flex-col items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    width="2.5rem" 
                    height="2.5rem" 
                    className="mb-3 text-red-500"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d={category.icon}></path>
                  </svg>
                  <h2 className="font-normal text-sm mb-1">{category.name}</h2>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}