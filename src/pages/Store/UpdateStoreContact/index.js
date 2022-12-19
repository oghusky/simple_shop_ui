import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StoreAPI } from '../../../API/StoreAPI'
import Forms from '../../../components/Forms'
import Buttons from 'react-bootstrap/Button'
import TextInputs from '../../../components/TextInputs'

export default function UpdateStoreContact() {
    const params = useParams();
    const { storeId } = params;
    const [store, setStore] = useState({
        email: "",
        phone: "",
        street: "",
        suite: "",
        city: "",
        state: "",
        zip: "",
        country: "",
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
            <Forms formTitle={"Update Store Info"}>
                <TextInputs
                    name={"phone"}
                    label={"Phone"}
                    value={store.phone}
                    placeholder={store.phone ? store.phone : "555-555-5555"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"street"}
                    label={"Street Address"}
                    value={store.street}
                    placeholder={store.street ? store.street : "123 Main St"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"suite"}
                    label={"Suite #"}
                    value={store.suite}
                    placeholder={store.suite ? store.suite : "Suite 5"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"city"}
                    label={"City"}
                    value={store.city}
                    placeholder={store.city ? store.city : "Toledo"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"state"}
                    label={"State"}
                    value={store.state}
                    placeholder={store.state ? store.state : "Ohio"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"zip"}
                    label={"Zip"}
                    value={store.zip}
                    placeholder={store.zip ? store.zip : "43605"}
                    onChange={handleChange}
                    type={"text"}
                />
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Update Store</Buttons>
            </Forms>
        </div>
    )
}
