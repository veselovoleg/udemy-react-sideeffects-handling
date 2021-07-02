import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  // Dummy functions for IDE to show this method is suggestions
  onLogout: () => {},
  onLogin: () => {}
});

const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('userLogedIn') === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userLogedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem('userLogedIn', '1');
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, AuthContext };