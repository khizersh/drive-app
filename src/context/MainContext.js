import React, { useContext } from "react";

export const MainContext = React.createContext(null);

export default function MainProvider({ children }) {
  const [mainState, setMainState] = React.useState({
    isLoading: false,
  });

//   React.useEffect(async () => {}, []);

  function setLoading(loading) {
    let stateClone = mainState;
    setMainState({
      ...stateClone,
      isLoading: loading,
    });
  }

  let data = {
    mainState,
    setLoading,
  };
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
}
