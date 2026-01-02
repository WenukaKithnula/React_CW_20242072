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
  const favRef = useRef(null); // reference to favorites section

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
      {/* VIEW FAVORITES BUTTON */}
      <div>
        <button className="view-fav-btn" onClick={scrollToFav}>
          View Favorites
        </button>
      </div>

      <div className="gallery">
        {/* FILTERED PROPERTIES */}
        <div className="filtered-property-main">
          <div
            className="phone-view-add-fav"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            Drag to add to favorite
          </div>

          <h1>{filteredProperties.length} Results Found</h1>
          <div className="filtered-property">
            {filteredProperties.map((property) => (
              <PropCard
                key={property.id}
                property={property}
                isFavorite={false} // Always false in filtered list
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            ))}
          </div>
        </div>

        {/* FAVORITES SECTION */}
        <div className="right-side">
          <div
            className="fav-property-display"
            ref={favRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            data-testid="favorites-list"
          >
            <h3>Favorites Properties</h3>

            {favoriteProperties.length === 0 ? (
              <p>
                No favorite properties yet <br /> drag property card to add
              </p>
            ) : (
              <button onClick={clearFavorites} className="clear-btn">
                Clear favorites
              </button>
            )}

            {favoriteProperties.map((property) => (
              <PropCard
                key={property.id}
                property={property}
                isFavorite={true} // Only true in favorites section
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            ))}
          </div>

          {/* DRAG & DROP REMOVE */}
          {favoriteProperties.length > 0 && (
            <div className="drag-drop">
              <div
                className="remove-fav"
                onDrop={handleRemoveDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <p>Drag and drop to remove from favorites</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DisplayProp;
