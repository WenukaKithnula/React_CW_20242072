import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DropdownList, NumberPicker } from "react-widgets";
import { Combobox } from "react-widgets";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
function SearchForm({ setSearchCriteria }) {
  const [localType, setLocalType] = useState("any");
  const [localMinPrice, setLocalMinPrice] = useState("");
  const [localMaxPrice, setLocalMaxPrice] = useState("");
  const [localDateFrom, setLocalDateFrom] = useState(null);
  const [localDateTo, setLocalDateTo] = useState(null);
  const [localPostcode, setLocalPostcode] = useState("");
  const [localLocation, setLocallocation] = useState("");
  const handleSearchClick = () => {
    setSearchCriteria({
      location : localLocation,
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
      <h1>Search Properties</h1>

      <input type="text" onChange={(e)=>setLocallocation(e.target.value)} />
      <p>{localLocation}</p>

      <label>Date From:</label>
      <DatePicker
        selected={localDateFrom}
        onChange={(date) => setLocalDateFrom(date)}
        placeholderText="Select start date"
      />

      <br />

      <label>Date To:</label>
      <DatePicker
        selected={localDateTo}
        onChange={(date) => setLocalDateTo(date)}
        placeholderText="Select end date"
      />

      <p>
        Selected From:{" "}
        {localDateFrom ? localDateFrom.toLocaleDateString() : "None"} <br />
        Selected To: {localDateTo ? localDateTo.toLocaleDateString() : "None"}
      </p>

      <br />

      <label>Type:</label>
      <DropdownList
        data={["any", "home", "apartment"]}
        value={localType}
        onChange={(value) => setLocalType(value)}
      />

      <br />
      <label>Min Price:</label>
      <NumberPicker
        value={localMaxPrice}
        onChange={(value) => setLocalMaxPrice(value)}
        placeholder="Max Price"
        min={0}
      />
      <p>{localMaxPrice}</p>

      <br />
      <label>Postcode:</label>
      <input
        type="text"
        value={localPostcode}
        onChange={(e) => setLocalPostcode(e.target.value)}
      />
      <Combobox
        data={[]} // empty array → acts like a simple text input
        value={localPostcode} // use the state you already have
        onChange={(val) => setLocalPostcode(val)} // update your postcode state
        placeholder="Enter postcode"
      />

      <br />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchForm;
