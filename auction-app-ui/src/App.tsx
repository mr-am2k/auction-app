import { PrivacyAndPolicy, TermsAndConditions, AboutUs } from './pages';
import { Routes, Route } from 'react-router-dom';
import routes from './util/routes';

import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import './app.scss'

const App = () => {
  return (
    <div className='c-page-wrapper'>
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <header>
                <Header />
                <Navbar />
                <NavbarTracker />
              </header>
              <main>
                <Routes>
                  <Route
                    path={routes.PRIVACY_AND_POLICY}
                    element={<PrivacyAndPolicy />}
                  />
                  <Route
                    path={routes.TERMS_AND_CONDITIONS}
                    element={<TermsAndConditions />}
                  />
                  <Route path={routes.ABOUT_US} element={<AboutUs />} />
                </Routes>
              </main>
              <footer>
                <Footer />
              </footer>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
