import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/RootDrawerNav';
import Auth from './screens/AuthStackNav';

const AuthContext = React.createContext({
  user: null,
  setUser: null,
  properties: [],
  setProperties: null,
});

const properties = require('./data/properties.json');
export default function App() {
  const [user, setUser] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  useEffect(() => {
    setProperties(properties);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: user, setUser: setUser, properties, setProperties }}
    >
      <NavigationContainer>{!user ? <Auth /> : <Home />}</NavigationContainer>
    </AuthContext.Provider>
  );
}

export { AuthContext };
