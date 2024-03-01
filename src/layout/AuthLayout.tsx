import React from 'react'

export const AuthLayout = () => {
    const { isAuthenticated } = useUserContext();

    return (
        <div>
            {
                isAuthenticated ? "" : ""
            }
        </div>
    )
}
