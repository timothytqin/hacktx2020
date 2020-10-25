import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/HomeStackNav';
import Auth from './screens/AuthStackNav';

const AuthContext = React.createContext({ user: null, setUser: null });
export default function App() {
  const [user, setUser] = React.useState(null);
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <NavigationContainer>{!user ? <Auth /> : <Home />}</NavigationContainer>
    </AuthContext.Provider>
  );
}

export { AuthContext };
