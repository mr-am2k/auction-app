import { EN_STRINGS } from 'translation/en';

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
  const classKey =
    notificationMessage as keyof typeof SCSS_NOTIFICATION_CLASSES;
  const enumKey =
    notificationMessage as keyof typeof EN_STRINGS.NOTIFICATION_BAR;

  return (
    <>
      <div className={SCSS_NOTIFICATION_CLASSES[classKey]}>
        <p>{EN_STRINGS.NOTIFICATION_BAR[enumKey]}</p>
      </div>
    </>
  );
};

export default NotificationBar;
