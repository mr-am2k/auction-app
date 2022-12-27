import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useUser } from 'hooks/useUser';

import { PageProvider, FormProvider } from 'store/index';
import { storageService } from 'services/storageService';

import {
  PrivacyAndPolicy,
  TermsAndConditions,
  AboutUs,
  Home,
  SingleProduct,
  Register,
  Login,
  MyAccount,
} from './pages';
import { User } from 'models/user';
import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import { ROUTES } from './util/routes';
import { LOCAL_STORAGE } from 'util/constants';

import './app.scss';

const App = () => {
  const location = useLocation();
  const { setLoggedInUser } = useUser();

  useEffect(() => {
    const id = storageService.get(LOCAL_STORAGE.ID);
    const token = storageService.get(LOCAL_STORAGE.TOKEN);

    if (id?.length && token?.length) {
      const user: User = {
        id: id!,
        token: token!,
      };
      setLoggedInUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageProvider>
      <FormProvider>
        <Header />

        {![ROUTES.REGISTER, ROUTES.LOGIN].includes(location.pathname) && (
          <>
            <Navbar />
            <NavbarTracker />
          </>
        )}

        <div className='c-page-wrapper'>
          <>
            <main>
              <Routes>
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route
                  path={ROUTES.PRIVACY_AND_POLICY}
                  element={<PrivacyAndPolicy />}
                />
                <Route
                  path={ROUTES.TERMS_AND_CONDITIONS}
                  element={<TermsAndConditions />}
                />
                <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
                <Route path='/' element={<Home />} />
                <Route
                  path={`${ROUTES.PRODUCT}/:id`}
                  element={<SingleProduct />}
                />
                <Route
                  path={ROUTES.MY_ACCOUNT}
                  element={<MyAccount />}
                />
              </Routes>
            </main>
          </>
        </div>
        <Footer />
      </FormProvider>
    </PageProvider>
  );
};

export default App;
