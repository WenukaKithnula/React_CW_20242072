import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DropdownList, NumberPicker } from "react-widgets";

import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import "./SearchForm.css";

function SearchForm({ setSearchCriteria }) {
  const [formValues, setFormValues] = useState({
    type: "any",
    minPrice: "no min",
    maxPrice: "no max",
    minBedrooms: "no min",
    maxBedrooms: "no max",
    dateFrom: null,
    dateTo: null,
    postcode: "",
  });

  const bedroomOptions = ["no min", 1, 2, 3, 4, 5];
  const maxBedroomOptions = ["no max", 1, 2, 3, 4, 5];

  const minPriceOptions = ["no min", 50000, 100000, 200000, 300000, 500000];
  const maxPriceOptions = [
    "no max",
    100000,
    200000,
    300000,
    500000,
    750000,
    1000000,
  ];

  const handleSearchClick = () => {
    setSearchCriteria(formValues);
  };

  return (
    <form
      className="Main-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchClick();
      }}
    >
      <div className="search-container">
        <h1>Search Properties</h1>

        <div className="flex-container-1">
          <div className="location-value">
            <label>Search Location :</label>
            <input
              className="input-location"
              type="text"
              value={formValues.postcode}
              onChange={(e) =>
                setFormValues({ ...formValues, postcode: e.target.value })
              }
              placeholder="Enter Location"
            />
          </div>

          <div className="property-type-search">
            <label>Type :</label>
            <DropdownList
              data={["any", "House", "Flat"]}
              value={formValues.type}
              onChange={(val) => setFormValues({ ...formValues, type: val })}
            />
          </div>

          <div className="property-date">
            <div className="from">
              <label>Date From :</label>
              <DatePicker
                selected={formValues.dateFrom}
                onChange={(date) =>
                  setFormValues({ ...formValues, dateFrom: date })
                }
                placeholderText="Start date"
              />
            </div>

            <div className="to">
              <label>Date To :</label>
              <DatePicker
                selected={formValues.dateTo}
                onChange={(date) =>
                  setFormValues({ ...formValues, dateTo: date })
                }
                placeholderText="End date"
              />
            </div>
          </div>
        </div>

        <div className="flex-container-2">
          <div className="property-price">
            <div>
              <label>Min Price :</label>
              <DropdownList
                data={minPriceOptions}
                value={formValues.minPrice}
                onChange={(val) =>
                  setFormValues({ ...formValues, minPrice: val })
                }
              />
            </div>

            <div>
              <label>Max Price :</label>
              <DropdownList
                data={maxPriceOptions}
                value={formValues.maxPrice}
                onChange={(val) =>
                  setFormValues({ ...formValues, maxPrice: val })
                }
              />
            </div>
          </div>

          <div className="property-bedroom">
            <div>
              <label>Min Rooms :</label>
              <DropdownList
                data={bedroomOptions}
                value={formValues.minBedrooms}
                onChange={(val) =>
                  setFormValues({ ...formValues, minBedrooms: val })
                }
              />
            </div>

            <div>
              <label>Max Rooms :</label>
              <DropdownList
                data={maxBedroomOptions}
                value={formValues.maxBedrooms}
                onChange={(val) =>
                  setFormValues({ ...formValues, maxBedrooms: val })
                }
              />
            </div>
          </div>
        </div>

        <div className="Search-btn">
          <button type="submit">Search Properties</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
