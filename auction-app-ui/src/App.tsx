import { PrivacyAndPolicy, TermsAndConditions, AboutUs, Home } from './pages';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './util/routes';

import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import PageProvider from 'store/PageProvider';
import './app.scss';

const App = () => {
  return (
    <PageProvider>
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
                    <Route path='/' element={<Home/>} />
                  </Routes>
                </main>
                
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </PageProvider>
  );
};

export default App;
