import axios from "axios";
export const UserAPI = {
    login: async (login) => {
        try {
            return axios.post("/user/login", login)
        } catch (err) {
            console.log(err)
        }
    },
    signup: async (signup) => {
        try {
            return axios.post("/user", signup);
        } catch (err) {
            console.log(err);
        }
    }
}