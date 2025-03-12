import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export default function MyContext(props) {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>
      {props.children}
    </Context.Provider>
  );
}
