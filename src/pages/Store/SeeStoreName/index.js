import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'
import { ImageAPI } from '../../../API/ImageAPI';
import ProductCard from '../../../components/ProductCard';
import Hero from '../../../components/Hero';
export default function SeeStoreName() {
    const params = useParams();
    const { storeName } = params;
    const [images, setImages] = useState([])
    const [store, setStore] = useState({
        _id: "",
        email: "",
        name: "",
        urlName: "",
        products: []
    });
    const getStoreInfo = async (name) => {
        try {
            const res = await StoreAPI.getStoreBySafeName(name);
            if (res.status === 200) {
                const { _id, email, name, products, urlName } = res.data.store[0]
                setStore({ _id, email, name, products, urlName })
                getImageInfo(_id)
                console.log(_id)
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getImageInfo = async (id) => {
        try {
            const res = await ImageAPI.getImagesByStoreId(id);
            if (res.status === 200) {
                setImages(res.data.images)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStoreInfo(storeName);
    }, [storeName])
    const productList = store?.products.map(p => <ProductCard key={p._id} images={images} p={p} />).reverse();
    return (
        <div className='container'>
            <Hero name={store.name} urlName={store.urlName} />
            <div className='row no-gutters'>
                {productList}
            </div>
        </div>
    )
}
