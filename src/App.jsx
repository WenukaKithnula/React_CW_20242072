import { useState } from "react";
import propertiesData from "./data/properties.json";
import SearchForm from "./Components/SearchForm"; // ✅ CORRECT PATH
import DisplayProp from "./Components/DisplayProp";
import { Routes, Route } from "react-router-dom";



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
    
  });

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  //

  return (
    <>
    <p>hi</p>
    <Routes>
       <Route path="/" element={<SearchForm setSearchCriteria={setSearchCriteria} />} />
       <Route path="/results" element={<DisplayProp/>}></Route>
    </Routes>
    </>
   
   
  );
}

export default App;
