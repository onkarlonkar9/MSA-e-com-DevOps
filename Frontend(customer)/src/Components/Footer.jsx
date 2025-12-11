import toast from "react-hot-toast";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", path: "/demo/about" },
    { name: "Careers", path: "/demo/careers" },
    { name: "Blog", path: "/demo/blog" },
    { name: "Press", path: "/demo/press" },
  ];

  const helpLinks = [
    { name: "Contact Us", path: "/demo/contact" },
    { name: "FAQs", path: "/demo/faqs" },
    { name: "Shipping", path: "/demo/shipping" },
    { name: "Returns", path: "/demo/returns" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/demo/privacy" },
    { name: "Terms of Service", path: "/demo/terms" },
    { name: "Cookie Policy", path: "/demo/cookies" },
  ];

  const socialLinks = [
    { icon: <FiFacebook />, path: "https://facebook.com" },
    { icon: <FiTwitter />, path: "https://twitter.com" },
    { icon: <FiInstagram />, path: "https://instagram.com" },
    { icon: <FiLinkedin />, path: "https://linkedin.com" },
    { icon: <FiYoutube />, path: "https://youtube.com" },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white">
              MSA
            </Link>
            <p className="text-gray-400">
              Your one-stop shop for all things amazing. Quality products with
              exceptional service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social.path}</span>
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Help
            </h3>
            <ul className="mt-4 space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="mt-4 text-gray-400">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                onClick={()=>toast.success("You are subscribed to our news letter!")}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MSA All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
