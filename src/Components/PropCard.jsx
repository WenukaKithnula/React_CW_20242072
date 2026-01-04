import './PropCard.css';
import { Link } from "react-router-dom";

function PropCard({
  property,
  isFavorite,
  addToFavorites,
  removeFromFavorites,
}) {
  const { id, type, bedrooms, price, shortDescription, location, images, added, url } = property;

  // ✅ Base URL for dev and GitHub Pages
  const base = import.meta.env.BASE_URL;

  // Thumbnail image (first property image)
  const thumbnail = images?.[0];

  const handleFavoriteClick = () => {
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
      onDragStart={handleDragStart}
      draggable="true"
      className="card"
      data-testid={`prop-card-${id}`}
    >
      <div className="card-body">
        {/* Thumbnail Image */}
        <div className="Thumbnail">
          {thumbnail && (
            <img
              src={`${base}${thumbnail}`}
              alt={type}
              className="property-image"
              data-testid={`prop-img-${id}`}
            />
          )}
        </div>

        <div className="property-info">
          {/* Location */}
          <div className="location">{location}</div>

          {/* Type & Bedrooms */}
          <div className="property-type">
            <div className="type">{type}</div>
            <div className="bedrooms">
              <img
                src={`${base}images/Icons/Bed-icon.png`}
                alt="Bed_icon"
                className="icon"
              />
              {bedrooms}
            </div>
          </div>

          {/* Short description */}
          <div className="description">{shortDescription}</div>

          {/* Price and date added */}
          <div className="price-date">
            <div className="price">Price: {price.toLocaleString()}</div>
            <div className="date">
              Added: {added.month} {added.day}, {added.year}
            </div>
          </div>

          {/* View more details button */}
          <Link to={url} className="view-more-btn">
            View More Details
          </Link>

          {/* Add / Remove Favorites */}
          <button
            onClick={handleFavoriteClick}
            className="add-to-fav-btn"
            data-testid={`add-fav-${id}`}
            
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PropCard;
