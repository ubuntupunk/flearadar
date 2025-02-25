export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div className="text-2xl font-bold text-gray-800">FleaRadar</div>
      <nav className="hidden md:flex space-x-6">
        <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
        <div className="relative group">
          <a href="/pages" className="text-gray-600 hover:text-gray-800">Pages ▼</a>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 p-2">
            <a href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About</a>
            <a href="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Contact</a>
          </div>
        </div>
        <a href="/blog" className="text-gray-600 hover:text-gray-800">Blog</a>
        <a href="/help" className="text-gray-600 hover:text-gray-800">Help</a>
        <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
          Login/Sign Up
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
          Add a Listing
        </button>
      </nav>
      <div className="md:hidden flex space-x-4">
        <button className="text-gray-600">🔍</button> {/* Search icon */}
        <button>☰</button> {/* Hamburger for mobile */}
      </div>
    </header>
  );
}