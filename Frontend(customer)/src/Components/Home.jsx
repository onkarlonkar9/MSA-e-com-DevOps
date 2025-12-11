// import required modules
import { Link, useNavigate } from "react-router-dom";

// Mock data for demonstration
const latestMobiles = [
  {
    id: 1,
    name: "IPhone 17 Pro",
    brand: "Apple",
    price: "134999",
    latest: true,
    databaseId: 4,
    image:
      "https://i.pinimg.com/736x/a1/56/bd/a156bd0ce14215690e0e1f2066ce79db.jpg",
    discount: 0,
  },
  {
    id: 2,
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: "124999",
    databaseId: 9,
    image:
      "https://i.pinimg.com/736x/db/2b/82/db2b82da6fe0dbfc5d49b069258cd2af.jpg",
    discount: 5,
  },
  {
    id: 3,
    name: "Pixel 10 Pro ",
    brand: "Google",
    price: "109999",
    latest: true,
    databaseId: 20,
    image:
      "https://i.pinimg.com/1200x/ef/aa/aa/efaaaa901682db25bf98b1a3b628e40c.jpg",
    discount: 0,
  },
  {
    id: 4,
    name: "Oneplus Open",
    brand: "OnePlus",
    price: "149999",
    databaseId: 22,
    image:
      "https://i.pinimg.com/1200x/c0/c9/d1/c0c9d133c542e5b684f517705a06ca4d.jpg",
    discount: 8,
  },
  {
    id: 5,
    name: "xFold 5",
    brand: "Vivo",
    price: "149999",
    databaseId: 31,
    image:
      "https://i.pinimg.com/736x/ba/d2/68/bad2683380db2858e0271c2ca4c2a1b7.jpg",
    discount: 12,
  },
  {
    id: 6,
    name: "ROG Phone 9 Pro Edition ",
    brand: "Asus",
    price: "104999",
    databaseId: 34,
    image:
      "https://i.pinimg.com/736x/47/b3/e9/47b3e9889a9ed87ef72655223d200e48.jpg",
    discount: 5,
  },
];

const categories = [
  { id: 1, name: "Flagship Phones", icon: "📱" },
  { id: 2, name: "Budget Phones", icon: "💰" },
  { id: 3, name: "Gaming Phones", icon: "🎮" },
  { id: 4, name: "Midrange Phones", icon: "📱" },
];
function Home(){
  // get navigation for navigating
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center ">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the Latest Mobiles
              </h1>
              <p className="text-xl mb-6">
                Find the perfect smartphone with exclusive deals and offers
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1661634383167-a976a5229340?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxzbWFydHBob25lfGVufDB8fDB8fHww"
                alt="Latest Smartphones"
                className="h-64  object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
            We Have Everything You Need!! 😀
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Mobiles Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">In the spotlights</h2>
            <Link to="/products" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2  lg:grid-cols-3 gap-6">
            {latestMobiles.map((mobile) => (
              <div
                key={mobile.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl  hover:-translate-y-1 transition"
              >
                <div
                  className="relative"
                  onClick={() => navigate(`/products/${mobile.databaseId}`)}
                >
                  <img
                    src={mobile.image}
                    alt={mobile.name}
                    className="w-full h-48 object-contain p-2"
                    loading="lazy"
                  />
                  {mobile.latest ? <span className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-md font-bold">New</span>:""}

                  {mobile.discount > 0 ? (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {mobile.discount}% Off
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="p-2">
                  <div className="flex  justify-between items-start  m-2 ">
                    <div>
                      <h3 className="font-bold text-lg">{mobile.name}</h3>
                      <p className="text-gray-600 font-semibold">
                        {mobile.brand}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch  md:flex-row md:justify-between mt-5 gap-2 ">
                    <span className="font-semibold text-xl">
                      Price:{" "}
                      {new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(mobile.price)}
                    </span>
                    <span className="font-bold text-xl"></span>
                    <button
                      onClick={() => navigate(`/products/${mobile.databaseId}`)}
                      className="btn bg-blue-600 text-white px-1 md:px-3 md:py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Premium Brands</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Explore the world's leading mobile brands with exclusive deals and
              latest technology
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Brand Card 1 */}
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=apple")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png"
                  alt="Apple"
                  loading="lazy"
                  className="h-10 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Apple</h3>
              <p className="text-blue-300 text-sm">Latest iPhone models</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 15% OFF
              </div>
            </div>

            {/* Brand Card 2 */}
            <div
              className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=samsung")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Samsung"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Samsung</h3>
              <p className="text-blue-300 text-sm">Galaxy series</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 12% OFF
              </div>
            </div>

            {/* Brand Card 3 */}
            <div
              className="bg-gradient-to-br from-red-800 to-red-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=google")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Google"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Google</h3>
              <p className="text-blue-300 text-sm">Pixel series</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 10% OFF
              </div>
            </div>

            {/* Brand Card 4 */}
            <div
              className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=oneplus")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/50640553e4b0e9530e2dfb13/1595343938815-UAPEFKX5JQM6TM4X3JUV/OnePlus_LU_Red_RGB.png"
                  alt="OnePlus"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">OnePlus</h3>
              <p className="text-blue-300 text-sm">Never Settle</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 8% OFF
              </div>
            </div>

            {/* Brand Card 5 */}
            <div
              className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate(`/products?brand=xiaomi`)}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://i.pinimg.com/736x/f0/2b/43/f02b43f505b174a67fd5a5c24aef8760.jpg"
                  alt="Xiaomi"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Xiaomi</h3>
              <p className="text-blue-300 text-sm">Innovation for everyone</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 20% OFF
              </div>
            </div>
            {/* Brand Card 5 */}
            <div
              className="bg-gradient-to-br from-sky-300 to-cyan-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=asus")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Asus"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Asus</h3>
              <p className="text-blue-300 text-sm">In Search of Incredible</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 18% OFF
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className=" btn bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-110 duration-300 "
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
