import React from "react";

const PropCard = ({ property, isFavorite, addToFavorites, removeFromFavorites }) => {
  const { type, brand, location, added, images, id } = property;

  const firstImage = images?.[0];

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(property);
    }
  };

  // Drag functionality
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", id);
  };

  return (
    <section
      className="card"
      draggable="true"
      onDragStart={handleDragStart}
      style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", width: "250px" }}
    >
      <div className="image">
        {firstImage && <img src={firstImage} alt={type} style={{ width: "100%" }} />}
      </div>

      <div className="description">
        <h4>Type: {type}</h4>
        <h4>Brand: {brand}</h4>
        <h4>Location: {location}</h4>
        <h4>
          Added: {added.month} {added.day}, {added.year}
        </h4>

        <button onClick={handleClick}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </section>
  );
};

export default PropCard;
