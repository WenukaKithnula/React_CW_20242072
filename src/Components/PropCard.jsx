import './PropCard.css';
import { Link } from "react-router-dom";

function PropCard({ property, isFavorite, addToFavorites, removeFromFavorites }) {
  const { id, type, bedrooms, price, shortDescription, location, images, added } = property;

  const thumbnail = images?.[0];

  const handleFavoriteClick = () => {
    if (isFavorite) removeFromFavorites(id);
    else addToFavorites(property);
  };

  // Drag start
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", id);
  };

  return (
    <section onDragStart={handleDragStart} draggable="true" className="card">
      <div className="card-body">
        <div className="Thumbnail">
          {thumbnail && <img src={thumbnail} alt={type} className="property-image" />}
        </div>
        <div className="property-info">
          <div className="location">{location}</div>
          <div className="property-type">
            <div className="type">{type}</div>
            <div className="bedrooms">
              <img src="/images/Icons/Bed-icon.png" alt="Bed_icon" className="icon" />
              {bedrooms}
            </div>
          </div>
          <div className="description">{shortDescription}</div>
          <div className="price-date">
            <div className="price">Price: {price.toLocaleString()}</div>
            <div className="date">
              Added: {added.month} {added.day}, {added.year}
            </div>
          </div>

          {/* ✅ Link matches HashRouter */}
          <Link to={`/properties/${id}`} className="view-more-btn">
            View More Details
          </Link>

          <button onClick={handleFavoriteClick} className="add-to-fav-btn">
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PropCard;
