import axios from 'axios';
const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
// axios.defaults.headers.common['Content-Type'] = 'application/json';
/*
    route expects: {
        file: image, 
        bucketName: storeName/productName, 
        forModel:["store", "product"], 
        modelId: storeId/productId, 
        imageType: ["logo <storeLogo>", "banner <storeBanner>", "product <productimg>x"]
    } 
*/
export const ImageAPI = {
    createStoreImage: async (data) => {
        try {
            const { file, name, _id, imageType } = data;
            console.log(data);
            let formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("bucketName", name);
            formData.append("forModel", "store");
            formData.append("modelId", _id);
            formData.append("imageType", imageType);
            return axios.post('/image', formData, headers);
        } catch (err) {
            console.log(err);
        }
    },
    createItemImage: async (data) => {
        try {
            const { file, storeName, storeId, productId, imageType } = data
            let formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("bucketName", storeName);
            formData.append("forModel", "product");
            formData.append("modelId", productId);
            formData.append("storeId", storeId);
            formData.append("imageType", imageType);
            return axios.post('/image/item', formData, headers);
        } catch (err) {
            console.log(err)
        }
    }
}