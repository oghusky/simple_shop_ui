import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'

export default function SeeStore() {
    const params = useParams();
    const { storeId } = params;
    const [store, setStore] = useState({
        email: "",
        name: "",
        products: []
    });
    useEffect(() => {
        getStoreInfo(storeId);
    }, [])
    const getStoreInfo = async (id) => {
        try {
            const res = await StoreAPI.getById(id);
            if (res.status === 201) {
                const { email, name, products } = res.data.store
                setStore({ email, name, products })
            }
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>SeeStore</div>
    )
}
