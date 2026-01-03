import { useState, useEffect } from "react";
import Logo from "./Components/Logo";
import SearchForm from "./Components/SearchForm";
import DisplayProp from "./Components/DisplayProp";
import { Routes, Route } from "react-router-dom";

import PropertyDetails from "./Components/PropertyDetails";

function App() {
  const [properties, setProperties] = useState([]);

  const [favoriteProperties, setFavoriteProperties] = useState(() => {
    const saved = localStorage.getItem("favoriteProperties");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchCriteria, setSearchCriteria] = useState({
    type: "any",
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
    localStorage.setItem(
      "favoriteProperties",
      JSON.stringify(favoriteProperties)
    );
  }, [favoriteProperties]);

  // ✅ Load JSON from public folder
  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((err) => console.error("Error loading properties:", err));
  }, []);

  const filterProperties = (criteria) => {
    const results = properties.filter((property) => {
      // Postcode filter
      if (
        criteria.postcode?.trim() &&
        !property.location
          .toLowerCase()
          .includes(criteria.postcode.trim().toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (
        criteria.type !== "any" &&
        property.type.toLowerCase() !== criteria.type.toLowerCase()
      ) {
        return false;
      }

      // Price filter
      const minPrice =
        criteria.minPrice === "no min" || criteria.minPrice === ""
          ? 0
          : Number(criteria.minPrice);
      const maxPrice =
        criteria.maxPrice === "no max" || criteria.maxPrice === ""
          ? Infinity
          : Number(criteria.maxPrice);

      if (property.price < minPrice || property.price > maxPrice) return false;

      // Bedrooms filter
      const minBeds =
        criteria.minBedrooms === "no min" || criteria.minBedrooms === ""
          ? 0
          : Number(criteria.minBedrooms);
      const maxBeds =
        criteria.maxBedrooms === "no max" || criteria.maxBedrooms === ""
          ? Infinity
          : Number(criteria.maxBedrooms);

      if (property.bedrooms < minBeds || property.bedrooms > maxBeds) return false;

      // Date filter
      if (criteria.dateFrom || criteria.dateTo) {
        const propertyDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );
        if (criteria.dateFrom && propertyDate < criteria.dateFrom) return false;
        if (criteria.dateTo && propertyDate > criteria.dateTo) return false;
      }

      return true;
    });

    setFilteredProperties(results);
  };

  // Run filter whenever criteria changes
  useEffect(() => {
    filterProperties(searchCriteria);
  }, [searchCriteria]);

  // Favorites logic
  const addToFavorites = (property) => {
    setFavoriteProperties((prev) => {
      const exists = prev.some((f) => f.id === property.id);
      if (exists) return prev;
      return [...prev, property];
    });
  };
  const removeFromFavorites = (propertyId) => {
    setFavoriteProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };
  const clearFavorites = () => setFavoriteProperties([]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Logo />
            <SearchForm setSearchCriteria={setSearchCriteria} />
            <DisplayProp
              filteredProperties={filteredProperties}
              favoriteProperties={favoriteProperties}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              clearFavorites={clearFavorites}
            />
          </>
        }
      />

      {/* ✅ Use HashRouter-friendly path without .html */}
      <Route
        path="/properties/:id"
        element={
          <PropertyDetails
            properties={properties}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        }
      />
    </Routes>
  );
}

export default App;
