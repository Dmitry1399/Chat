import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from '../../hooks/useLocalStorage';
import { setUserData } from '../../store/slices/auth';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const token = useLocalStorage('get')('token');
  const clearLocaleStorage = useLocalStorage('clear');
  const [isAuthed, setAuthentication] = useState(!!token);
  const dispatch = useDispatch();

  const setAuth = useCallback((status) => setAuthentication(status), []);
  const logOut = useCallback(() => {
    clearLocaleStorage();
    setAuth(false);
    dispatch(setUserData({ token: null, username: null }));
  }, [setAuth, dispatch, clearLocaleStorage]);

  const contextValue = useMemo(() => ({ isAuthed, setAuth, logOut }), [isAuthed, setAuth, logOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
