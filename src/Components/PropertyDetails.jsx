import { useParams } from "react-router-dom";
import PropCard from "./PropCard";

function PropertyDetails({
  properties,
  addToFavorites,
  removeFromFavorites,
  favoriteProperties
}) {
  const { id } = useParams();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return <h2>Loading property...</h2>;
  }

  return (
    <div>
      <PropCard
        property={property}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favoriteProperties={favoriteProperties}
      />
    </div>
  );
}

export default PropertyDetails;
