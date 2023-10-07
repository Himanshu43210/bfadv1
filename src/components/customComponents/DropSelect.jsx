// import { Button } from '@mui/material';
import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';

const DropSelect = ({
    component,
    values,
    onSubmit
}) => {
    const [modified, setModified] = useState(false);
    const [selections, setSelections] = useState([]);
    const [popupState, setPopupState] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (typeof values === "string") {
            setSelections([values]);
        } else if (typeof values === "object") {
            setSelections([...values]);
        }
    }, []);

    const debounceSearch = () => {

    };

    const handleChange = (option) => {
        if (selections.includes(option.value)) {
            setSelections(selections.filter(selection => selection !== option.value));
            setModified(true);
        } else {
            setSelections([...selections, option.value]);
            setModified(true);
        }
    };

    const handleSubmit = () => {
        if (popupState) {
            if (modified) {
                console.log('=========== HANDLE SUBMIT ============', component.name, selections);
                onSubmit(selections);
                setModified(false);
            }
            setPopupState(false);
        } else {
            setPopupState(true);
        }
    };

    const handleSearch = (e) => {
        if (!e.target.value || e.target.value === "") {
            setShowSearchResults(false);
            setSearchResults([]);
        } else {
            setShowSearchResults(true);
            const filteredOptions = component.options.filter(option => (option.value.toLowerCase().includes(e.target.value.toLowerCase()) || option.label.toLowerCase().includes(e.target.value.toLowerCase()))) || [];
            setSearchResults(filteredOptions);
        }
    };

    return (
        <div
            className={`drop_select_wrapper ${component?.className}`}
            onMouseLeave={() => {
                if (popupState) {
                    handleSubmit();
                }
            }}
        >
            <MuiButton
                className={`select_btn ${selections.length > 0 ? "active_filter" : "inactive_filter"}`}
                onClick={handleSubmit}
            >
                <span className='select_label'>{component?.label}{selections.length ? `(${selections.length})` : ''}</span>
                <ExpandMoreIcon className='expand_icon' />
            </MuiButton>
            {popupState && (
                <div className='dd_popup'>
                    {component.options.length > 10 && (
                        <div className='dd_search_box'>
                            <SearchIcon className='search_icon' />
                            <input type="text" className='dd_search_input' name={component.name} onInput={handleSearch} autoComplete="off" />
                        </div>
                    )}
                    {
                        showSearchResults ? (
                            searchResults?.map((option) => (
                                <div
                                    className='dd_item'
                                    onClick={() => handleChange(option)}
                                >
                                    <span className='dd_item_label'>{option.label}</span>
                                    {selections.includes(option.value) && <CheckIcon className='dd_item_check' />}
                                </div>
                            ))
                        ) : (
                            component?.options.map((option) => (
                                <div
                                    className='dd_item'
                                    onClick={() => handleChange(option)}
                                >
                                    <span className='dd_item_label'>{option.label}</span>
                                    {selections.includes(option.value) && <CheckIcon className='dd_item_check' />}
                                </div>
                            ))
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default DropSelect;