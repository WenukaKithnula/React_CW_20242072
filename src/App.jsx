import { useState, useEffect } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./Components/SearchForm";
import DisplayProp from "./Components/DisplayProp";
import { Routes, Route } from "react-router-dom";
import Favorites from "./Components/favorites";

function App() {
  const [properties] = useState(propertiesData.properties);
  const [favoriteProperties, setFavoriteProperties] = useState([
    "hello",
    "nigga",
    "yooo",
  ]);
  const [searchCriteria, setSearchCriteria] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateFrom: null,
    dateTo: null,
    postcode: "",
  });

  const [filteredProperties, setFilteredProperties] = useState([]);

  // ✅ FILTERING LOGIC
  const filterProperties = (criteria) => {
    const results = properties.filter((property) => {
      /* ---------------- POSTCODE / LOCATION ---------------- */
      if (
        criteria.postcode &&
        !property.location
          .toLowerCase()
          .includes(criteria.postcode.toLowerCase())
      ) {
        return false;
      }

      /* ---------------- PROPERTY TYPE ---------------- */
      if (
        criteria.type !== "any" &&
        property.type.toLowerCase() !== criteria.type.toLowerCase()
      ) {
        return false;
      }

      /* ---------------- PRICE RANGE ---------------- */
      if (criteria.minPrice && property.price < criteria.minPrice) {
        return false;
      }

      if (criteria.maxPrice && property.price > criteria.maxPrice) {
        return false;
      }

      /* ---------------- BEDROOMS ---------------- */
      if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) {
        return false;
      }

      if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) {
        return false;
      }

      /* ---------------- DATE RANGE ---------------- */
      if (criteria.dateFrom || criteria.dateTo) {
        const propertyDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );

        if (criteria.dateFrom && propertyDate < criteria.dateFrom) {
          return false;
        }

        if (criteria.dateTo && propertyDate > criteria.dateTo) {
          return false;
        }
      }

      /* ---------------- PASSED ALL CONDITIONS ---------------- */
      return true;
    });

    setFilteredProperties(results);
  };

  // ✅ CALL FILTER WHEN SEARCH CRITERIA CHANGES
  useEffect(() => {
    filterProperties(searchCriteria);
  }, [searchCriteria]);

  // ✅ FAVORITES ARRAY LOGIC

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SearchForm
            setSearchCriteria={setSearchCriteria}
            favoriteProperties={favoriteProperties}
          />
        }
      />

      <Route
        path="/results"
        element={<DisplayProp filteredProperties={filteredProperties} />}
      />
    </Routes>
  );
}

export default App;
