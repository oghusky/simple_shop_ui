import axios from "axios";
import authHeader from '../utils/authHeader'
const token = localStorage.getItem("ShopEZToken");
export const ProductAPI = {
    create:async(storeId, data)=>{
        try{
            return axios.post(`/product/store/${storeId}`,data, authHeader(token))
        }catch(err){
            console.log(err);
        }
    }
}