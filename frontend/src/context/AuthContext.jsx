import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  // LOAD USER FROM LOCALSTORAGE
  useEffect(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }

  }, []);

  // LOGIN
  const login = (userData) => {

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  localStorage.setItem(
    "token",
    userData.token
  );

  setUser(userData);

};


  // LOGOUT
  const logout = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("token");

  setUser(null);

};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;