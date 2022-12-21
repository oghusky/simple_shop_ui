import { useState } from 'react'
import Selects from '../Selects';
import { SearchAPI } from '../../API/SearchAPI';
export default function SearchBar() {
    const [search, setSearch] = useState({
        term: "",
        category: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value });
    }
    const handleSearch = async() => {
        try{
            const res = await SearchAPI.searches(search);
            console.log(res);
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <Selects onChange={handleChange} value={search.category} name={"category"}>
                <option value={"products"}>Products</option>
                <option value={"stores"}>Stores</option>
            </Selects>
            <input
                name={"term"}
                value={search.term}
                placeholder={"Enter search term"}
                onChange={handleChange}
                type={"text"}
            />
            <button onClick={handleSearch}>&#x1F50E;</button>
        </div>
    )
}
