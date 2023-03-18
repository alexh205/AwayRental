import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../../store/session';
import {useDispatch, useSelector} from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login(email, password)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  return (
    <div className="mt-4">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
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
