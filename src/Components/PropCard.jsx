import React from "react";

function propCard({ property, isFavorite, addToFavorites, removeFromFavorites }) {

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(property);
    } else {
      addToFavorites(property);
    }
  };

  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("propertyId", property.id)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        width: "200px",
      }}
    >
      <h3>{property.name}</h3>
      <p>Price: ${property.price}</p>
      <p>Type: {property.type}</p>
      <p>Bedrooms: {property.bedrooms}</p>

      <button onClick={handleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default propCard;
