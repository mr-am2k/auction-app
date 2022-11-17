import { Link } from 'react-router-dom';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import EN_STRINGS from '../../util/en_strings';
import { PHONE_NUMBER, EMAIL } from 'util/constants';

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
        <p>
          {EN_STRINGS['Footer.CallUs']}: {PHONE_NUMBER}
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
