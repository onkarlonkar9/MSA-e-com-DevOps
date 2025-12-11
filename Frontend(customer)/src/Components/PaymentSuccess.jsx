import { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 flex flex-col">
      

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div
          className={`max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 ${
            isVisible
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-10"
          }`}
        >
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-400 to-teal-500 py-12 px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-2 bg-white rounded-full animate-pulse opacity-20"></div>
                <CheckCircleIcon className="w-24 h-24 text-white relative z-10" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-green-100 font-medium max-w-2xl mx-auto">
              Thank you for your purchase. Your payment has been successfully
              processed and your order is confirmed.
            </p>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Column - Next Steps */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <ReceiptPercentIcon className="w-7 h-7 mr-3 text-green-500" />
                What Happens Next?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start bg-green-50 rounded-xl p-4 border-l-4 border-green-400">
                  <div className="bg-green-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Order Confirmation
                    </h3>
                    <p className="text-gray-600 mt-1">
                      You'll receive an email confirmation with your order
                      details within minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-xl p-4 border-l-4 border-blue-400">
                  <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Order Processing
                    </h3>
                    <p className="text-gray-600 mt-1">
                      We're preparing your items for shipment. You'll get
                      tracking info once it's shipped.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-xl p-4 border-l-4 border-purple-400">
                  <div className="bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      Delivery
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Expected delivery within 4-6 business days. We'll keep you
                      updated every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Support & Actions */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Email:</span>
                    support@msa.com
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Phone:</span>
                    +91  1234567890
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Hours:</span>
                    Mon-Fri, 9AM-6PM IST
                  </div>
                </div>
                <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors duration-300">
                  Contact Support
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Link
                  to="/orders"
                  className=" w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <ReceiptPercentIcon className="w-6 h-6 mr-3" />
                  View My Orders
                </Link>

                <Link
                  to="/"
                  className=" w-full bg-white border-2 border-green-500 text-green-600 py-4 px-6 rounded-xl font-semibold text-center hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <ShoppingBagIcon className="w-6 h-6 mr-3" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 border-t border-gray-200 py-8 px-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Thank you for choosing MSA. We appreciate your patience!
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <span>Order secured with 256-bit SSL encryption</span>
                <span>•</span>
                <span>100% Purchase Protection</span>
                <span>•</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Celebration Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full opacity-20"></div>
          </div>
        ))}
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
