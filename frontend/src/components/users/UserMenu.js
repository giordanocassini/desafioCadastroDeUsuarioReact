import useAuth from './hooks/useAuth';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const UserMenu = () => {

    const { auth } = useAuth();

    return (
        <>
            {auth ?
                <section>
                    <h1>Wellcome, {auth.user}</h1>
                    <Logout />
                </section>
                :
                <section>
                    <Link to="/login">
                    <a>Go to login page</a>
                    </Link>
                </section>}
        </>
    )

}

export default UserMenu