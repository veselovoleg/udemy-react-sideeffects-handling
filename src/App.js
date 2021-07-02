import React from 'react';
import { AuthContext } from './store/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const context = React.useContext(AuthContext);

  return (
    <>
      <MainHeader onLogout={context.onLogout} />
      <main>
        {!context.isLoggedIn && <Login/>}
        {context.isLoggedIn && <Home/>}
      </main>
    </>
  );
}

export default App;
