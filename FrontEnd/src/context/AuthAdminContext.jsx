import  { createContext, useEffect, useReducer } from 'react';

export const AuthAdminContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { admin: action.payload };
        case 'LOGOUT':
            return { admin: null };
        default:
            return state;
    }
};

export const AuthAdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        admin: null
    });

    useEffect(() => {
        const checkAdmin = () => {
            const admin = JSON.parse(localStorage.getItem('auth_token'));
            if (admin) {
                dispatch({ type: "LOGIN", payload: admin });
            } else {
                dispatch({ type: "LOGOUT" });
            }
        };
        checkAdmin(); // Check user on initial load
    }, []);

    return (
        <AuthAdminContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthAdminContext.Provider>
    );
};
