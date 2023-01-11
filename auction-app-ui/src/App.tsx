import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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
import { getTokenExpirationDate } from 'util/jwtUtils';

import './app.scss';

const PAGES_WITH_NAVBAR_COMPONENT = [
  '/',
  ROUTES.ABOUT_US,
  ROUTES.ADD_PRODUCT,
  ROUTES.MY_ACCOUNT,
  ROUTES.PRIVACY_AND_POLICY,
  ROUTES.PRODUCT,
  ROUTES.SHOP,
  ROUTES.TERMS_AND_CONDITIONS,
  `${ROUTES.MY_ACCOUNT}${ROUTES.ADD_PRODUCT}`,
];

const App = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    resetLoggedInUser,
    loginUser,
    logoutUser,
  } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const refreshToken = storageService.get(LOCAL_STORAGE.REFRESH_TOKEN);

  const setUser = () => {
    loginUser().then((user) => {
      setLoggedInUser(user);
    });
  };

  useEffect(() => {
    if (refreshToken && loggedInUser?.accessToken === undefined) {
      if (getTokenExpirationDate(refreshToken)! < new Date()) {
        logoutUser();
        resetLoggedInUser();
        navigate('/');
      } else {
        setUser();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (!storageService.get(LOCAL_STORAGE.REFRESH_TOKEN)) {
        return;
      }

      if (
        storageService.get(LOCAL_STORAGE.REFRESH_TOKEN) &&
        getTokenExpirationDate(
          storageService.get(LOCAL_STORAGE.REFRESH_TOKEN)!
        )! < new Date()
      ) {
        logoutUser();
        resetLoggedInUser();
        navigate('/');
        return;
      }

      if (storageService.get(LOCAL_STORAGE.REFRESH_TOKEN)) {
        setUser();
      }
    }, 120000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageProvider>
      <FormProvider>
        <Header />

        {PAGES_WITH_NAVBAR_COMPONENT.includes(location.pathname) && (
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
                  path={`${ROUTES.MY_ACCOUNT}${ROUTES.ADD_PRODUCT}`}
                  element={<AddItem />}
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
