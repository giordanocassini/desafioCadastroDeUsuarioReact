import useAuth from './hooks/useAuth';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const UserMenu = () => {

    const { auth } = useAuth();

    useEffect(() => {
        console.log(auth?.user);
    }, [])

    return (
        <>
            {auth?.user ?
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