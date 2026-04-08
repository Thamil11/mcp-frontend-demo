import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '../utils/validators';
import { loginUser } from '../services/loginPageService';

export const useLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = useCallback((e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError('');
  }, []);

  const handleEmailBlur = useCallback(() => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
    }
  }, [email]);

  const handlePasswordBlur = useCallback(() => {
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
    }
  }, [password]);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleRememberMe = useCallback((e) => {
    setRememberMe(e.target.checked);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setGeneralError('');
    setEmailError('');
    setPasswordError('');
    setSuccess(false);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError) {
      setEmailError(emailValidationError);
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }

    if (emailValidationError || passwordValidationError) {
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);

      if (response && response.success !== false) {
        setSuccess(true);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setGeneralError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setGeneralError(error.message || 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe]);

  const handleForgotPassword = useCallback(() => {
    window.location.href = '/forgot-password';
  }, []);

  const handleSignUp = useCallback(() => {
    window.location.href = '/signup';
  }, []);

  return {
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
  };
};