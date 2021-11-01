import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {setAuthUser} from "./redux";
import Home from './pages/home/home';
import SingIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sing-up';
import Profile from './pages/profile/profile';
import Movies from './pages/movies/movies';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import MovieItemInfo from './pages/movie-item-info/movie-item-info';
import './App.scss';

function App() {

    const dispatch = useDispatch();
    const {isAuth} = useSelector(({authUser}) => authUser);

    const [theme, setTheme] = useState();
    const activeMode = mode => {
        setTheme(mode);
    };
    useEffect(() => {
        dispatch(setAuthUser(JSON.parse(localStorage.getItem('user'))));
        setTheme(localStorage.getItem('theme'));
    }, []);

    return (
    <div className={theme !== 'light' ? 'App' : 'App light-mode'}>
      <Router>
      <Header activeMode={activeMode}/>
        <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/movies'} render={(props) => <Movies />} />
            <Route exact path={'/movies/:id'} render={() => <MovieItemInfo/>}/>
            <Route exact path={'/auth/sign-in'} component={SingIn} />
            <Route exact path={'/auth/sign-up'} component={SignUp} />

            {
                isAuth && <Route exact path={'/user/:userId'} component={Profile} />
            }
            <Route path={'/*'} component={Home} />
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;







