export default function PopularSpots() {
    const spots = [
      { city: "Cape Town, Western Cape", listings: "645+", image: "https://resources.formula-e.pulselive.com/photo-resources/2023/02/20/042dd057-7157-4069-beb8-2aa3af8b21ba/Cape-Town.jpg?width=1440&height=810" },
      { city: "Johannesburg, Gauteng", listings: "784+", image: "https://www.expatica.com/app/uploads/sites/12/2021/10/johannesburg-1920x1080.jpg" },
      { city: "Durban, Kwazulu-Natal", listings: "214+", image: "https://greatruns.com/wp-content/uploads/2021/02/Durban_beach_front_1_of_1.jpg" },
    ];
  
    return (
      <section className="pb-5 pt-5 text-gray-200">
        <div className="container">
          <div className="mb-4 text-center">
            <h2 className="text-gray-800 text-2xl">Most Popular Spots</h2>
            <p className="text-gray-600">The most popular cities for trading flea markets in South Africa</p>
          </div>
          <div className="justify-content-center row">
            {spots.map((spot, index) => (
              <div key={index} className="col-lg-4 col-md-6 py-3">
                <div className="bg-gray-800 bg-cover bg-center p-4 rounded-lg text-white" style={{ backgroundImage: `url('${spot.image}')` }}>
                  <div className="h-32"></div>
                  <div>
                    <h3 className="text-lg mb-1">{spot.city}</h3>
                    <p>{spot.listings} listings</p>
                    <a href="#" className="btn bg-white text-red-500 px-4 py-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="mr-1 inline-block">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M16 12l-6 6V6z"></path>
                      </svg>
                      Explore
                    </a>
                  </div>
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