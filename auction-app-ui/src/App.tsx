import { Navbar, Header, Footer } from './layouts';
import { PrivacyAndPolicy, TermsAndConditions, AboutUs } from './pages';
import { Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.pageWrapper}>
      <Routes>
        <Route
          path='/*'
          element={
            <>
              <header>
                <Header />
                <Navbar />
              </header>
              <main>
                <Routes>
                  <Route
                    path='/privacy-and-policy'
                    element={<PrivacyAndPolicy />}
                  />
                  <Route
                    path='/terms-and-conditions'
                    element={<TermsAndConditions />}
                  />
                  <Route path='/about-us' element={<AboutUs />} />
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
