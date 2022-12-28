import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI';
import { UserAPI } from '../../../API/UserAPI';
export default function Profile() {
    const [stores, setStores] = useState([]);
    const [myInfo, setMyInfo] = useState({});
    const params = useParams();
    const getStoresByUserId = async (id) => {
        try {
            const res = await StoreAPI.getStoresByUserId(id);
            setStores(res.data.stores);
        } catch (err) {
            console.log(err);
        }
    }
    const getMyInfo = async (id) => {
        try {
            const res = await UserAPI.getMyInfo(id);
            console.log(res.data.user)
            setMyInfo(res.data.user)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getStoresByUserId(params.userId);
        getMyInfo(params.userId);
    }, [params])
    const storeList = stores.map(s => (
        <div key={s._id}>
            <p>{s.name} <Link to={`/store/edit/${s._id}`}className='btn btn-sm btn-outline-primary'>Edit Store Information</Link></p>
        </div>
    ))
    const showEditMeButton = myInfo._id === params.userId ? <Link className='btn btn-sm btn-outline-primary' to="/updateme">Edit Your Information</Link> : null
    // const showEditStoreButton = storeList ? <Link className='btn btn-sm btn-outline-primary'>Edit Store Information</Link>:null
    return (
        <div>

            <h5>Your Personal Information  {showEditMeButton}</h5>
            <p>{myInfo.firstName} {myInfo.lastName}</p>
            <p>{myInfo.email}</p>
            {myInfo.address ? <>
                <p>{myInfo.address.street ? myInfo.address.street : null}</p>
                <p>{myInfo.address.suite ? myInfo.address.suite : null}</p>
                <p>{myInfo.address.city ? myInfo.address.city : null}, {myInfo.address.state ? myInfo.address.state : null} {myInfo.address.zip ? myInfo.address.zip : null}</p>
            </> : null}
            {storeList ? <h5>Your Store(s) </h5> : null}
            {storeList}
        </div>
    )
}
