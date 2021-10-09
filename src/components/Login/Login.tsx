import React from 'react';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="container flex-center">
      <div className="login-container">
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
