import EN_STRINGS from 'util/en_strings';
import './notification-bar.scss';

const NOTIFICATION_OPTIONS = {
  HIGHEST_BID_PLACED: 'HIGHEST_BID_PLACED',
  OUTBIDDED: 'OUTBIDDED',
  AUCTION_WON: 'AUCTION_WON',
  AUCTION_LOST: 'AUCTION_LOST',
};

const NOTIFICATION_CLASSES = {
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
      {notificationMessage === NOTIFICATION_OPTIONS.HIGHEST_BID_PLACED && (
        <div className={NOTIFICATION_CLASSES.HIGHEST_BID_PLACED}>
          <p>{EN_STRINGS['NotificationBar.HighestBidPlaced']}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_OPTIONS.OUTBIDDED && (
        <div className={NOTIFICATION_CLASSES.OUTBIDDED}>
          <p>{EN_STRINGS['NotificationBar.Outbidded']}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_OPTIONS.AUCTION_WON && (
        <div className={NOTIFICATION_CLASSES.AUCTION_FINISHED}>
          <p>{EN_STRINGS['NotificationBar.AuctionWon']}</p>
        </div>
      )}

      {notificationMessage === NOTIFICATION_OPTIONS.AUCTION_LOST && (
        <div className={NOTIFICATION_CLASSES.AUCTION_FINISHED}>
          <p>{EN_STRINGS['NotificationBar.AuctionLost']}</p>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
