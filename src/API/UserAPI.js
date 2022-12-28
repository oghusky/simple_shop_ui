import axios from "axios";
import authHeader from '../utils/authHeader'
const token = localStorage.getItem("ShopEZToken");
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
    },
    update: async(id,updateUser)=>{
        try{
            return axios.put(`/user/id/${id}`,updateUser, authHeader(token));
        }catch(err){
            console.log(err);
        }
    },
    getMyInfo: async(id)=>{
        try{
            return axios.get(`/user/id/${id}`, authHeader(token));
        }catch(err){
            console.log(err)
        }
    },
    delete: async(userId)=>{}
}