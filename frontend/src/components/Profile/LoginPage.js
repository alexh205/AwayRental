import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
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
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don't have an account yet?
          <Link
            className="underline font-medium text-black hover:text-amber-600 ml-1"
            to={'/register'}>
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
