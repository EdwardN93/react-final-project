import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export const Login = () => {
  const navigate = useNavigate();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = event.currentTarget;
    const email = (formData.email as HTMLInputElement).value;
    const password = (formData.password as HTMLInputElement).value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const user = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Login failed");
      }

      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("user", JSON.stringify(payload.user));

      alert("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  function goToRegister() {
    navigate("/register");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center min-h-screen px-4 mb-10 flex-col">
        <form
          onSubmit={login}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <div className="">
          <p>
            Don't have an account? Register{" "}
            <span
              className="text-blue-600 hover:cursor-pointer md:text-center"
              onClick={goToRegister}
            >
              HERE
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
