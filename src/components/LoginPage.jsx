import React from 'react';
import './LoginPage.css';
import { useLoginPage } from '../hooks/useLoginPage';

const EnvelopeIcon = () => (
  <svg
    className="input-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <path d="m22 6-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 6"></path>
  </svg>
);

const KeyIcon = () => (
  <svg
    className="input-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m13 17.9 5.9-5.9"></path>
    <circle cx="19.8" cy="11.2" r="1.2"></circle>
  </svg>
);

const EyeIcon = ({ show }) => (
  <svg
    className={`password-toggle-icon ${show ? 'visible' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </>
    ) : (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.88 10.88a3 3 0 0 0 3.6 3.6"></path>
        <path d="M9.879 9.879L1 1m0 0l22 22"></path>
        <path d="M9 9a3 3 0 0 0 3 3"></path>
      </>
    )}
  </svg>
);

const NetworkIcon = ({ white = false }) => (
  <svg
    className={`network-icon ${white ? 'white' : ''}`}
    viewBox="0 0 32 32"
    fill={white ? '#FFFFFF' : '#0066FF'}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="3" />
    <circle cx="24" cy="8" r="2" opacity="0.6" />
    <circle cx="24" cy="24" r="2" opacity="0.6" />
    <circle cx="8" cy="24" r="2" opacity="0.6" />
    <circle cx="8" cy="8" r="2" opacity="0.6" />
    <line x1="16" y1="16" x2="24" y2="8" stroke={white ? '#FFFFFF' : '#0066FF'} strokeWidth="1" opacity="0.4" />
    <line x1="16" y1="16" x2="24" y2="24" stroke={white ? '#FFFFFF' : '#0066FF'} strokeWidth="1" opacity="0.4" />
    <line x1="16" y1="16" x2="8" y2="24" stroke={white ? '#FFFFFF' : '#0066FF'} strokeWidth="1" opacity="0.4" />
    <line x1="16" y1="16" x2="8" y2="8" stroke={white ? '#FFFFFF' : '#0066FF'} strokeWidth="1" opacity="0.4" />
  </svg>
);

const LoginPage = () => {
  const {
    email,
    password,
    showPassword,
    rememberMe,
    emailError,
    passwordError,
    generalError,
    loading,
    success,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    handleTogglePassword,
    handleRememberMe,
    handleSubmit,
    handleForgotPassword,
    handleSignUp,
  } = useLoginPage();

  return (
    <div className="login-page-container">
      <div className="login-left-panel">
        <div className="brand-content">
          <div className="logo-section">
            <NetworkIcon white={true} />
          </div>
          <h1 className="brand-title">Discovery Platform</h1>
          <p className="brand-subtitle">Powered by CHANGEPOND</p>
        </div>
        <div className="pattern-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="connecting-line line-1"></div>
          <div className="connecting-line line-2"></div>
          <div className="connecting-line line-3"></div>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="header-logo">
              <NetworkIcon />
            </div>
            <h2 className="form-title">Discovery Platform</h2>
            <p className="form-subtitle">Powered by CHANGEPOND</p>
          </div>

          <h1 className="login-heading">Login</h1>
          <p className="welcome-text">Welcome to Discovery Platform</p>

          {generalError && (
            <div className="error-message general-error" role="alert" aria-live="polite">
              {generalError}
            </div>
          )}

          {success && (
            <div className="success-message" role="status" aria-live="polite">
              Login successful! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <EnvelopeIcon />
                <input
                  id="email"
                  type="email"
                  className={`form-input ${emailError ? 'error' : ''}`}
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  autoComplete="email"
                  disabled={loading}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
              </div>
              {emailError && (
                <span
                  id="email-error"
                  className="inline-error"
                  role="alert"
                  aria-live="polite"
                >
                  {emailError}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <KeyIcon />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${passwordError ? 'error' : ''}`}
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  autoComplete="current-password"
                  disabled={loading}
                  aria-describedby={passwordError ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handleTogglePassword}
                  disabled={loading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
              {passwordError && (
                <span
                  id="password-error"
                  className="inline-error"
                  role="alert"
                  aria-live="polite"
                >
                  {passwordError}
                </span>
              )}
            </div>

            <div className="form-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  disabled={loading}
                  aria-label="Keep me logged in"
                />
                <span>Keep me logged In</span>
              </label>
              <button
                type="button"
                className="forgot-password-link"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{' '}
            <button
              type="button"
              className="signup-link"
              onClick={handleSignUp}
              disabled={loading}
            >
              Sign up
            </button>
          </p>
        </div>

        <footer className="login-footer">
          <p>Copyright 2025 Changepond. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;