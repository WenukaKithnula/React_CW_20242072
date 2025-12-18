import { useState } from 'react'
import propertiesData from "./data/properties.json";


function App() {
//Fetch all the property Data in to a varble that cannot be changed
  const [properties] = useState(propertiesData.properties)

  const [searchCriteria, setSearchCriteria] = useState({
  type: "any",
  minPrice: "",
  maxPrice: "",
  minBedrooms: "",
  maxBedrooms: "",
  dateFrom: "",
  dateTo: "",
  postcode: ""
});
// insatilzed with a empty array
const [filteredProperties, setFilteredProperties] = useState([]);

// empty array to store the Fav Propteries
const [favourites, setFavourites] = useState([]);
  
  return (
    <>
       <SearchForm
      setSearchCriteria={setSearchCriteria}
      onSearch={handleSearch}
    />
    </>
  )
}

export default App
