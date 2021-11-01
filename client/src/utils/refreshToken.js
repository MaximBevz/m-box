import constants from "../constants/constants";

const fetchRefresh = {
    sendRefreshToken: async  (token) => {

        const res = await fetch(`${constants.BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            }
        })
            .then(data => data.json())
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        return res;
    }
}

export default fetchRefresh;