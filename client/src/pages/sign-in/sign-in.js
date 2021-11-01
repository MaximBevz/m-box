import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAuthUser} from "../../redux";
import { Link, useHistory } from 'react-router-dom';
import fetchRequests from '../../utils/fetchRequest';
import './sing-in.scss';

export default function SignIn() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [logInData, setLoginData] = useState({email:'', password: ''});
    const [errorRequest, setErrorRequest] = useState('');

    const loginHandler = (e) => {
        const {name, value} = e.target;
        setLoginData({...logInData, [name]:value});
    }
    const handleSubmit = async e => {
        e.preventDefault();

        const req = await fetchRequests.signInUser(logInData);

        localStorage.setItem('user', JSON.stringify(req));

        if(req.message) {
            setErrorRequest(req.message);
        } else {
            dispatch(setAuthUser(req));
            history.push(`/user/${req.user._id}`);
        }
    }

    return (
        <form className='sign-in-form' onSubmit={handleSubmit}>
            <input type="text" className="sign-in-name" placeholder='email' name='email' required value={logInData.email} onChange={loginHandler}/>
            <input type="text" className="sign-in-password" placeholder='password' name='password' required value={logInData.password} onChange={loginHandler}/>
            <input type="submit" className="sign-in-submit" value='login'/>
            <div className="sign-in-register">
                You can register <Link to={'/auth/sign-up'}>here</Link>
            </div>
            {
                errorRequest && <div className='sign-in-error'>{errorRequest}</div>
            }
        </form>
    );
}