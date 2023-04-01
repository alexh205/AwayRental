import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {editUserPasswordThunk} from '../../store/session';

const UserPassword = ({setUserPassword, user}) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validateErrors, setValidateErrors] = useState([]);

  const validate = () => {
    const errors = [];
    if (!currentPassword) errors.push("Please provide a 'Current password'");
    if (!password) errors.push("Please provide a 'Password'");
    if (!confirmPassword) errors.push("Please provide a 'Confirm password'");
    if (password !== confirmPassword)
      errors.push("'Password' and 'confirm password' don't match");
    return errors;
  };

  const saveChange = async e => {
    e.preventDefault();
    const errors = validate();
    const id = user.id;
    if (errors.length > 0) {
      return setValidateErrors(errors);
    }

    await dispatch(editUserPasswordThunk({id, password, currentPassword})).then(
      () => setUserPassword(false)
    );
  };

  const handleCancel = e => {
    e.preventDefault();
    setPassword('');
    setConfirmPassword('');
    setUserPassword(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-3xl mb-2">Update password</h2>
      <form>
        {validateErrors.length > 0 && (
          <div className="my-2 ml-2">
            <div className="text-red-600 text-[13px] font-semibold  flex flex-col items-center justify-center">
              {validateErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-rows-4 mx-auto">
          <div className="flex flex-row items-center">
            <label className="mr-2 text-lg text-site-primary font-semibold whitespace-nowrap">
              Current password:
            </label>
            <input
              value={currentPassword}
              type="password"
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Current password"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="mr-2 text-lg text-site-primary font-semibold whitespace-nowrap">
              New password:
            </label>
            <input
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-row items-center whitespace-nowrap">
            <label className="mr-2 text-lg text-site-primary font-semibold">
              Confirm password:
            </label>
            <input
              value={confirmPassword}
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
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

export default UserPassword;
