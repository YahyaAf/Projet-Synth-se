import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null
    });

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                dispatch({ type: "LOGIN", payload: user });
            } else {
                dispatch({ type: "LOGOUT" });
            }
        };

        checkUser(); // Check user on initial load

        // Set an interval to check user periodically
        const intervalId = setInterval(checkUser, 1000); // Check every second

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
};
