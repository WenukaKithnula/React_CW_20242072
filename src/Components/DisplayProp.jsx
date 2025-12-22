import React, { useState } from "react";
import PropCard from "./PropCard";


function DisplayProp({ filteredProperties, favorites, addToFavorites, removeFromFavorites }) {
  const [dragOver, setDragOver] = useState(false);

  // Handle drop on the favorites area
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = filteredProperties.find((p) => p.id === propertyId);

    if (!property) return;

    if (favorites.some((f) => f.id === property.id)) {
      alert("This property is already in favorites!");
    } else {
      addToFavorites(property);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div>
      {/* Properties Gallery */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProperties.map((property) => (
          <PropCard 
            key={property.id}
            property={property}
            isFavorite={favorites.some((f) => f.id === property.id)}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>

      {/* Drag & Drop Favorites Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          marginTop: "20px",
          padding: "30px",
          border: "2px dashed #666",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: dragOver ? "#f0f8ff" : "#fafafa",
        }}
      >
        {dragOver ? "Release to add to Favorites" : "Drag properties here to add to Favorites"}
      </div>
    </div>
  );
}

export default DisplayProp;
