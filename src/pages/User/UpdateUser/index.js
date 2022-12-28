import { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../../store"
import Forms from "../../../components/Forms";
import TextInputs from "../../../components/TextInputs";
import Buttons from "../../../components/Buttons";
import { UserAPI } from "../../../API/UserAPI";

export default function UpdateUser() {
    const history = useHistory();
    const { user } = useContext(AppContext);
    const [update, setUpdate] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        addressStreet: "",
        addressSuite: "",
        addressCity: "",
        addressState: "",
        addressZip: "",
        addressCountry: ""
    });
    useEffect(() => {
        if (user) setUpdate(user)
    }, [user]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdate({ ...update, [name]: value })
    }
    const handleSubmit = async () => {
        try {
            const data = {
                firstName: update.firstName,
                lastName: update.lastName,
                phone: update.phone,
                street: update.addressStreet,
                suite: update.addressSuite,
                city: update.addressCity,
                state: update.addressState,
                zip: +update.addressZip,
                country: update.addressCountry
            }
            const res = await UserAPI.update(user._id, data)
            if (res.status === 200) {
                const userInfo = {
                    email: res.data.updatedUser.email,
                    firstName: res.data.updatedUser.firstName,
                    lastName: res.data.updatedUser.lastName,
                    _id: res.data.updatedUser._id,
                    userType: res.data.updatedUser.userType,

                }
                localStorage.setItem("ShopEZToken", JSON.stringify(res.data.token))
                localStorage.setItem("ShopEZUser", JSON.stringify(userInfo))
                history.push(`/profile/${res.data.updatedUser._id}`)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Forms formTitle={"Update Your Information"}>
                <TextInputs
                    name={"firstName"}
                    label={"First Name *"}
                    value={update.firstName}
                    placeholder={update.firstName}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"lastName"}
                    label={"Last Name *"}
                    value={update.lastName}
                    placeholder={update.lastName}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"phone"}
                    label={"Phone Number"}
                    value={update.phone}
                    placeholder={"555-555-5555"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressStreet"}
                    label={"Street Address"}
                    value={update.addressStreet}
                    placeholder={"123 Main St."}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressSuite"}
                    label={"Suite #"}
                    value={update.addressSuite}
                    placeholder={"Suite 5"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressCity"}
                    label={"City"}
                    value={update.addressCity}
                    placeholder={"Toledo"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressState"}
                    label={"State"}
                    value={update.addressState}
                    placeholder={"Ohio"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressZip"}
                    label={"Zip Code"}
                    value={update.addressZip}
                    placeholder={"43605"}
                    onChange={handleChange}
                    type={"text"}
                />
                <TextInputs
                    name={"addressCountry"}
                    label={"Country"}
                    value={update.addressCountry}
                    placeholder={"United States"}
                    onChange={handleChange}
                    type={"text"}
                />
                <Buttons onClick={handleSubmit} text={"Update"} cssClass={"btn btn-info btn-sm"} />
            </Forms>
        </div>
    )
}
