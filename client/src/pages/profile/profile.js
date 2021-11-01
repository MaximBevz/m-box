import {useState, useEffect} from 'react';
import fetchRequests from '../../utils/fetchRequest';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import fetchRefresh from "../../utils/refreshToken";
import {setAuthUser} from "../../redux";

import './profile.scss';

export default function Profile() {

    const location = useLocation();
    const dispatch = useDispatch();

    const id = location.pathname.split('/').pop();

    const [wishFilms, setWishFilms] = useState([]);
    const [newFilm, setNewFilm] = useState('');
    const {isAuth} = useSelector(({authUser}) => authUser);

    useEffect(async () => {
        const films = await fetchRequests.getWishList(id, isAuth);
        if (films.length > 0) {
            setWishFilms(films);
        }
        localStorage.setItem('wishFilms', JSON.stringify(films));
    }, []);

    const saveFilm = async (e) => {
        e.preventDefault();

        const film = {filmName: newFilm, isWatched: false};

        const newFilms = await fetchRequests.addToWishList(id, film, isAuth);

        setWishFilms([...wishFilms, newFilms]);

        localStorage.setItem('wishFilms', JSON.stringify(newFilms));

        setNewFilm('');
    };

    const removeFilm = async (filmId) => {
        await fetchRequests.removeFromWishList(id, filmId, isAuth);

        const films = wishFilms.filter(item => item._id !== filmId);
        localStorage.setItem('wishFilms', JSON.stringify(films));
        setWishFilms(films);
    }

    const toggleWatched = async (filmId) => {
        // const res = await fetchRefresh.sendRefreshToken(isAuth.refreshToken);
        // dispatch(setAuthUser(res));


        let updatedFilm = wishFilms.find(item => item._id === filmId);
        updatedFilm = {...updatedFilm, isWatched: !updatedFilm.isWatched};

        await fetchRequests.updateFilmInWishList(id, updatedFilm, isAuth);

        const newFilms = wishFilms.map(item => {
            if(item._id === filmId) {
               return updatedFilm;
            }
            return item
        });

        setWishFilms(newFilms);
    }

    return (
        <div className='profile'>
            <div className="container">
                <h2 className="profile-title">My wish list:</h2>
                <ul className="profile-list">
                    {
                        wishFilms.length ? (
                            wishFilms.map(film =>
                            <li className={film.isWatched ? 'profile-film watched' : "profile-film"} key={film._id}>
                                <h4 className="profile-film-name" onClick={() => toggleWatched(film._id)}>{film.filmName}</h4>
                                <div className="profile-film-wrapper">
                                    {
                                        film.isWatched && <span>&#10003;</span>
                                    }
                                    <div className="profile-film-delete" onClick={() => removeFilm(film._id)}>remove</div>
                                </div>
                            </li>
                            )
                        ) : (
                            <div className='profile-empty'>
                                Your wish list is empty...
                            </div>
                        )
                    }
                </ul>
                <form className="profile-form"  onSubmit={saveFilm}>
                    <input type="text" className="profile-form-input" placeholder='Add to wish list' value={newFilm} onInput={(e) => setNewFilm(e.target.value)}/>
                    <input type="submit" className="profile-form-submit btn" value='add'/>
                </form>
            </div>
        </div>
    );
}
