import { useState } from "react";
import searchIcon from "../icons/search.png"
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchClicked, setIsSearchClicked] = useState(false)

    const handleChange = (event) => {
        const query = event.target.value

        setSearchQuery(query)
        onSearch(query)
    }

    const handleClick = () => {
        setIsSearchClicked(previous => !previous)
    }

    return (
        <div className="SearchBar">
            <img src={searchIcon} alt="Search Icon" className="SearchIcon" onClick={handleClick} />
            {isSearchClicked && ( 
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleChange}
            />
        )}
        </div>
    )
}

export default SearchBar;