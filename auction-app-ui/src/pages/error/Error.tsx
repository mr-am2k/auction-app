import { Link } from 'react-router-dom';
import './error.scss';
import logo from 'assets/logo/auction-app-logo.svg';

const Error = () => {
  return (
    <div className='c-error-wrapper'>
      <img src={logo} alt="LOGO"/>
      <h1>404</h1>
      <p>Ooops! Looks like the page is Not Found</p>
      <Link to='/'>
      <button>GO BACK</button>
      </Link>
    </div>
  );
};

export default Error;
