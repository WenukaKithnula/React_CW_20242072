import { useState } from "react";
import PropCard from "./PropCard";
import "./DisplayProp.css";


function DisplayProp({
  filteredProperties,
  addToFavorites,
  removeFromFavorites,
  favoriteProperties,
  clearFavorites
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const propertyId = e.dataTransfer.getData("propertyId");
    const property = filteredProperties.find((p) => p.id === propertyId);

    if (property) {
      addToFavorites(property);
    }
  };

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const propertyId = e.dataTransfer.getData("propertyId");
    removeFromFavorites(propertyId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="gallery">
      {/* FILTERED PROPERTIES */}
      <div className="filtered-property" >
        {filteredProperties.map((property) => (
          <PropCard
            key={property.id}
            property={property}
            isFavorite={favoriteProperties.some(
              (f) => f.id === property.id
            )}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>

      <div className="fav-property-display">
          <h3>Fvarotes dipslay</h3>
          <button onClick={clearFavorites}>clear favorites</button>
          {favoriteProperties.map((property) => (
            <PropCard
              key={property.id}
              property={property}
              isFavorite={true}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </div>

      {/* FAVOURITES DRAG & DROP */}
      
        <div className="drag-drop">
          <div
            className="add-fav"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {dragOver
              ? "Release to add to Favorites"
              : "Drag  add to Favorites"}
          </div>

          <div
            className="remove-fav"
            onDrop={handleRemoveDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {dragOver
              ? "Release to remove Favorites"
              : <p>Release to remove Favorites</p>}
          </div>
        </div>

        {/* FAVOURITES LIST */}
       
      </div>
    
  );
}

export default DisplayProp;
