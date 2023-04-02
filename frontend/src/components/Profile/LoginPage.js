import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {loginThunk} from '../../store/session';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../Header_footer/Header';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/account" />;

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginThunk(email, password)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const demoLogin = async e => {
    e.preventDefault();

    await dispatch(loginThunk('demo@user.io', 'password'));
  };

  return (
    <>
      <Header />
      <div className="mt-6">
        <div>
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <div className="text-center">
            <div className="inline-block mx-auto my-auto">
              <button
                className="text-white bg-slate-400 rounded-2xl hover:bg-slate-500 px-4 py-2 text-base mb-2"
                onClick={demoLogin}>
                Demo Login
              </button>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default LoginPage;
