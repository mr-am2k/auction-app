import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { usePage } from 'hooks/usePage';
import { useForm } from 'hooks/useForm';

import userService from 'services/userService';
import { fileUploadService } from 'services/fileUploadService';
import { storageService } from 'services/storageService';

import { PersonalForm, LocationDetails, Card } from 'components';
import { UpdateUserDataRequest } from 'requestModels/update/updateUserDataRequest';
import { User } from 'models/user';
import userImage from 'assets/images/user.png';
import { getUserData } from 'util/getUserData';
import { getCardData } from 'util/getCreditCardData';
import { INPUT_TYPE_FILE, LOCAL_STORAGE } from 'util/constants';
import { getAddressData } from 'util/getAddressData';
import isEmpty from 'util/objectUtils';
import EN_STRINGS from 'translation/en';

import './user-profile.scss';
import 'scss/settings.scss'

const UserProfile = () => {
  const [updateError, setUpdateError] = useState<string>();
  const [user, setUser] = useState<User>();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues, validateForm } = useForm();

  const imageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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
    const updateCreditCardRequest = getCardData(fieldValues, user!);
    const updateAddressRequest = getAddressData(fieldValues, user!);

    let profileImageUrl = undefined;

    if (imageUpload !== null && imageUpload?.type.includes('image')) {
      profileImageUrl = await fileUploadService.upload('profile-pictures', imageUpload);
    }

    if (profileImageUrl) {
      updateUserRequest.profileImageUrl = profileImageUrl!;
    }

    const updateUserDataRequest: UpdateUserDataRequest = {
      updateUserRequest,
      updateCreditCardRequest,
      updateAddressRequest,
    };

    userService
      .updateUser(user!.id, updateUserDataRequest)
      .then(() => {
        setUploading(false);
        navigate('/')
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

      <LocationDetails user={user} />

      {error}

      <button className='c-default-button' onClick={submitForm} disabled={uploading}>
        {uploading ? EN_STRINGS.PROFILE.UPDATING : EN_STRINGS.PROFILE.BUTTON}
      </button>
    </div>
  );
};

export default UserProfile;
