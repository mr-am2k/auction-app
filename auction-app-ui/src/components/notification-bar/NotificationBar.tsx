import EN_STRINGS from 'util/en_strings';
import './notification-bar.scss';

const NOTIFICATION_TYPE = {
  HIGHEST_BID_PLACED: 'HIGHEST_BID_PLACED',
  OUTBIDDED: 'OUTBIDDED',
  AUCTION_WON: 'AUCTION_WON',
  AUCTION_LOST: 'AUCTION_LOST',
};

const SCSS_NOTIFICATION_CLASSES = {
  HIGHEST_BID_PLACED: 'c-highest-bid',
  OUTBIDDED: 'c-outbidded',
  AUCTION_FINISHED: 'c-final-result',
};

type Props = {
  children?: React.ReactNode;
  notificationMessage: string | undefined;
};

const NotificationBar: React.FC<Props> = ({ notificationMessage }) => {
  return (
    <>
      {notificationMessage === NOTIFICATION_TYPE.HIGHEST_BID_PLACED && (
        <div className={SCSS_NOTIFICATION_CLASSES.HIGHEST_BID_PLACED}>
          <p>{EN_STRINGS.NOTIFICATION_BAR.HIGHEST_BID_PLACED}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_TYPE.OUTBIDDED && (
        <div className={SCSS_NOTIFICATION_CLASSES.OUTBIDDED}>
          <p>{EN_STRINGS.NOTIFICATION_BAR.OUTBIDDED}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_TYPE.AUCTION_WON && (
        <div className={SCSS_NOTIFICATION_CLASSES.AUCTION_FINISHED}>
          <p>{EN_STRINGS.NOTIFICATION_BAR.AUCTION_WON}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_TYPE.AUCTION_LOST && (
        <div className={SCSS_NOTIFICATION_CLASSES.AUCTION_FINISHED}>
          <p>{EN_STRINGS.NOTIFICATION_BAR.AUCTION_LOST}</p>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
