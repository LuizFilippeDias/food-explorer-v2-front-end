import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';

export function Routes() {
    const { user, isUserAuthenticated } = useAuth();
    const $Isadmin = user ? user.is_admin : false;

    const userAuthenticated = isUserAuthenticated();

    return (
        <BrowserRouter>
            {(user && userAuthenticated) ? <AppRoutes $Isadmin={$Isadmin} /> : <AuthRoutes />}
        </BrowserRouter>
    );
}