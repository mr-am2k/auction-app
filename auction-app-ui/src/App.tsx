import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useUser } from 'hooks/useUser';

import { PageProvider, FormProvider, FilterProvider } from 'store/index';
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
  Shop,
  Payment,
  MyAccountAdmin,
} from './pages';
import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import { ROUTES } from './util/routes';
import { APP, LOCAL_STORAGE } from 'util/constants';
import { getTokenExpirationDate } from 'util/jwtUtils';
import { hasNavbar } from 'util/navbarUtils';

import './app.scss';

const App = () => {
  
  const { loggedInUser, setLoggedInUser, resetLoggedInUser, loginUser, logoutUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const refreshToken = storageService.get(LOCAL_STORAGE.REFRESH_TOKEN);

  const setUser = () => {
    loginUser().then(user => {
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
        getTokenExpirationDate(storageService.get(LOCAL_STORAGE.REFRESH_TOKEN)!)! < new Date()
      ) {
        logoutUser();
        resetLoggedInUser();
        navigate('/');
        return;
      }

      if (storageService.get(LOCAL_STORAGE.REFRESH_TOKEN)) {
        setUser();
      }
    }, APP.TOKEN_GENERATION_TIME_IN_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(storageService.get(LOCAL_STORAGE.ROLE))

  return (
    <PageProvider>
      <FormProvider>
        <FilterProvider>
          <Header />

          {hasNavbar(location.pathname) && (
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
                  <Route path={ROUTES.PRIVACY_AND_POLICY} element={<PrivacyAndPolicy />} />
                  <Route path={ROUTES.TERMS_AND_CONDITIONS} element={<TermsAndConditions />} />
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
                  <Route path={ROUTES.MY_ACCOUNT} element={ storageService.get(LOCAL_STORAGE.ROLE) === 'ROLE_ADMIN' ? <MyAccountAdmin/> : <MyAccount />} />
                  <Route path={`${ROUTES.MY_ACCOUNT}${ROUTES.ADD_PRODUCT}`} element={<AddItem />} />
                  <Route path={ROUTES.SHOP} element={<Shop />} />
                  <Route path={`/:productId${ROUTES.PAY}`} element={<Payment />} />
                  <Route path='*' element={<Error />} />
                </Routes>
              </main>
            </>
          </div>
          <Footer />
        </FilterProvider>
      </FormProvider>
    </PageProvider>
  );
};

export default App;
