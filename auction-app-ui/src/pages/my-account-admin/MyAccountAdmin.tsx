import { OptionsIcon } from 'assets/icons';
import './my-account-admin.scss';
import { AdminCategories } from 'components';

const MyAccountAdmin = () => {
  return (
    <div className='c-my-account-admin-wrapper'>
      <div className='c-my-account-admin-navbar'>
        <div className='c-my-account-admin-navbar-element'>
          <OptionsIcon />
          <p>Category</p>
        </div>
      </div>

      <div className='c-my-account-admin-content'>
        <AdminCategories />
      </div>
    </div>
  );
};

export default MyAccountAdmin;
