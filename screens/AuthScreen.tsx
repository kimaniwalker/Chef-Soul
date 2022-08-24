import React from 'react'
import Auth from '../components/Auth'
import { useUserContext } from '../context/user'

export default function AuthScreen() {

    const { setIsAuthenticated } = useUserContext()


    return (
        <>
            <Auth setIsAuthenticated={setIsAuthenticated} />
        </>
    )
}
