import React, { useState, useEffect, useContext, useCallback } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import history from '../utils/history';

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [auth0user, setAuth0user] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        redirect_uri: window.location.origin,
        audience: 'https://dev-mxz0v43z.auth0.com/api/v2/',
        onRedirectCallback
      });
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const authUser = await auth0FromHook.getUser();
        setAuth0user(authUser);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const authenticatedFetch = useCallback(
    async (endpoint, { body, ...customConfig } = {}) => {
      const accessToken = await auth0Client.getTokenSilently();

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'user-id': auth0user.sub
      };
      const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
          ...headers,
          ...customConfig.headers
        }
      };
      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}/${endpoint}`,
        config
      );

      let data = null;
      try {
        data = await response.json();
      } catch (err) {}

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    },
    [auth0user, auth0Client]
  );

  useEffect(() => {
    const loginToBackend = async () => {
      try {
        const namespace = 'https://projectincubator.com/';
        const sendUser = {
          id_token: auth0user.sub,
          first_name: auth0user[namespace + 'first_name'],
          last_name: auth0user[namespace + 'last_name'],
          email: auth0user.email
        };

        const data = await authenticatedFetch('users', {
          body: sendUser,
          method: 'POST'
        });

        const newUser = { ...data, id_token: auth0user.sub };
        console.log(newUser);
        setUser(newUser);
      } catch (e) {
        console.log('ERROR:', e);
      }
    };

    if (isAuthenticated && auth0user) {
      loginToBackend();
    }
  }, [auth0user, isAuthenticated, authenticatedFetch, setUser]);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setAuth0user(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setAuth0user(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
        authenticatedFetch,
        setUser
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
