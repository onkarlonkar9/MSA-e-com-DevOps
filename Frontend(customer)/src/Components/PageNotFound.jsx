// import required modules
import { useNavigate } from "react-router-dom";
import { IoHome, IoArrowBack } from "react-icons/io5";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md select-none">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4 cursor-pointer flex gap-2 items-center"
          >
           <IoArrowBack/> Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4 cursor-pointer flex gap-2 items-center"
          >
            <IoHome size={20} />  Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
