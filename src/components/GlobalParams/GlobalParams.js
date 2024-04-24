import React, {useState, useMemo, useContext} from 'react'

export const userContext = React.createContext();

export const getState = () => {
    return useContext(userContext); 
}

const GlobalParams = ({children}) => {

    const [userParams, setUserParams] = useState({
        'cart': {},
        'user': {},
    });

    const valueProvider = useMemo(() => ({userParams, setUserParams}), [userParams, setUserParams]);
  return (
    <userContext.Provider value={valueProvider}>
        {children}
    </userContext.Provider>
  )
}

export default GlobalParams