import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import TextField from "@mui/material/TextField";

import "react-datepicker/dist/react-datepicker.css";
import "./SearchForm.css";

function SearchForm({ setSearchCriteria }) {
  const [formValues, setFormValues] = useState({
    type: "any",
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: null,
    dateTo: null,
    postcode: "",
  });

  /* ---------- OPTIONS ---------- */
  const typeOptions = [
    { value: "any", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  const minPriceOptions = [
    { value: null, label: "No Min" },
    { value: 50000, label: "50,000" },
    { value: 100000, label: "100,000" },
    { value: 200000, label: "200,000" },
    { value: 300000, label: "300,000" },
    { value: 500000, label: "500,000" },
  ];

  const maxPriceOptions = [
    { value: null, label: "No Max" },
    { value: 100000, label: "100,000" },
    { value: 200000, label: "200,000" },
    { value: 300000, label: "300,000" },
    { value: 500000, label: "500,000" },
    { value: 750000, label: "750,000" },
    { value: 1000000, label: "1,000,000" },
  ];

  const minBedroomOptions = [
    { value: null, label: "No Min" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const maxBedroomOptions = [
    { value: null, label: "No Max" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const handleSearchClick = () => {
    setSearchCriteria(formValues);
  };

  return (
    <div className="Main-form">
      <form className="search-container" onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
        <h1 className="search-form-logo-name">Homiq</h1>

        <div className="flex-container-1">
          <div className="location-value">
            <label htmlFor="postcode-input">Postcode :</label>
            <TextField
              id="postcode-input"
              size="small"
              value={formValues.postcode}
              onChange={(e) => setFormValues({ ...formValues, postcode: e.target.value })}
              placeholder="Enter Location"
              fullWidth
            />
          </div>

          <div className="property-type-search">
            <label htmlFor="type-select">Type :</label>
            <Select
              inputId="type-select"
              options={typeOptions}
              value={typeOptions.find((o) => o.value === formValues.type)}
              onChange={(opt) => setFormValues({ ...formValues, type: opt.value })}
            />
          </div>

          <div className="property-date">
            <div>
              <label htmlFor="date-from">Date From :</label>
              <DatePicker
                id="date-from"
                selected={formValues.dateFrom}
                onChange={(date) => setFormValues({ ...formValues, dateFrom: date })}
                placeholderText="Start date"
              />
            </div>
            <div>
              <label htmlFor="date-to">Date To :</label>
              <DatePicker
                id="date-to"
                selected={formValues.dateTo}
                onChange={(date) => setFormValues({ ...formValues, dateTo: date })}
                placeholderText="End date"
              />
            </div>
          </div>
        </div>

        <div className="flex-container-2">
          <div className="property-price">
            <div className="input-box">
              <label htmlFor="min-price">Min Price :</label>
              <Select
                inputId="min-price"
                options={minPriceOptions}
                value={minPriceOptions.find((o) => o.value === formValues.minPrice)}
                onChange={(opt) => setFormValues({ ...formValues, minPrice: opt.value })}
              />
            </div>
            <div className="input-box">
              <label htmlFor="max-price">Max Price :</label>
              <Select
                inputId="max-price"
                options={maxPriceOptions}
                value={maxPriceOptions.find((o) => o.value === formValues.maxPrice)}
                onChange={(opt) => setFormValues({ ...formValues, maxPrice: opt.value })}
              />
            </div>
          </div>

          <div className="property-bedroom">
            <div className="input-box">
              <label htmlFor="min-rooms">Min Rooms :</label>
              <Select
                inputId="min-rooms"
                options={minBedroomOptions}
                value={minBedroomOptions.find((o) => o.value === formValues.minBedrooms)}
                onChange={(opt) => setFormValues({ ...formValues, minBedrooms: opt.value })}
              />
            </div>
            <div className="input-box">
              <label htmlFor="max-rooms">Max Rooms :</label>
              <Select
                inputId="max-rooms"
                options={maxBedroomOptions}
                value={maxBedroomOptions.find((o) => o.value === formValues.maxBedrooms)}
                onChange={(opt) => setFormValues({ ...formValues, maxBedrooms: opt.value })}
              />
            </div>
          </div>
        </div>

        <div className="Search-btn">
          <button type="submit">Search Properties</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;