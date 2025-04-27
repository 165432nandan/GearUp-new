import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";
import authService from "../../appright/auth";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
      setErrors({
        email: !validateEmail(formData.email) ? "Please enter a valid email address" : "",
        password: !validatePassword(formData.password) ? "Password must be at least 8 characters" : "",
      });
      return;
    }
    try {
      setIsLoading(true);
      await authService.login({ email: formData.email, password: formData.password });
      const userData = await authService.getCurrentUser();
      if (userData) {
        const isAdmin = userData.prefs?.isAdmin === true || userData.prefs?.isAdmin === "true";
        dispatch(login({ userData, userId: userData.$id, isAdmin }));
        setIsLoading(false);
        console.log(userData);
        
        if (isAdmin) {
          console.log("Admin user logged in: ",true);
          toast("Admin Login Successful!", { // <-- just toast(), not toast.success()
            position: "top-center",
            className: "bg-blue-600 text-white font-bold rounded-lg shadow-lg",
            bodyClassName: "text-sm",
            progressClassName: "bg-white",
            theme: "light",
          });
          
        }
        else{
          toast.success(`Welcome back ${userData.name}`, {
            position: "top-center",
            className: "bg-blue-600 text-white font-bold rounded-lg shadow-lg",
            bodyClassName: "text-sm",
            progressClassName: "bg-white",
            theme: "light",
          });
        }
          navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setErrors({ form: "Invalid email or password. Please try again." });
      toast.error("Login unsuccessful! Please try again.", {
          position: "top-center",
          className: "bg-red-600 text-white font-bold rounded-lg shadow-lg",
          bodyClassName: "text-sm",
          progressClassName: "bg-white",
          theme: "light",
        });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {errors.form && <p className="text-center text-red-600">{errors.form}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-medium transition duration-200 ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/singup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
