// import { useState } from "react";
// import { useUserContext } from "../contexts/userContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { saveUser } = useUserContext();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState(""); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(
//         "https://my-ecommerce-eta-ruby.vercel.app/api/auth/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.error || "Login failed");
//       }

//       saveUser(data.user);
//       localStorage.setItem("userId", data.user._id);
//       localStorage.removeItem("addressId");
      
//       setSuccess("Login successful!");
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Unable to login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container card p-3 my-4">

//       <h4 className="mb-3">User Login</h4>

//       <form onSubmit={handleLogin} className="form">
//         <label className="form-label">
//           <p>Email Address</p>
//         </label>

//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <br />

//         <button className="btn btn-primary" type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       {success && <p className="text-success mt-3">{success}</p>}
//       {error && <p className="text-danger mt-3">{error}</p>}
//     </div>
//   );
// }


import { useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { saveUser } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://my-ecommerce-eta-ruby.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Login failed");
      }

      saveUser(data.user);

      localStorage.setItem("userId", data.user._id);
      localStorage.removeItem("addressId");

      setSuccess("Login successful!");

      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">

        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">

          <div className="mb-10 border-b border-zinc-200 pb-8">

            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Welcome Back
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
              Sign In
            </h1>

            <p className="mt-4 text-sm leading-7 text-zinc-600">
              Enter your registered email address to access your account,
              orders and saved addresses.
            </p>

          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />

            </div>

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <div className="mt-10 border-t border-zinc-200 pt-8 text-center">

            <p className="text-sm text-zinc-600">
              New here?
            </p>

            <Link
              to="/user"
              className="mt-4 inline-flex rounded-full border border-zinc-900 px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] transition hover:bg-zinc-900 hover:text-white"
            >
              Create Profile
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}