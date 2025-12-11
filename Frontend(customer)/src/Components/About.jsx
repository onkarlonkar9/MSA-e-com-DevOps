import {
  FaMobileAlt,
  FaShieldAlt,
  FaShippingFast,
  FaHeadset,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function About() {
  // for navigation
  const navigate = useNavigate();

  // function for handling click on "Shop now"
  function handleClick() {
    navigate("/products");
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 text-center  ">
        <h1 className="text-4xl md:text-5xl font-bold mb-4  select-none">
          About MSA
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Your trusted destination for the latest smartphones!
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto px-4 py-16 ">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Founded in 2021 with a simple vision
            </h3>
            <p className="text-gray-600 mb-6">
              MSA began with a simple dream a humble online store built on one
              core belief:{" "}
              <span className="font-semibold text-gray-700">
                Every customer deserves a shopping experience they can genuinely
                trust.
              </span>{" "}
              From the very beginning, our mission has been clear to offer not
              just top-quality mobile devices, but also peace of mind with every
              purchase.
            </p>

            <p className="text-gray-600">
              What began as a modest startup has grown into one of the most
              trusted names in mobile retail. We're proud to have earned the
              confidence of thousands of customers across the country not just
              by selling the latest smartphones, but by standing behind every
              product with genuine care and support. Today, MSA continues to
              deliver top-brand devices at competitive prices, backed by fast
              service and real people who care.{" "}
              <span className="font-semibold text-gray-700">
                We're not just here to sell we're here to help you choose
                confidently, shop securely, and stay connected with ease.
              </span>
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl overflow-hidden  ">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Mobile devices"
              loading="lazy"
              className="w-full h-full object-cover  select-none"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4  select-none">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto  select-none"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-blue-600 mb-4 flex justify-center">
                <FaMobileAlt size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest Devices</h3>
              <p className="text-gray-600">
                We stock all the newest models from top brands as soon as
                they're released
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-blue-600 mb-4 flex justify-center">
                <FaShieldAlt size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">
                100% genuine products with manufacturer warranties
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-blue-600 mb-4 flex justify-center">
                <FaShippingFast size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Nationwide shipping with express options available
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="text-blue-600 mb-4 flex justify-center">
                <FaHeadset size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is always ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to upgrade your mobile shopping experience?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Browse our collection of smartphones today
        </p>
        <button
          onClick={handleClick}
          className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-200 transition cursor-pointer select-none"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
