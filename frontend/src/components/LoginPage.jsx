import { useState} from "react";
import PropTypes from "prop-types";
import "./LoginPage.css";

function LoginPage({ onSignIn }) {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  
  const apiBaseUrl = "https://backend-three-coral-12.vercel.app"
  const toggleAuthMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
    setCredentials({ name: "", email: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.email || !credentials.password || (isSignup && !credentials.name)) {
      setError("All fields are required.");
      return;
    }

    try {
      const endpoint = isSignup ? "/signup" : "/signin";
      const requestBody = isSignup ? credentials : { email: credentials.email, password: credentials.password };

      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      if (isSignup) {
        alert("Sign-up successful! Please log in.");
        setIsSignup(false);
      } else {
        onSignIn(data.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={credentials.name} onChange={handleInputChange} required />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={credentials.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="auth-button">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p onClick={toggleAuthMode} className="toggle-button">
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

LoginPage.propTypes = { onSignIn: PropTypes.func.isRequired };

export default LoginPage;
