import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { use } from "react";
import "./PropertyDetails.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
    added,
  } = property;

  const GalleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <>
      <div className="back-btn-div">
        <Link to={"/"}>
          <button className="back-btn">back to home</button>
        </Link>
      </div>
      <div className="parent-container">
        <div className="property-location">Location : {location}</div>

        <div className="property-images">
          <ImageGallery
          
            items={GalleryImages}
            showPlayButton={false}
            thumbnailPosition="bottom"
          />
        </div>
        <div className="propertyDetails-info">
          <div className="property-price">
            
            <p>
              <b>Price :</b> {price}
            </p>
          </div>

          <div className="bedroom-count">
            <p>BedRooms:</p>
            <img
              src="/images/Icons/Bed-icon.png"
              alt="Bed_icon"
              className="property-info-icon"
            />
            <p className="room-count">{bedrooms}</p>
          </div>
          <div className="add-date">
            <p>Added date : {added.year} {added.month} {added.day}</p>

          </div>
          <div className="mini-descripstion">
            <p>
              <b> Short description :</b> {shortDescription}
            </p>
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
              <TabPanel></TabPanel>
              <TabPanel>
                <div className="property-map" style={{ marginTop: "2rem" }}>
                  <h3>Location Map</h3>
                  <iframe
                    src={property.mapEmbed} // uses the mapEmbed from your JSON
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
    </>
  );
}

export default PropertyDetails;
