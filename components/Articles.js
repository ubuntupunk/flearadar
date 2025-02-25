export default function Articles() {
  const articles = [
    { id: 1, title: "How to Start Selling at Flea Markets", icon: "🛒" },
    { id: 2, title: "Tips for Food Truck Owners", icon: "🚚" },
    { id: 3, title: "Best Practices for Market Organizers", icon: "📋" },
  ];

  return (
    <section className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Helpful Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <span className="text-3xl">{article.icon}</span>
            <p className="text-lg font-semibold text-gray-800">{article.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}