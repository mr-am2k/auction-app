import { PrivacyAndPolicy, TermsAndConditions, AboutUs } from './pages';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './util/routes';

import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import './app.scss';

const App = () => {
  return (
    <div className='c-page-wrapper'>
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <Header />
              <Navbar />
              <NavbarTracker />
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
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
