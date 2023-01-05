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
  AddItem,
  Error,
} from './pages';
import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import { ROUTES } from './util/routes';
import { LOCAL_STORAGE } from 'util/constants';

import './app.scss';
import authService from 'services/authService';

const ROUTES_WITH_NAVBAR = [
  '/',
  ROUTES.ABOUT_US,
  ROUTES.ADD_PRODUCT,
  ROUTES.MY_ACCOUNT,
  ROUTES.PRIVACY_AND_POLICY,
  ROUTES.PRODUCT,
  ROUTES.SHOP,
  ROUTES.TERMS_AND_CONDITIONS,
];

const App = () => {
  const location = useLocation();
  const { setLoggedInUser } = useUser();

  useEffect(() => {
    const id = storageService.get(LOCAL_STORAGE.ID);
    const token = storageService.get(LOCAL_STORAGE.ACCESS_TOKEN);

    if (id?.length && token?.length) {
      const user = {
        id: id!,
        token: token!,
      };
      setLoggedInUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(() => {
      authService.refreshToken().then((response) => {
        storageService.remove(LOCAL_STORAGE.ACCESS_TOKEN);
        storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, response.accessToken);
      });
    }, 120000);
  }, []);

  useEffect(() => {
    authService.refreshToken().then((response) => {
      storageService.remove(LOCAL_STORAGE.ACCESS_TOKEN);
      storageService.add(LOCAL_STORAGE.ACCESS_TOKEN, response.accessToken);
    });
  })

  return (
    <PageProvider>
      <FormProvider>
        <Header />

        {ROUTES_WITH_NAVBAR.includes(location.pathname) && (
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
                  element={
                    <>
                      <Navbar />
                      <NavbarTracker />
                      <SingleProduct />
                    </>
                  }
                />
                <Route path={ROUTES.MY_ACCOUNT} element={<MyAccount />} />
                <Route
                  path={`${ROUTES.MY_ACCOUNT}/${ROUTES.ADD_PRODUCT}`}
                  element={
                    <>
                      <Navbar />
                      <NavbarTracker />
                      <AddItem />
                    </>
                  }
                />
                <Route path='*' element={<Error />} />
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
