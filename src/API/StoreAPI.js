import axios from "axios";
import authHeader from '../utils/authHeader'
const token = localStorage.getItem("ShopEZToken");
export const StoreAPI = {
    create: async (data) => {
        try {
            return axios.post("/store", data, authHeader(token))
        } catch (err) {
            console.log(err);
        }
    },
    getAll: async () => {
        try {
            return axios.get("/store");
        } catch (err) {
            console.log(err)
        }
    },
    getById: async (id) => {
        try {
            return axios.get(`/store/id/${id}`)
        } catch (err) {
            console.log(err);
        }
    },
    getByName: async (name) => {
        try {
            return axios.get(`/store/name/${name}`);
        } catch (err) { }
    },
    getStoresByUserId: async (userId) => {
        try {
            return axios.get(`/store/user/${userId}`);
        } catch (err) {
            console.log(err);
        }
    },
    update: async (store, id) => {
        try {
            return axios.put(`/store/id/${id}`, store, authHeader(token))
        } catch (err) {
            console.log(err);
        }
    },
    getStoreBySafeName: async(name)=>{
        try{
            return axios.get(`/store/safe/${name}`);
        }catch(err){
            console.log(err);
        }
    }
}