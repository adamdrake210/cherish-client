import React from 'react';
import RegisterForm from '../Forms/RegisterForm';

export default function Register() {
  return (
    <div className="container flex-center">
      <div className="login-container">
        <h2>Create Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
