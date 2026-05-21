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
  const login = ({ user, token }) => {

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  setUser(user);

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