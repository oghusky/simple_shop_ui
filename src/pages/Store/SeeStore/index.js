import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'
import { ImageAPI } from '../../../API/ImageAPI';
import ProductCard from '../../../components/ProductCard';
export default function SeeStore() {
    const params = useParams();
    const { storeId } = params;
    const [images, setImages] = useState([])
    const [store, setStore] = useState({
        email: "",
        name: "",
        products: []
    });
    useEffect(() => {
        getStoreInfo(storeId);
        getImageInfo(storeId);
    }, [storeId])
    const getStoreInfo = async (id) => {
        try {
            const res = await StoreAPI.getById(id);
            if (res.status === 200) {
                const { email, name, products } = res.data.store
                setStore({ email, name, products })
            }
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    const getImageInfo = async (id) => {
        try {
            const res = await ImageAPI.getImagesByStoreId(id);
            if (res.status === 200) {
                console.log(res.data);
                setImages(res.data.images)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const productList = store.products.map(p => <ProductCard images={images} p={p} />)
    return (
        <div className='container'>
            <h1 className='text-center'>{store?.name}</h1>
            <div className='row'>
                {productList}
            </div>
        </div>
    )
}
