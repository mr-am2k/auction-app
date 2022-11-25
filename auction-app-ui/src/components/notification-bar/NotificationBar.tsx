import EN_STRINGS from 'util/en_strings';
import './notification-bar.scss';

const SCSS_NOTIFICATION_CLASSES = {
  HIGHEST_BID_PLACED: 'c-highest-bid',
  OUTBIDDED: 'c-outbidded',
  AUCTION_FINISHED: 'c-final-result',
};

type Props = {
  children?: React.ReactNode;
  notificationMessage: string;
};

const NotificationBar: React.FC<Props> = ({ notificationMessage }) => {
  const classesKey = notificationMessage as keyof typeof SCSS_NOTIFICATION_CLASSES;
  const enumKey = notificationMessage as keyof typeof EN_STRINGS.NOTIFICATION_BAR

  return (
    <>
      <div className={SCSS_NOTIFICATION_CLASSES[classesKey]}>
        <p>{EN_STRINGS.NOTIFICATION_BAR[enumKey]}</p>
      </div>

      {/* {notificationMessage === NOTIFICATION_TYPE.OUTBIDDED && (
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
      )} */}
    </>
  );
};

export default NotificationBar;
