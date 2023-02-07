import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { useNavigate } from 'react-router';

import { useUser } from 'hooks/useUser';

import { AuthenticationProvider } from 'models/enum/authenticationProvider';
import { handleSocialLogin } from 'util/socialLoginUtils';
import { EN_STRINGS } from 'translation/en';

type Props = {
  children?: React.ReactNode;
  setLoginError: (message: string) => void;
};

const LoginFacebook: React.FC<Props> = ({ setLoginError }) => {
  const navigate = useNavigate();

  const { setLoggedInUser } = useUser();

  return (
    <LoginSocialFacebook
      appId={process.env.REACT_APP_FACEBOOK_APP_ID!}
      onResolve={(response: any) =>
        handleSocialLogin(
          response.data.first_name,
          response.data.last_name,
          response.data.email,
          AuthenticationProvider.FACEBOOK,
          setLoggedInUser,
          navigate,
          setLoginError
        )
      }
      onReject={() => setLoginError(EN_STRINGS.LOGIN.FACEBOOK_ERROR)}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
};

export default LoginFacebook;
