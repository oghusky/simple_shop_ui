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
        twitter: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        policies: "",
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
            <h3>Store Contact Information</h3>
            <hr />
            <Forms formTitle={"Store Info"}>
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
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Update</Buttons>
            </Forms>
            <h3>Store Socials</h3>
            <hr />
            <Forms formTitle={"Store Socials"}>
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
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Update</Buttons>
            </Forms>
            <Forms formTitle={"Store Policy"}>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Store Policy</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        name={"policies"}
                        value={store.policies}
                        onChange={handleChange}
                        type={"text"}></textarea>
                </div>
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"}>Update</Buttons>
            </Forms>
        </div>
    )
}
