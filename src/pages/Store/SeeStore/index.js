// this page is only used to send users to /store/safe/:storeName
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'
export default function SeeStore() {
    const params = useParams();
    const history = useHistory();
    const { storeId } = params;
    useEffect(() => {
        getStoreInfo(storeId);
    }, [storeId])
    const getStoreInfo = async (id) => {
        try {
            const res = await StoreAPI.getById(id);
            if (res.status === 200) {
                const { urlName } = res.data.store
                history.push(`/store/safe/${urlName}`)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='container'>
        </div>
    )
}
