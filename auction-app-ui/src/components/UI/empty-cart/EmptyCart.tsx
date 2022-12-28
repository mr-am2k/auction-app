import React from 'react';
import { Link } from 'react-router-dom';

import './empty-cart.scss';

type Props = {
  children?: React.ReactNode;
  icon: JSX.Element;
  message: string;
  route: string;
  buttonMessage: string;
};

const EmptyCart: React.FC<Props> = ({
  icon,
  message,
  route,
  buttonMessage,
}) => {
  return (
    <td colSpan={6}>
      <div className='c-empty-cart'>
        {icon}

        <p>{message}</p>

        <Link to={route}>
          <button>{buttonMessage}</button>
        </Link>
      </div>
    </td>
  );
};

export default EmptyCart;
