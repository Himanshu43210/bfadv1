import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SearchBar = ({ component, onSubmit }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleReset = () => {
        setValue("");
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('====== SEARCH QUERY ======', value);
    };

    return (
        <div className={`search_bar_wrapper ${component?.containerClass}`}>
            <form className={`search_form ${component?.formClass}`} onSubmit={handleOnSubmit}>
                <div className='input_wrapper'>
                    <input type="text" className={`search_input ${component?.inputClass}`} placeholder='Search' spellCheck={false} value={value} onChange={handleChange} />
                </div>
                {value !== "" && (
                    <button className={`search_btn search_clear_btn ${component?.searchBtnClass} ${component?.crossBtnClass}`} type='reset' onClick={handleReset}>
                        <CloseRoundedIcon className='btn_icon search_clear_icon' />
                    </button>
                )}
                <button className={`search_btn search_submit_btn ${component?.searchBtnClass} ${component?.searchSubmitClass}`} type='submit'>
                    <SearchRoundedIcon className='btn_icon search_icon' />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;