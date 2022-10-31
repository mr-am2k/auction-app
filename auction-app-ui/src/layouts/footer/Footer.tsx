import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/icons/facebookIcon.png';
import instagramIcon from '../../assets/icons/instagramIcon.png';
import twitterIcon from '../../assets/icons/twitterIcon.png';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.auctionPart}>
        <p className={classes.title}>AUCTION</p>
        <Link to='/about-us'>About Us</Link>
        <Link to='/terms-and-conditions'>Terms and Conditions</Link>
        <Link to='/privacy-and-policy'>Privacy and Policy</Link>
      </div>
      <div className={classes.contactPart}>
        <p className={classes.title}>GET IN TOUCH</p>
        <p>Call Us at +123 797-567-2535</p>
        <p>support@auction.com</p>
        <div className={classes.footerIcons}>
          <a href='http://www.facebook.com' target='_blank' rel='noreferrer'>
            <img src={facebookIcon} alt='Facebook icon' />
          </a>
          <a href='http://www.instagram.com' target='_blank' rel='noreferrer'>
            <img src={instagramIcon} alt='Instagram icon' />
          </a>
          <a href='http://www.twitter.com' target='_blank' rel='noreferrer'>
            <img src={twitterIcon} alt='Twitter icon' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
