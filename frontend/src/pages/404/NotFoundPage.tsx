import { CustomButtonGray } from "@/components/common/CustomButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      navigate("/");
      return () => clearTimeout(timer);
    }
  }, [countdown, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Glitch effect 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl font-bold text-gray-300 animate-pulse">
              404
            </h2>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            Page Not Found
          </h3>
          <p className="text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to home in {countdown} seconds...
          </p>
        </div>

        {/* Decorative element */}
        <div className="flex justify-center mb-8">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButtonGray
            navigateTo={handleGoHome}
            className="flex justify-center"
          >
            Go Home
          </CustomButtonGray>
          <CustomButtonGray
            navigateTo={handleGoBack}
            className="flex justify-center"
          >
            Go Back
          </CustomButtonGray>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
