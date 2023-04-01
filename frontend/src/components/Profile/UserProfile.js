import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {editUserThunk} from '../../store/session';

const UserProfile = ({setUserProfileInfo, user}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [valid, setValid] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);

  const validate = () => {
    const errors = [];
    if (!name) errors.push("Please provide a 'Name'");
    if (!username) errors.push("Please provide a 'Username'");
    if (!email) errors.push("Please provide an 'Email'");
    return errors;
  };

  if (user) {
    if (!valid) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);

      setValid(true);
    }
  }

  const saveChange = async e => {
    e.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
      return setValidateErrors(errors);
    }
    await dispatch(editUserThunk({name, username, email}))
      .then(() => alert('Profile was saved!'))
      .then(() => setUserProfileInfo(false));
  };

  const handleCancel = e => {
    e.preventDefault();
    setName('');
    setUsername('');
    setEmail('');
    setUserProfileInfo(false);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-3xl mb-2">Profile Detail</h2>
      <form>
        {validateErrors.length > 0 && (
          <div className="my-2 ml-2">
            <div className="text-red-600 text-[13px] font-semibold  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {validateErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-rows-4 mx-auto">
          <div className="flex flex-row items-center">
            <label className="mr-2 text-xl text-site-primary font-semibold">
              Name:
            </label>
            <input
              value={name}
              type="text"
              onChange={e => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="mr-2 text-xl text-site-primary font-semibold">
              Username:
            </label>
            <input
              value={username}
              type="text"
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="mr-2 text-xl text-site-primary font-semibold">
              Email:
            </label>
            <input
              value={email}
              type="text"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mx-auto flex flex-row gap-2 items-center">
            <button
              onClick={saveChange}
              className="bg-site-primary py-[6px] px-[8px] w-full rounded-xl text-base text-white my-2">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 p-[6px] w-full rounded-xl text-base text-white my-2">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
