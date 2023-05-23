import style from './SearchBar.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeQuery } from '../../Redux/actions';


export default function SearchBar({setCurrentPage}) {
    const [search, setSearch] = useState("")
    const changeHandler = (event) => {
      const {value} = event.target; 
      setSearch(value);
    }

    const dispatch = useDispatch();
    
    const onSearch = (event) => {
        event.preventDefault()
        if(!search){
            return;
        }
        if(!/^[a-zA-Z ]+$/.test(search)){
            alert("Letters Only")
            setSearch("")
        }else{
            dispatch(getRecipeQuery(search))
            setSearch("")
            setCurrentPage(1)
        }
    };

    return(
        <div>
            <form>
                <button className={style.searchButton} onClick={onSearch}>Recipe finder</button>
                <input type='search' placeholder='Search by name' className={style.searchInput} onChange={changeHandler}/>
            </form>
        </div>
    )
}  
