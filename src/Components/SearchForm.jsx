function searchCriteria({setSearchCriteria,onSearch}){
//Created local useState to use during search clciked
const [localType, setLocalType] = useState("any");
const [localMinPrice, setLocalMinPrice] = useState("");
const [localMaxPrice, setLocalMaxPrice] = useState("");
const [localMinBedrooms, setLocalMinBedrooms] = useState("");
const [localMaxBedrooms, setLocalMaxBedrooms] = useState("");
const [localDateFrom, setLocalDateFrom] = useState("");
const [localDateTo, setLocalDateTo] = useState("");
const [localPostcode, setLocalPostcode] = useState("");


 const handleSearchClick = () => {
    setSearchCriteria({
      type: localType,
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      minBedrooms: localMinBedrooms,
      maxBedrooms: localMaxBedrooms,
      dateFrom: localDateFrom,
      dateTo: localDateTo,
      postcode: localPostcode,
    });



return(
    <>
        
    
    </>
);

}
}
export default searchCriteria