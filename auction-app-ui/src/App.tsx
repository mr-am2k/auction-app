import {
  PrivacyAndPolicy,
  TermsAndConditions,
  AboutUs,
  Home,
  SingleProduct,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import ROUTES from './util/routes';
import { PageProvider, UserProvider } from 'store/index';

import { Navbar, Header, Footer, NavbarTracker } from './layouts';
import './app.scss';

const App = () => {
  return (
    <PageProvider>
      <UserProvider>

        <Header />
        <Navbar />
        <NavbarTracker />
        
        <div className='c-page-wrapper'>
          <Routes>
            <Route
              path='/*'
              element={
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
                      <Route path='/shop/:id' element={<SingleProduct />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </PageProvider>
  );
};

export default App;
