import MuiButton from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import CheckIcon from "@mui/icons-material/Check.js";
import SearchIcon from "@mui/icons-material/Search.js";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js";
import { GET } from "../utils/Const.js";
import { useRouter } from "next/navigation.js";

const SearchSelect = ({ component, values, onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [modified, setModified] = useState(false);
  const [visited, setVisited] = useState(false);
  const [selections, setSelections] = useState([]);
  const [popupState, setPopupState] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [options, setOptions] = useState(component.options);

  console.log(
    options
      ?.filter((option) => !selections.includes(option.value))
      .map((item) => item.label),
    "arijit"
  );

  useEffect(() => {
    if (component.fetchOptionsApi) {
      dispatch(
        callApi({
          url: component.fetchOptionsApi,
          method: GET,
          headers: { "Content-Type": "application/json" },
        })
      ).then((res) => {
        if (res.payload?.data?.["sectorNumber"]) {
          setOptions(res.payload?.data?.[component.optionKey]);
          if (component?.navigate && values?.length > 0) {
            navigate.push(component?.navigate);
          }
        }
      });
    }
  }, [values]);

  useEffect(() => {
    if (typeof values === "string") {
      setSelections([values]);
    } else if (typeof values === "object") {
      setSelections([...values]);
    } else {
      setSelections([]);
    }
  }, [values]);

  const debounceSearch = () => {};

  const handleChange = (option) => {
    if (component.maxAllowed === 1) {
      setSelections([option.value]);
      setModified(true);
    } else {
      if (selections.includes(option.value)) {
        setSelections(
          selections.filter((selection) => selection !== option.value)
        );
        setModified(true);
      } else {
        setSelections([...selections, option.value]);
        setModified(true);
      }
    }
  };

  const handleSubmit = () => {
    if (popupState) {
      if (modified) {
        onSubmit(component.maxAllowed === 1 ? selections[0] : selections);
        setModified(false);
        setVisited(false);
      }
      setPopupState(false);
    } else {
      setPopupState(true);
      setVisited(false);
    }
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    if (!e.target.value || e.target.value === "") {
      setShowSearchResults(false);
      setSearchResults([]);
    } else {
      setShowSearchResults(true);
      const filteredOptions =
        options.filter(
          (option) =>
            option.value.toLowerCase().includes(e.target.value.toLowerCase()) ||
            option.label.toLowerCase().includes(e.target.value.toLowerCase())
        ) || [];
      setSearchResults(filteredOptions);
    }
  };

  return (
    <div
      className={`drop_select_wrapper ${component?.className}`}
      onMouseLeave={() => {
        if (popupState && visited) {
          handleSubmit();
        }
      }}
    >
      <div className="dd_search_box" onClick={handleSubmit}>
        <SearchIcon className="search_icon" />
        <input
          type="text"
          className="dd_search_input "
          name={component.name}
          onInput={handleSearch}
          autoComplete="off"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      {popupState && (
        <div
          className="bg-white fixed z-999999 pb-3 max-h-[300px] overflow-auto md:min-w-[300px] min-w-[220px]"
          onMouseEnter={() => setVisited(true)}
        >
          {showSearchResults ? (
            searchResults?.map((option) => (
              <div className="dd_item" onClick={() => handleChange(option)}>
                <span className="dd_item_label">{option.label}</span>
                {selections.includes(option.value) && (
                  <CheckIcon className="dd_item_check" />
                )}
              </div>
            ))
          ) : (
            <>
              {options
                ?.filter((option) => selections.includes(option.value))
                .map((option) => (
                  <div
                    key={option.value}
                    className="dd_item"
                    onClick={() => handleChange(option)}
                  >
                    <span className="dd_item_label">{option.label}</span>
                    {selections.includes(option.value) && (
                      <CheckIcon className="dd_item_check" />
                    )}
                  </div>
                ))}
              {options
                ?.filter((option) => !selections.includes(option.value))
                .map((option) => (
                  <div
                    key={option.value}
                    className="dd_item"
                    onClick={() => handleChange(option)}
                  >
                    <span className="dd_item_label">{option.label}</span>
                    {selections.includes(option.value) && (
                      <CheckIcon className="dd_item_check" />
                    )}
                  </div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
