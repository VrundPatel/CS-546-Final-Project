import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function getAuthData() {
      const { data } = await axios.get("http://localhost:9000/users/auth-check");
      return !!data;
    }
    setAuthenticated(getAuthData());

  }, []);

  function setAuth(state) { setAuthenticated(state) }

  return { isAuthenticated, setAuth };
}