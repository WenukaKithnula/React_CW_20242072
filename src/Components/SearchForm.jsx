import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DropdownList, NumberPicker } from "react-widgets";
import { Combobox } from "react-widgets";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import "./SearchForm.css";
function SearchForm({ setSearchCriteria }) {
  const [localType, setLocalType] = useState("any");
  const [localMinPrice, setLocalMinPrice] = useState("");
  const [localMaxPrice, setLocalMaxPrice] = useState("");
  const [localDateFrom, setLocalDateFrom] = useState(null);
  const [localDateTo, setLocalDateTo] = useState(null);
  const [localPostcode, setLocalPostcode] = useState("");
  const [localLocation, setLocallocation] = useState("");
  const [localMinBedrooms, setLocalMinBedrooms] = useState("");
  const [localMaxBedrooms, setLocalMaxBedrooms] = useState("");
  const handleSearchClick = () => {
    //Created a function to assign the local varibles values to the global usestate objcet
    setSearchCriteria({
      location: localLocation,
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
    <div>
      <form action="" className="Main-form">
        <h1>Search Properties</h1>
        <div className="flex-container-1">
          <div className="location-value">
            <label htmlFor="location">Search Location</label> <br />
            <input
              type="text"
              onChange={(e) => setLocallocation(e.target.value)}
              placeholder="Enter Location"
            />
            
          </div>
          <div className="property-type">
            <label>Type:</label>
            <DropdownList
              data={["any", "home", "apartment"]}
              value={localType}
              onChange={(value) => setLocalType(value)}
            />
          </div>
          <div className="property-date">
            <div>
              <label>Date From:</label> <br />
              <DatePicker
                selected={localDateFrom}
                onChange={(date) => setLocalDateFrom(date)}
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label>Date To:</label> <br />
              <DatePicker
                selected={localDateTo}
                onChange={(date) => setLocalDateTo(date)}
                placeholderText="Select End date"
              />
            </div>
          </div>
        </div>
        <div className="flex-container-2">
          <div className="property-price">
            <div>
              <label>Min Price:</label>
              <NumberPicker
                value={localMinPrice}
                onChange={(value) => setLocalMinPrice(value)}
                placeholder="Min Price"
                min={0}
              />
            </div>
            <div>
              <label>Min Price:</label>
              <NumberPicker
                value={localMaxPrice}
                onChange={(value) => setLocalMaxPrice(value)}
                placeholder="Max Price"
                min={0}
              />
            </div>
          </div>
          <div className="property-bedroom">
            <div>
              <label>Min rooms:</label>
              <NumberPicker
                value={localMinBedrooms}
                onChange={(value) => setLocalMinBedrooms(value)}
                placeholder=" Min bedroom"
                min={0}
              />
            </div>
            <div>
              <label>Max Rooms:</label>
              <NumberPicker
                value={localMaxBedrooms}
                onChange={(value) => setLocalMaxBedrooms(value)}
                placeholder="Max rooms"
                min={0}
              />
            </div>
          </div>
         
        </div>
         <div className="Search-btn">
           <button onClick={handleSearchClick}>Search</button>

          </div>
      </form>

     
      <p>{localLocation}</p>
      <p>{localMaxBedrooms}</p>
      <p>{localMaxPrice}</p>
      <p>{localMinBedrooms}</p>
      <p>{localMinPrice}</p>
     <p>{localType}</p> 

    

      

      <p>
        Selected From:{" "}
        {localDateFrom ? localDateFrom.toLocaleDateString() : "None"} <br />
        Selected To: {localDateTo ? localDateTo.toLocaleDateString() : "None"}
      </p>
      

      <br />

      

      
      <p>{localMinPrice}</p>

      
      

     
    </div>
  );
}

export default SearchForm;
