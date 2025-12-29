import { useState, useRef } from "react";
import PropCard from "./PropCard";
import "./DisplayProp.css";

function DisplayProp({
  filteredProperties,
  addToFavorites,
  removeFromFavorites,
  favoriteProperties,
  clearFavorites,
}) {
  const [dragOver, setDragOver] = useState(false);
  const favRef = useRef(null); // ⭐ reference to favorites section

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

  const scrollToFav = () => {
    favRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* VIEW FAV BUTTON */}
      <div>
        <button className="view-fav-btn" onClick={scrollToFav}>
          View Favorites
        </button>
      </div>

      <div className="gallery">
        {/* FILTERED PROPERTIES */}
        <div className="filtered-property-main">
          <h1>{filteredProperties.length} results</h1>
          <div className="filtered-property">
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
        </div>

        {/* FAVORITES SECTION */}
        <div className="fav-property-display" ref={favRef}>
          <h3>Favorites display</h3>

          {favoriteProperties.length === 0 && (
            <p>No favorite properties yet</p>
          )}

          <button onClick={clearFavorites}>Clear favorites</button>

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

        {/* DRAG & DROP */}
        <div className="drag-drop">
          <div
            className="add-fav"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {dragOver
              ? "Release to add to Favorites"
              : "Drag to add to Favorites"}
          </div>

          <div
            className="remove-fav"
            onDrop={handleRemoveDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {dragOver
              ? "Release to remove Favorites"
              : "Drag here to remove Favorites"}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayProp;
