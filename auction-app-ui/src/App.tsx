import { Routes, Route, useLocation } from 'react-router-dom';


import { PageProvider } from 'store/index';

import {
  PrivacyAndPolicy,
  TermsAndConditions,
  AboutUs,
  Home,
  SingleProduct,
  Register,
  Login,
} from './pages';
import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import ROUTES from './util/routes';

import './app.scss';

const App = () => {
  const location = useLocation();
  return (
    <PageProvider>
      <Header />
      
      {location.pathname !== `/${ROUTES.REGISTER}` &&
        location.pathname !== `/${ROUTES.LOGIN}` && (
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
            </Routes>
          </main>
        </>
      </div>
      <Footer />
    </PageProvider>
  );
};

export default App;
