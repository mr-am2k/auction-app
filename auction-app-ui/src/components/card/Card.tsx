import { useState } from 'react';

import { CreditCardForm } from '../index';
import { User } from 'models/user';
import arrowUp from 'assets/images/arrow-up.png';
import arrowDown from 'assets/images/arrow-down.png';
import { EN_STRINGS } from 'translation/en';

import './card.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
};

const Card: React.FC<Props> = ({ user }) => {
  const [cardDisplayed, setCardDisplayed] = useState(true);

  const changeDisplayCard = () => {
    setCardDisplayed(cardDisplayed => !cardDisplayed);
  };

  return (
    <div className='c-card-wrapper'>
      <div className='c-card-header' onClick={changeDisplayCard}>
        <img
          src={!cardDisplayed ? arrowUp : arrowDown}
          alt={EN_STRINGS.PROFILE.CARD}
        />

        <p>{EN_STRINGS.PROFILE.CARD}</p>
      </div>

      <div
        className={classNames({
          'c-display-card': cardDisplayed,
          'c-card-content': !cardDisplayed,
        })}
      >
        <CreditCardForm user={user} />
      </div>
    </div>
  );
};

export default Card;
