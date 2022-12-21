import axios from "axios";
export const SearchAPI = {
    searches: async (data) => {
        const { term, category } = data;
        try {
            if (category === "products") {
                return axios.get(`/product/name/${term}`);
            }
            if (category === "stores") {
                return axios.get(`/store/name/${term}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
}