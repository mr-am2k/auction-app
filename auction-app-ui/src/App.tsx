import { Navbar, Header, Footer } from './layouts';
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
                <p>Main content</p>
                {/*Here will be defined all other routes*/}
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
