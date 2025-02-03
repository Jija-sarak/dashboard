import React from "react";


export function useAuth() {
  const temp = JSON.parse(localStorage.getItem("session")) || null;
  const [session, setSession] = React.useState({
    user: temp
  });

  const authentication = React.useMemo(() => ({
    signIn: (user) => {
      localStorage.setItem("session", JSON.stringify(user));
      setSession({
        user: user,
      });
    },
    signOut: () => {
      localStorage.removeItem("session");
      setSession({ user: null })
    },
  }), []);

  return { session, authentication };
}
