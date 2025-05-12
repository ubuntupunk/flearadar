//components/Stats
  
// Define the Stat interface
interface Stat {
  number: string;
  description: string;
  icon: string;
}

// Optional props interface for future use
//eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatsProps {
  // Add props here if needed
}

export default function Stats(/* props: StatsProps */): JSX.Element {
  const stats: Stat[] = [
    { 
      number: "50+", 
      description: "New Listing Everyday", 
      icon: "M4 6.143v12.824l5.065-2.17 6 3L20 17.68V4.857l1.303-.558a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V7l2-.857zm12.243 5.1L12 15.485l-4.243-4.242a6 6 0 1 1 8.486 0zM12 12.657l2.828-2.829a4 4 0 1 0-5.656 0L12 12.657z" 
    },
    { 
      number: "420+", 
      description: "Unique Visitor Per Day", 
      icon: "M18 17v5h-2v-5c0-4.451 2.644-8.285 6.447-10.016l.828 1.82A9.002 9.002 0 0 0 18 17zM8 17v5H6v-5A9.002 9.002 0 0 0 .725 8.805l.828-1.821A11.002 11.002 0 0 1 8 17zm4-5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" 
    },
    { 
      number: "16000+", 
      description: "Customer's Review", 
      icon: "M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z" 
    },
    { 
      number: "4500+", 
      description: "Verified Businesses", 
      icon: "M12 1l8.217 1.826c.457.102.783.507.783.976v9.987c0 2.006-1.003 3.88-2.672 4.992L12 23l-6.328-4.219C4.002 17.668 3 15.795 3 13.79V3.802c0-.469.326-.874.783-.976L12 1zm0 2.049L5 4.604v9.185c0 1.337.668 2.586 1.781 3.328L12 20.597l5.219-3.48C18.332 16.375 19 15.127 19 13.79V4.604L12 3.05zm4.452 5.173l1.415 1.414L11.503 16 7.26 11.757l1.414-1.414 2.828 2.828 4.95-4.95z" 
    },
  ];

  return (
    <section 
      className="py-4 bg-gray-900 bg-cover bg-center pb-5 pt-5 text-gray-200" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543691379-f2f5b144d593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDkyMnwwfDF8c2VhcmNofDl8fG5pZ2h0JTIwbGlmZXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080')" }}
    >
      <div className="mx-auto max-w-7xl mb-4 justify-items-center">
        <div className="grid grid-cols-4 md:grid-cols-4 gap-32 justify-items-center">
          {stats.map((stat: Stat, index: number) => (
            <div key={index} className="w-full text-center">
              <div className="inline-flex flex-col items-center space-y-2 w-full p-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  width="3rem" 
                  height="3rem" 
                  className="mr-3 text-red-500"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d={stat.icon}></path>
                  </svg>
                  <div>
                    <h2 className="text-xl mb-1 text-white">{stat.number}</h2>
                    <p className="text-gray-200">{stat.description}</p>
                  </div>
                </div>
             </div>
          ))}
      </div>
    </div>
    </section>
  );
}