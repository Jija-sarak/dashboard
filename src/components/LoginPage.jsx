import { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginPage.css';

function LoginPage({ onSignIn }) {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const toggleAuthMode = () => setIsSignup(!isSignup);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(); // Simulate authentication
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                required
                className="form-input"
              />
            </div>
          )}
          <button type="submit" className="auth-button">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p onClick={toggleAuthMode} className="toggle-button">
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default LoginPage;
