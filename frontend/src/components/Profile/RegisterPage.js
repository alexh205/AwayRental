import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mt-4">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="johnny123"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Already a member?
          <Link
            className="underline font-medium text-black hover:text-amber-600 ml-1"
            to={'/login'}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
