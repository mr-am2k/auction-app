import { Routes, Route } from 'react-router-dom';

import { PageProvider, UserProvider } from 'store/index';

import {
  PrivacyAndPolicy,
  TermsAndConditions,
  AboutUs,
  Home,
  SingleProduct,
} from './pages';
import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import ROUTES from './util/routes';

import './app.scss';

const App = () => {
  return (
    <PageProvider>
      <UserProvider>
        <Header />
        <Navbar />
        <NavbarTracker />

        <div className='c-page-wrapper'>
          <>
            <main>
              <Routes>
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
                <Route path={`${ROUTES.PRODUCT}/:id`} element={<SingleProduct />} />
              </Routes>
            </main>
          </>
        </div>
        <Footer />
      </UserProvider>
    </PageProvider>
  );
};

export default App;
