import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signupThunk} from '../../store/session';
import Header from '../Header_footer/Header';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        signupThunk(name, username, email, password, profileImg)
      ).catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }

    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
  };
  return (
    <>
      <Header />
      <div className="mt-4">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <div
          className={`${
            !profileImg
              ? 'hidden'
              : 'mx-auto container flex justify-center my-3 w-56 h-56'
          }`}>
          <img
            src={profileImg}
            alt="user profile"
            className="object-cover rounded-xl w-full h-full border-double border-gray-400 border-4 shadow-xl"
          />
        </div>
        <div className="flex items-center justify-center mb-2">
          {errors.length > 0 &&
            errors.map(error => (
              <p className="text-red-500 font-medium">{error}</p>
            ))}
        </div>
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
          <input
            type="text"
            placeholder="image url"
            value={profileImg}
            onChange={e => setProfileImg(e.target.value)}
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
    </>
  );
};

export default RegisterPage;
