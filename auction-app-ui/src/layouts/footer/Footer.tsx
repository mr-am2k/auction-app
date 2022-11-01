import { Link } from 'react-router-dom';
import enStrings from '../../util/en_string';

import { FacebookIcon, InstagramIcon, TwitterIcon } from 'assets/icons';
import './footer.scss';

const Footer = () => {
  return (
    <div className='c-footer'>
      <div className='c-auction-part'>
        <p className='c-title'>AUCTION</p>
        <Link to='/about-us'>{enStrings['Footer.AboutUs']}</Link>
        <Link to='/terms-and-conditions'>
          {enStrings['Footer.TermsAndConditions']}
        </Link>
        <Link to='/privacy-and-policy'>
          {enStrings['Footer.PrivacyAndPolicy']}
        </Link>
      </div>
      <div className='c-contact-part'>
        <p className='c-title'>GET IN TOUCH</p>
        <p>Call Us at +123 797-567-2535</p>
        <p>support@auction.com</p>
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
