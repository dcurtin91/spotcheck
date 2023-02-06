import './App.css';
import { accessToken, logout } from './spotify';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { Login } from './Pages';
import Functions from './Functions';

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);


  useEffect(() => {
    setToken(accessToken);


  }, []);
  return (
    <div>

      {!token ? (
        <Login />
      ) : (
        <>
          <button onClick={logout}>Log Out</button>


          <Router>
            <ScrollToTop />
            <Routes>



              <Route path="/" element={<Functions />} />


            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
