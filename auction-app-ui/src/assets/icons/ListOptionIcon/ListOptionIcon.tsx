import './list-option-icon.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  isActive?: boolean;
};

const ListOptionIcon: React.FC<Props> = ({ isActive }) => {
  return (
    <svg className='c-list-option-icon' width='17' height='12' viewBox='0 0 17 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        className={classNames({ 'c-list-option-path': !isActive, 'c-list-option-path--active': isActive })}
        d='M0 1.5V0.5H17V1.5H0ZM17 5.5V6.5H0V5.5H17ZM0 10.5H17V11.5H0V10.5Z'
      />
    </svg>
  );
};

export default ListOptionIcon;
