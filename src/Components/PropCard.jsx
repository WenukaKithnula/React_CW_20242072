function PropCard({
  property,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
}) {
  const { id, type, bedrooms, price, description, location, images, added } =
    property;

  const thumbnail = images?.[0];

  const handlClick = () => {
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
    <>
      <section onDrag={handleDragStart} draggable="true" className="card">
        <div className="card-body">
          <div className="Thumbnail">
            {thumbnail && <img src={thumbnail} alt={type} />}
          </div>
          <div className="property-info">
            <div className="location">{location}</div>
            <div className="property-type">
              <div className="type">{type}</div>
              <div className="bedrooms">{bedrooms}</div>
            </div>
            <div className="description">{description}</div>
            <div className="price-date">
              <div className="price">{price}</div>
              <div className="date">
                Added: {added.month} {added.day}, {added.year}
              </div>
            </div>
            <button onClick={handlClick}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export default PropCard;
