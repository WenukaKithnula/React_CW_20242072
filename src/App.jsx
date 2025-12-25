import { useState, useEffect } from "react";

import SearchForm from "./Components/SearchForm";
import DisplayProp from "./Components/DisplayProp";
import { Routes, Route } from "react-router-dom";
import Favorites from "./Components/favorites";
import PropertyDetails from "./Components/PropertyDetails";

function App() {
  const [properties, setProperties] = useState([]);

  const [favoriteProperties, setFavoriteProperties] = useState([]);

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

  useEffect(() => {
  fetch("/data/properties.json")
    .then((res) => res.json())
    .then((data) => {
      setProperties(data.properties);
      setFilteredProperties(data.properties); // optional: show all initially
    })
    .catch((err) => console.error("Error loading properties:", err));
}, []);


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


  const addToFavorites = (property) => {
    setFavoriteProperties((prev) => {
      const exists = prev.some((f) => f.id === property.id);
      if (exists) {
        alert("Already in favorites");
        return prev;
      }
      return [...prev, property];
    });
  };
  const removeFromFavorites = (propertyId) => {
    setFavoriteProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };
  const clearFavorites = ()=>{
    setFavoriteProperties([])
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SearchForm setSearchCriteria={setSearchCriteria} />
            <DisplayProp
              filteredProperties={filteredProperties}
              favoriteProperties={favoriteProperties}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              clearFavorites = {clearFavorites}

            />
          </>
        }
      />
      <Route
        path="/property/:id"
        element={
          <PropertyDetails
          properties={properties} 
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            favoriteProperties={favoriteProperties}
          />
        }
      />
    </Routes>
  );
}

export default App;
