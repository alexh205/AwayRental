import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signup} from '../../store/session';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/" />;
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup(name, username, email, password)).catch(
        async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
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
