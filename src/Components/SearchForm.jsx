import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DropdownList, NumberPicker } from "react-widgets";

import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import "./SearchForm.css";
import { Link } from "react-router-dom";
import Favorites from "./favorites";

function SearchForm({ setSearchCriteria ,favoriteProperties}  ) {
  const [localType, setLocalType] = useState("any");
  const [localMinPrice, setLocalMinPrice] = useState("");
  const [localMaxPrice, setLocalMaxPrice] = useState("");
  const [localDateFrom, setLocalDateFrom] = useState(null);
  const [localDateTo, setLocalDateTo] = useState(null);
  const [localPostcode, setLocalPostcode] = useState("");
 
  const [localMinBedrooms, setLocalMinBedrooms] = useState("");
  const [localMaxBedrooms, setLocalMaxBedrooms] = useState("");

  const handleSearchClick = () => {
    //Created a function to assign the local varibles values to the global usestate objcet
    setSearchCriteria({
      
      type: localType,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      minBedrooms: localMinBedrooms,
      maxBedrooms: localMaxBedrooms,
      dateFrom: localDateFrom,
      dateTo: localDateTo,
      postcode: localPostcode,
    });
  };

  return (
    <>
    <form className="Main-form" onSubmit={(e) => e.preventDefault()}>
      <h1>Search Properties</h1>

      <div className="flex-container-1">
        <div className="location-value">
          <label>Search Location</label> <br />
          <input
            type="text"
            value={localPostcode}
            onChange={(e) => setLocalPostcode(e.target.value)}
            placeholder="Enter Location"
          />
        </div>

        <div className="property-type">
          <label>Type</label> <br />
          <DropdownList
            data={["any", "House", "Flat"]}
            value={localType}
            onChange={setLocalType}
          />
        </div>

        <div className="property-date">
          <div>
            <label>Date From</label> <br />
            <DatePicker
              selected={localDateFrom}
              onChange={setLocalDateFrom}
              placeholderText="Start date"
            />
          </div>

          <div>
            <label>Date To</label> <br />
            <DatePicker
              selected={localDateTo}
              onChange={setLocalDateTo}
              placeholderText="End date"
            />
          </div>
        </div>
      </div>

      <div className="flex-container-2">
        <div className="property-price">
          <div>
            <label>Min Price</label>
            <NumberPicker
              value={localMinPrice}
              onChange={setLocalMinPrice}
              min={0}
            />
          </div>

          <div>
            <label>Max Price</label>
            <NumberPicker
              value={localMaxPrice}
              onChange={setLocalMaxPrice}
              min={0}
            />
          </div>
        </div>

        <div className="property-bedroom">
          <div>
            <label>Min Rooms</label>
            <DropdownList
              data={["no min", 1, 2, 3, 4, 5]}
              value={localMinBedrooms}
              onChange={setLocalMinBedrooms}
              placeholder="NO min"
            />
          </div>

          <div>
            <label>Max Rooms</label>
            <DropdownList
              data={["no max", 1, 2, 3, 4, 5]}
              value={localMaxBedrooms}
              onChange={setLocalMaxBedrooms}
              placeholder="NO max"
            />
          </div>
        </div>
      </div>

      <div className="Search-btn">
        <Link to="/results">
          <button onClick={handleSearchClick}>Search</button>
        </Link>
      </div>
    </form>
    <Favorites favoriteProperties = {favoriteProperties}  ></Favorites>
    </>
  );
}

export default SearchForm;
