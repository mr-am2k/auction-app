import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';

import { useUser } from 'hooks/useUser';

import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { EN_STRINGS } from 'translation/en';
import jwtDecode from 'jwt-decode';
import { handleSocialLogin } from 'util/socialLoginUtils';

type Props = {
  children?: React.ReactNode;
  setLoginError: (message: string) => void;
};

const LoginGoogle: React.FC<Props> = ({ setLoginError }) => {
  const navigate = useNavigate();

  const { setLoggedInUser } = useUser();

  const handleGoogleLogin = (credentialsResponse: any) => {
    const userDecoded: any = jwtDecode(credentialsResponse.credential);
    console.log(userDecoded)
    handleSocialLogin(
      userDecoded.given_name,
      userDecoded.family_name,
      userDecoded.email,
      AuthenticationProvider.GOOGLE,
      setLoggedInUser,
      navigate,
      setLoginError
    );
  };

  return (
    <GoogleLogin
      onSuccess={credentialsResponse => handleGoogleLogin(credentialsResponse)}
      onError={() => setLoginError(EN_STRINGS.LOGIN.GOOGLE_ERROR)}
    />
  );
};

export default LoginGoogle;
