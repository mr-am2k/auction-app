import { Link } from 'react-router-dom';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import EN_STRINGS from '../../translation/en';
import { PHONE_NUMBER, EMAIL } from 'util/constants';

import './footer.scss';

const Footer = () => {
  return (
    <div className='c-footer'>
      <div className='c-auction-part'>
        <p className='c-title'>{EN_STRINGS.FOOTER.AUCTION}</p>
        <Link to='/about-us'>{EN_STRINGS.FOOTER.ABOUT_US}</Link>
        <Link to='/terms-and-conditions'>
          {EN_STRINGS.FOOTER.TERMS_AND_CONDITIONS}
        </Link>
        <Link to='/privacy-and-policy'>
          {EN_STRINGS.FOOTER.PRIVACY_AND_POLICY}
        </Link>
      </div>

      <div className='c-contact-part'>
        <p className='c-title'>{EN_STRINGS.FOOTER.GET_IN_TOUCH}</p>
        <p>
          {EN_STRINGS.FOOTER.CALL_US}: {PHONE_NUMBER}
        </p>
        <p>{EMAIL}</p>
        <div className='c-footer-icons'>
          <a href='http://www.facebook.com' target='_blank' rel='noreferrer'>
            <FacebookIcon />
          </a>
          <a href='http://www.instagram.com' target='_blank' rel='noreferrer'>
            <InstagramIcon />
          </a>
          <a href='http://www.twitter.com' target='_blank' rel='noreferrer'>
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
