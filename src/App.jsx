import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./Components/SearchForm"; // ✅ CORRECT PATH



function App() {
  const [properties] = useState(propertiesData.properties);

  const [searchCriteria, setSearchCriteria] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    dateFrom: null,
    dateTo: null,
    postcode: "",
    location:""
  });

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);

  return (
    <>
    <p>hi</p>
    <SearchForm setSearchCriteria={setSearchCriteria} searchCriteria={searchCriteria}></SearchForm>
    </>
  );
}

export default App;
