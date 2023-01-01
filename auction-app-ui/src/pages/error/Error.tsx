import { Link } from 'react-router-dom';
import './error.scss';
import logo from 'assets/logo/auction-app-logo.svg';
import EN_STRINGS from 'translation/en';

const Error = () => {
  return (
    <div className='c-error-wrapper'>
      <img src={logo} alt='LOGO' />
      <h1>{EN_STRINGS.ERROR_PAGE.ERROR_NUMBER}</h1>

      <p>{EN_STRINGS.ERROR_PAGE.MESSAGE}</p>

      <Link to='/'>
        <button>{EN_STRINGS.ERROR_PAGE.BUTTON_MESSAGE}</button>
      </Link>
    </div>
  );
};

export default Error;
