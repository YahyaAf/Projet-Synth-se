import { useContext } from "react"
import { AuthAdminContext } from "../context/AuthAdminContext"

export default function useAuthAdminContext() {
    const context = useContext(AuthAdminContext)

    if(!context) {
        throw Error("useAuthContext must be used an AuthContextProvider")
    }
    return context
}   
