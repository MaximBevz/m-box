import constants from "../constants/constants";

const fetchRequests = {
    getWishList: async (id, token) => {
        return await fetch(`${constants.BASE_URL}/user/${id}`)
            .then(data => data.json());
    },

    signUpUser: async (data) => {
        return await fetch(`${constants.BASE_URL}/auth/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
    },

    signInUser: async (data) => {
        return await fetch(`${constants.BASE_URL}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
    },

    logOutUser: async (token) => {
        return await fetch(`${constants.BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token.accessToken
            }
        })
            .then(data => data)
    },

    addToWishList: async (id, data, token) => {
        return await fetch(`${constants.BASE_URL}/user/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token.accessToken
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json());
    },

   removeFromWishList: async (id, data, token) => {
        return await fetch(`${constants.BASE_URL}/user/${id}/films/${data}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token.accessToken
            }
        })
           .then(data => data);
    },

    updateFilmInWishList: async (id, data, token) => {

        return await fetch(`${constants.BASE_URL}/user/${id}/films/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token.accessToken
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
    }
}

export default fetchRequests;

