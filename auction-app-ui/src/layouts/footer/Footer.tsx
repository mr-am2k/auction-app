import { Link } from 'react-router-dom';
import EN_STRINGS from '../../util/en_strings';
import CONSTANTS from 'util/constants';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import './footer.scss';

const Footer = () => {
  return (
    <div className='c-footer'>
      <div className='c-auction-part'>
        <p className='c-title'>{EN_STRINGS['Footer.Auction']}</p>
        <Link to='/about-us'>{EN_STRINGS['Footer.AboutUs']}</Link>
        <Link to='/terms-and-conditions'>
          {EN_STRINGS['Footer.TermsAndConditions']}
        </Link>
        <Link to='/privacy-and-policy'>
          {EN_STRINGS['Footer.PrivacyAndPolicy']}
        </Link>
      </div>

      <div className='c-contact-part'>
        <p className='c-title'>{EN_STRINGS['Footer.GetInTouch']}</p>
        <p>Call Us at {CONSTANTS.PHONE_NUMBER}</p>
        <p>{CONSTANTS.EMAIL}</p>
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
