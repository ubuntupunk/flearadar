export default function Hero() {
  return (
    <section className="pt-20 pb-20 text-center bg-cover bg-center text-white" style={{ backgroundImage: "url('https://www.sabcnews.com/sabcnews/wp-content/uploads/2021/01/SABC-News-Fleak-market-R.png')" }}>
      <div className="bg-black bg-opacity-50 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-normal mb-5">Discover Food Trucks & Flea Markets</h1>
          <p className="text-lg mb-5">Find the perfect informal places to shop or trade</p>
          <form className="flex justify-center items-center space-x-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full max-w-md p-3 border rounded-l-full shadow-sm focus:outline-none"
            />
            <button className="bg-red-500 text-white px-6 py-3 rounded-r-full hover:bg-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.25em" height="1.25em" className="mr-1 inline-block">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}