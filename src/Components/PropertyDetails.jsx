import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect } from "react";
import "./PropertyDetails.css";

function PropertyDetails({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return <p>Property not found</p>;
  }

  const {
    type,
    bedrooms,
    price,
    tenure,
    shortDescription,
    description,
    location,
    images,
    property_plan,
    added,
    mapEmbed,
  } = property;

  const GalleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="parent-container">
      <div className="back-btn-div">
        <Link to={"/"}>
          <button className="back-btn">Back to Home</button>
        </Link>
        <div className="back-to-mian-logo">
          <img
            src=""
            alt="Company Logo"
            className="logo-icon"
          /> 

        </div>
      </div>

      <h1 className="page-heading">Property Details</h1>

      <div className="property-location">{location}</div>

      <div className="property-images">
        <ImageGallery
          items={GalleryImages}
          showPlayButton={false}
          thumbnailPosition="bottom"
        />
      </div>

      <div className="propertyDetails-info">
        <div className="propertyDeatil-price">
          Price: {price.toLocaleString()}
        </div>

        <div className="property-meta">
          <div>
            <b>Type:</b> {type}
          </div>
          <div>
            <b>Tenure:</b> {tenure}
          </div>
          <div className="bedroom-count">
            <b>Bedrooms:</b>
            <img
              src="/images/Icons/Bed-icon.png"
              alt="Bed_icon"
              className="property-info-icon"
            />
            <span className="room-count">{bedrooms}</span>
          </div>
          <div>
            <b>Added:</b> {added.day} {added.month} {added.year}
          </div>
        </div>

        <div className="mini-descripstion">
          <b>Short description:</b> {shortDescription}
        </div>

        <div className="tab-section">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <div className="long-description">{description}</div>
            </TabPanel>

            <TabPanel>
              <div className="floor-plan">
                <img
                  src={property_plan[0]}
                  alt="Property floor plan"
                  className="floor-plan-img"
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="property-map">
                <h3>Location Map</h3>
                <iframe
                  src={mapEmbed}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location Map"
                ></iframe>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
