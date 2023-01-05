import { useEffect, useRef, useState } from 'react';

import { usePage } from 'hooks/usePage';
import { useForm } from 'hooks/useForm';

import userService from 'services/userService';
import { imageService } from 'services/imageService';

import { PersonalForm, Location, Card } from 'components';
import { UpdateUserDataRequest } from 'requestModels/updateUserDataRequest';
import { User } from 'models/user';
import userImage from 'assets/images/user.png';
import { getUserData } from 'util/getUserData';
import { getCardData } from 'util/getCardData';
import { INPUT_TYPE_FILE, LOCAL_STORAGE } from 'util/constants';
import isEmpty from 'util/objectUtils';
import EN_STRINGS from 'translation/en';

import './profile.scss';
import { storageService } from 'services/storageService';

const Profile = () => {
  const [updateError, setUpdateError] = useState<string>();
  const [user, setUser] = useState<User>();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues, validateForm } = useForm();

  const imageRef = useRef<HTMLInputElement>(null);

  const fetchUser = () => {
    userService
      .getUser(storageService.get(LOCAL_STORAGE.ID)!)
      .then((userResponse) => {
        setUser(userResponse);
      });
  };

  const setImage = () => {
    setImageUpload(imageRef.current!.files![0]);
  };

  const submitForm = async () => {
    let isValid = true;

    if (!isEmpty(fieldValues)) {
      isValid = validateForm();
    }

    if (!isValid) {
      setUpdateError(EN_STRINGS.PROFILE.ERROR);
      return;
    } else {
      setUpdateError('');
    }

    setUploading(true);

    const updateUserRequest = getUserData(fieldValues, user!);
    const updateCardRequest = getCardData(fieldValues, user!);

    let imageUrl = undefined;

    if (imageUpload !== null && imageUpload?.type.includes('image')) {
      imageUrl = await imageService.upload('profile-pictures', imageUpload);
    }

    if (imageUrl) {
      updateUserRequest.profileImageUrl = imageUrl!;
    }

    const updateUserDataRequest: UpdateUserDataRequest = {
      updateUserRequest,
      updateCardRequest,
    };

    userService
      .updateUser(user!.id, updateUserDataRequest)
      .then(() => {
        window.location.reload();
        setUploading(true);
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
              src={user?.profileImageUrl ? user.profileImageUrl : userImage}
              alt='Profile'
            />

            <label>
              {EN_STRINGS.PROFILE.CHANGE_PHOTO}
              <input
                ref={imageRef}
                onChange={setImage}
                type={INPUT_TYPE_FILE}
                accept='image/*'
              />
            </label>

            {imageUpload && <p>{imageUpload.name}</p>}
          </div>

          <PersonalForm user={user} />
        </div>
      </div>

      <Card user={user} />

      <Location user={user} />

      {error}

      <button onClick={submitForm} disabled={uploading}>
        {uploading ? EN_STRINGS.PROFILE.UPDATING : EN_STRINGS.PROFILE.BUTTON}{' '}
      </button>
    </div>
  );
};

export default Profile;
