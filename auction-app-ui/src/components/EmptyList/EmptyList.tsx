import React from 'react';
import { Link } from 'react-router-dom';

import './empty-list.scss';

type Props = {
  children?: React.ReactNode;
  icon: JSX.Element;
  message: string;
  route: string;
  buttonLabel: string;
};

const EmptyList: React.FC<Props> = ({ icon, message, route, buttonLabel }) => {
  return (
    <td colSpan={6}>
      <div className='c-empty-cart'>
        {icon}

        <p>{message}</p>

        <Link to={route}>
          <button>{buttonLabel}</button>
        </Link>
      </div>
    </td>
  );
};

export default EmptyList;
