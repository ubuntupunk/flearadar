export default function HowItWorks() {
    const steps = [
      { icon: "M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15zm-3.847-8.699a2 2 0 1 0 2.646 2.646 4 4 0 1 1-2.646-2.646z", title: "Find Business", description: "Looking for that bargain item available at below mall cost?" },
      { icon: "M12 .5l4.226 6.183 7.187 2.109-4.575 5.93.215 7.486L12 19.69l-7.053 2.518.215-7.486-4.575-5.93 7.187-2.109L12 .5zm0 3.544L9.022 8.402 3.957 9.887l3.225 4.178-.153 5.275L12 17.566l4.97 1.774-.152-5.275 3.224-4.178-5.064-1.485L12 4.044zM10 12a2 2 0 1 0 4 0h2a4 4 0 1 1-8 0h2z", title: "Review Listings", description: "Review our Traders & Markets to support local commerce" },
      { icon: "M12 1l8.217 1.826c.457.102.783.507.783.976v9.987c0 2.006-1.003 3.88-2.672 4.992L12 23l-6.328-4.219C4.002 17.668 3 15.795 3 13.79V3.802c0-.469.326-.874.783-.976L12 1zm0 2.049L5 4.604v9.185c0 1.337.668 2.586 1.781 3.328L12 20.597l5.219-3.48C18.332 16.375 19 15.127 19 13.79V4.604L12 3.05zm4.452 5.173l1.415 1.414L11.503 16 7.26 11.757l1.414-1.414 2.828 2.828 4.95-4.95z", title: "Claim Listings", description: "Have we listed one of your stands, events or markets? Claim your space and sponsor our site?" },
    ];
  
    return (
      <section className="pb-5 pt-5 text-gray-600">
        <div className="container">
          <div className="mb-4 text-center">
            <h2 className="text-gray-800 text-2xl">How it works</h2>
            <p className="text-gray-600">Register your Informal Business, Search for Markets & Food Trucks</p>
          </div>
          <div className="justify-content-center row">
            {steps.map((step, index) => (
              <div key={index} className="col-lg-4 col-sm-6 pb-3 pt-3">
                <div className="border p-4 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="3rem" height="3rem" className="mb-4 text-red-500">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d={step.icon}></path>
                  </svg>
                  <h3 className="text-lg mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }