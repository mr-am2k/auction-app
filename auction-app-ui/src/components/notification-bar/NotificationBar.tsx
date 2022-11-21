import './notification-bar.scss';

type Props = {
  children?: React.ReactNode;
  notificationMessage: number | undefined;
};

const NotificationBar: React.FC<Props> = ({ notificationMessage }) => {
  return (
    <>
      {notificationMessage === 0 && (
        <div className='c-highest-bid'>
          <p>Congrats! You are the highest bider!</p>
        </div>
      )}

      {notificationMessage === 1 && (
        <div className='c-outbidded'>
          <p> There are higher bids than yours. You could give a second try!</p>
        </div>
      )}

      {notificationMessage === 2 && (
        <div className='c-final-result'>
          <p>Congratulations! You outbid the competition.</p>
        </div>
      )}

      {notificationMessage === 3 && (
        <div className='c-final-result'>
          <p>Unfortunately you have been outbidded!</p>
        </div>
      )}
    </>
  );
};

export default NotificationBar;
