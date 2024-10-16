import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function PrivateRoute() {

    const navigate = useNavigate()
    const user_id = useSelector((state) =>  state.user.userId)
    useEffect(() => {
        if (!user_id) {
            navigate("/"); // Redirect to home if userId is not found
        }
    }, [user_id, navigate]);

    return user_id ? <Outlet/> : null
    
}

export default PrivateRoute
