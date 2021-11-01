import fetchRequests from '../../utils/fetchRequest';
import {Link, useHistory} from 'react-router-dom';

import './cabinet.scss';
import {useDispatch, useSelector} from "react-redux";
import {setAuthUser} from "../../redux";

export default function Cabinet() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(({authUser}) => authUser);

    const logOut = async () => {
        await fetchRequests.logOutUser(isAuth);
        localStorage.clear();
        dispatch(setAuthUser(false));
        history.push('/');
    }

    return (
        <div className='cabinet'>

            {
                !isAuth ? (
                    <>
                        <Link className='cabinet-btn btn' to={'/auth/sign-in'}>login</Link>
                        <Link className='cabinet-btn btn' to={'/auth/sign-up'}>register</Link>
                    </>
                ) : (
                    <>
                        <button className='cabinet-btn btn' onClick={logOut}>logout</button>
                        <Link className="cabinet-btn btn" to={`/user/${isAuth.user?._id}`}>cabinet</Link>
                    </>
                )
            }

        </div>
    );
}