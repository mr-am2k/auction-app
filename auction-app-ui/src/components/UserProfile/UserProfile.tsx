import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { usePage } from 'hooks/usePage';
import { useForm } from 'hooks/useForm';

import userService from 'services/userService';
import { fileUploadService } from 'services/fileUploadService';
import { storageService } from 'services/storageService';

import { PersonalForm, LocationDetails, Card } from '../index';
import { UpdateUserDataRequest } from 'models/request/update/updateUserDataRequest';
import { User } from 'models/user';
import userImage from 'assets/images/user.png';
import { getUserData } from 'util/userUtils';
import { getCardData } from 'util/creditCardUtils';
import { INPUT_TYPE_FILE, LOCAL_STORAGE } from 'util/constants';
import { getAddressData } from 'util/addressUtils';
import { EN_STRINGS } from 'translation/en';

import './user-profile.scss';
import 'scss/settings.scss';

const UserProfile = () => {
  const [updateError, setUpdateError] = useState<string>();
  const [user, setUser] = useState<User>();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(null);

  const { setNavbarTitle, setNavbarItems } = usePage();
  const { fieldValues, validateForm, resetFieldValues, setFieldValidationResults } = useForm();

  const imageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const reader = new FileReader();

  const fetchUser = () => {
    userService.getUser(storageService.get(LOCAL_STORAGE.ID)!).then(userResponse => {
      setUser(userResponse);
    });
  };

  const setImage = () => {
    setImageUpload(imageRef.current!.files![0]);
  };

  const isFormValid = () => {
    return validateForm() ? true : false;
  };

  const submitForm = async () => {
    if (!isFormValid()) {
      setUpdateError(EN_STRINGS.PROFILE.ERROR);
      return;
    }

    setUploading(true);

    const updateUserRequest = getUserData(fieldValues, user!);
    const updateCreditCardRequest = getCardData(fieldValues, user!);
    const updateAddressRequest = getAddressData(fieldValues, user!);

    updateUserRequest.address = updateAddressRequest;

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
    };

    userService
      .updateUser(user!.id, updateUserDataRequest)
      .then(() => {
        setUploading(false);
        navigate('/');
      })
      .catch(error => setUpdateError(error.data.response.message));
  };

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.MY_ACCOUNT.PROFILE);
    setNavbarItems([EN_STRINGS.NAVBAR.MY_ACCOUNT, EN_STRINGS.MY_ACCOUNT.PROFILE]);

    fetchUser();

    return () => {
      resetFieldValues();
      setFieldValidationResults({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!imageUpload) {
      return;
    }

    reader.onload = event => {
      setImagePreview(event.target?.result as string);
    };

    reader.readAsDataURL(imageUpload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpload]);

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
            <img src={imageUpload ? imagePreview! : user?.profileImageUrl ? user.profileImageUrl : userImage} alt='Profile' />

            <label>
              {EN_STRINGS.PROFILE.CHANGE_PHOTO}
              <input ref={imageRef} onChange={setImage} type={INPUT_TYPE_FILE} accept='image/*' />
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
