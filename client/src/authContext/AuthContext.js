import AuthReducer from "./AuthReducer"
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return <AuthContext.Provider
        value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
        {children}
    </AuthContext.Provider>
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTEzZDA2MTkyZjIxNjE1YzQ0Y2E4OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzI3MTU3MzgsImV4cCI6MTYzMzE0NzczOH0.6od3Q8zQcdyqI5afiQTdH8cqn422yvVwji0fXftfYTs