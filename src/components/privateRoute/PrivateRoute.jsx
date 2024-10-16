
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const userId = Cookies.get('userId')

    return userId ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute