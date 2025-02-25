export default function Hero() {
  return (
    <section className="pt-20 pb-20 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.sabcnews.com/sabcnews/wp-content/uploads/2021/01/SABC-News-Fleak-market-R.png')" }}>
      <div className="bg-black bg-opacity-50 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Informal Craft, Food Trucks & Flea Markets — Find the perfect informal places to shop or trade
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full max-w-md p-3 border rounded-l-full shadow-sm focus:outline-none"
            />
            <button className="bg-red-500 text-white px-6 py-3 rounded-r-full hover:bg-red-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}