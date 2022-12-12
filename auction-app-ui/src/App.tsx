import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useUser } from 'hooks/useUser';

import { PageProvider} from 'store/index';

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

// TODO: used for testing, will be removed when we create real users
const USER_ID_1 = '94dd5b8d-49eb-4c92-827f-022a2dfb868f';

const USER_ID_2 = '16065605-eca3-4d16-8eb0-93368fbf5841';

const USER_ID_3 = '20171418-8bde-47a3-82a8-39cfa643afd7';

const App = () => {
  const { setLoggedInUser } = useUser();

  //used for demonstration, because user login/registration is not yet implemented
  useEffect(() => {
    setLoggedInUser({
      id: USER_ID_1,
      name: 'Muamer',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageProvider>
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
    </PageProvider>
  );
};

export default App;
