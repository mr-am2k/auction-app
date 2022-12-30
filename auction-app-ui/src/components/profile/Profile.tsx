import { useEffect, useRef, useState } from 'react';

import { usePage } from 'hooks/usePage';
import { useForm } from 'hooks/useForm';

import userService from 'services/userService';

import { storage } from 'firebase-storage/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { UpdateUserDataRequest } from 'requestModels/updateUserDataRequest';
import { User } from 'models/user';
import { PersonalForm, LocationForm, CardForm } from 'components';
import arrowUp from 'assets/images/arrow-up.png';
import userImage from 'assets/images/user.png';
import arrowDown from 'assets/images/arrow-down.png';
import EN_STRINGS from 'translation/en';
import { getUserData } from 'util/getUserData';
import { getCardData } from 'util/getCardData';
import { INPUT_TYPE_FILE } from 'util/constants';
import isEmpty from 'util/objectUtils';
import { v4 } from 'uuid';

import './profile.scss';

import classNames from 'classnames';

const Profile = () => {
  const [updateError, setUpdateError] = useState<string>();
  const [displayCard, setDisplayCard] = useState(true);
  const [displayShipping, setDisplayShipping] = useState(true);
  const [user, setUser] = useState<User>();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues, validateForm } = useForm();

  const imageRef = useRef<HTMLInputElement>(null);

  const fetchUser = () => {
    userService.getUser().then((response) => setUser(response));
  };

  const changeDisplayCard = () => {
    setDisplayCard((prevState) => !prevState);
  };

  const changeDisplayShipping = () => {
    setDisplayShipping((prevState) => !prevState);
  };

  const setImage = () => {
    setImageUpload(imageRef.current!.files![0]);
  };

  const uploadImage = async () => {
    if (imageUpload === null) return;

    const imageRef = ref(
      storage,
      `profile-pictures/${imageUpload.name! + v4()}`
    );

    const snapshot = await uploadBytes(imageRef, imageUpload);

    const url = await getDownloadURL(snapshot.ref);

    return url;
  };

  const submitForm = async () => {
    let isValid = true;

    if (!isEmpty(fieldValues)) {
      isValid = validateForm();
    }

    if (!isValid) {
      setUpdateError('There is a problem with provided values!');
      return;
    } else {
      setUpdateError('');
    }

    setUploading(true);

    const updateUserRequest = getUserData(fieldValues, user!);
    const updateCardRequest = getCardData(fieldValues, user!);

    const imageUrl = await uploadImage();

    if (imageUrl) {
      updateUserRequest.imageUrl = imageUrl!;
    }

    const updateUserDataRequest: UpdateUserDataRequest = {
      updateUserRequest,
      updateCardRequest,
    };

    userService
      .updateUser(user!.id, updateUserDataRequest)
      .then(() => {
        window.location.reload();
        setUploading(false);
      })
      .catch((error) => setUpdateError(error.data.response.message));
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.PROFILE);
    setNavbarItems([
      EN_STRINGS.NAVBAR.MY_ACCOUNT,
      EN_STRINGS.MY_ACCOUNT.PROFILE,
    ]);
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = updateError ? (
    <div className='c-error-message'>
      <p>{updateError}</p>
    </div>
  ) : (
    ''
  );

  return (
    <div className='c-profile-wrapper'>
      <div className='c-profile-information'>
        <div className='c-profile-header'>
          <p>{EN_STRINGS.PROFILE.PERSONAL}</p>
        </div>

        <div className='c-personal-information'>
          <div className='c-personal-image'>
            <img
              src={user?.imageUrl ? user.imageUrl : userImage}
              alt='Profile'
            />
            <label>
              {EN_STRINGS.PROFILE.CHANGE_PHOTO}
              <input
                ref={imageRef}
                onChange={setImage}
                type={INPUT_TYPE_FILE}
              />
            </label>
            {imageUpload && <p>{imageUpload.name}</p>}
          </div>
          <PersonalForm user={user} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayCard}>
          <img
            src={!displayCard ? arrowUp : arrowDown}
            alt={EN_STRINGS.PROFILE.CARD}
          />
          <p>{EN_STRINGS.PROFILE.CARD}</p>
        </div>

        <div
          className={classNames({
            'c-display-card': displayCard,
            'c-profile-content': !displayCard,
          })}
        >
          <CardForm user={user} />
        </div>
      </div>

      <div className='c-profile-information'>
        <div className='c-profile-header' onClick={changeDisplayShipping}>
          <img
            src={!displayShipping ? arrowUp : arrowDown}
            alt={EN_STRINGS.PROFILE.SHIPPING}
          />
          <p>{EN_STRINGS.PROFILE.SHIPPING}</p>
        </div>

        <div
          className={classNames({
            'c-display-shipping': displayShipping,
            'c-profile-content': !displayShipping,
          })}
        >
          <LocationForm user={user} />
        </div>
      </div>

      {error}

      <button onClick={submitForm} disabled={uploading}>
        {uploading ? EN_STRINGS.PROFILE.UPDATING : EN_STRINGS.PROFILE.BUTTON}{' '}
      </button>
    </div>
  );
};

export default Profile;
