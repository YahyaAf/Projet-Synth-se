import { useState } from "react"
import useAuthContext from "./useAuthContext"

export default function useSignup() {
    const [isLoading,setIsLoading] =useState(false)
    const [error,setError] =useState(false)
    const {dispatch} =useAuthContext()


    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch('http://127.0.0.1:8000/api/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "nom": username, "email": email, "mot_de_passe": password })
        });
    
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            console.log(json.error); // Use json.error instead of error here
        } else {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // Update the auth context
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    }
    
    return {signup,isLoading,error}
}
