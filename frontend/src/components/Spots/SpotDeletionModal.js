import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteSpotByIdThunk} from '../../store/spots';

const SpotDeletionModal = ({spotId, setSelectImage}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = e => {
    e.preventDefault();
    setSelectImage(true);

    setShowConfirm(true);
  };

  const handleConfirmClick = () => {
    dispatch(deleteSpotByIdThunk(spotId))
      .then(() => setShowConfirm(false))
      .then(() => history.push('/account/spots'));
  };

  const handleCancelClick = () => {
    setSelectImage(false);
    setShowConfirm(false);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className=" p-[4px] bg-slate-500 hover:bg-slate-400 hover:shadow-lg text-white rounded-lg">
        Delete
      </button>

      {showConfirm && (
        <div className="fixed h-screen w-screen inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to delete?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2" onClick={handleCancelClick}>
                Cancel
              </button>
              <button
                className="p-[4px] bg-slate-500 hover:bg-slate-400 hover:shadow-lg text-white rounded-lg"
                onClick={handleConfirmClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotDeletionModal;
