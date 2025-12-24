import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";

import PropCard from "./PropCard";

function PropertyDetails({ addToFavorites, removeFromFavorites, favoriteProperties }) {
  const { id } = useParams(); // get the :id from URL

  // Find the property with this id
  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return <h2>Property not found</h2>;
  }

  const isFavorite = favoriteProperties.some(f => f.id === id);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Details</h1>
      

      {/* You can also add more detailed info here */}
      <div style={{ marginTop: "20px" }}>
        <h3>Full Description</h3>
        <p>{property.shortDescription} (you can add more fields here)</p>
        <p>Location: {property.location}</p>
        <p>Price: {property.price}</p>
        <p>Added: {property.added.month} {property.added.day}, {property.added.year}</p>
      </div>
    </div>
  );
}

export default PropertyDetails;
