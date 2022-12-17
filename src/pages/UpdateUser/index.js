import { useState, useEffect, useContext } from "react"
import { AppContext } from "../../store"
import Forms from "../../components/Forms";
import TextInputs from "../../components/TextInputs";
import Buttons from "../../components/Buttons";
import { UserAPI } from "../../API/UserAPI"
export default function UpdateUser() {
    const { user, setUser, setToken } = useContext(AppContext);
    const [update, setUpdate] = useState({
        email: "",
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
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdate({ ...update, [name]: value })
    }
    const handleSubmit = async () => {
        try {
            const data = {
                email: update.email,
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
                    email: res.data.user.email,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    _id: res.data.user._id,
                    userType: res.data.user.userType,

                }
                localStorage.setItem("ShopEZToken", JSON.stringify(res.data.token))
                localStorage.setItem("ShopEZUser", JSON.stringify(userInfo))
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Forms>
                <TextInputs
                    name={"email"}
                    label={"Email *"}
                    value={update.email}
                    placeholder={update.email}
                    onChange={handleChange}
                    type={"email"}
                />
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
                <Buttons onClick={handleSubmit} text={"Sign Up"} cssClass={"btn btn-primary btn-sm"} />
            </Forms>
        </div>
    )
}
