import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'
import Forms from '../../../components/Forms'
import Buttons from 'react-bootstrap/Button'
import TextInputs from '../../../components/TextInputs'

export default function UpdateStoreSocials() {
    const params = useParams();
    const { storeId } = params;
    const [store, setStore] = useState({
        twitter: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        youtube: "",
    });
    useEffect(() => {
        getStoreInfo(storeId);
    }, [storeId])
    const getStoreInfo = async (id) => {
        try {
            const res = await StoreAPI.getById(id);
            if (res.status === 200) {
                const { _id, phone, street, suite, city, state, zip, country } = res.data.store
                setStore({ _id, phone, street, suite, city, state, zip, country })
            }
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStore({ ...store, [name]: value })
    }
    const handleSubmit = async () => {
        const res = await StoreAPI.update(store, store._id);
        console.log(res)
    }
    return (
        <div>
            <Forms formTitle={"Update Store Socials"}>
                <TextInputs
                    name={"twitter"}
                    label={"Twitter tag"}
                    value={store.twitter}
                    placeholder={store.twitter ? store.twitter : "username"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"facebook"}
                    label={"Facebook tag"}
                    value={store.facebook}
                    placeholder={store.facebook ? store.facebook : "username"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"instagram"}
                    label={"Instagram tag"}
                    value={store.instagram}
                    placeholder={store.instagram ? store.instagram : "username"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"tiktok"}
                    label={"Tiktok tag"}
                    value={store.tiktok}
                    placeholder={store.tiktok ? store.tiktok : "username"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"youtube"}
                    label={"Youtube tag"}
                    value={store.youtube}
                    placeholder={store.youtube ? store.youtube : "username"}
                    onChange={handleChange}
                    type={"text"}
                />
                
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Update Store</Buttons>
            </Forms>
        </div>
    )
}
