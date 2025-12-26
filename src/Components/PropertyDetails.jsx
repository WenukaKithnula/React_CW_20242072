import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyDetails({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  // Prepare images for ImageGallery
  const galleryImages = property.images.map((img) => ({
    original: img,
    thumbnail: img
  }));

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      {/* Large image + thumbnails */}
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        thumbnailPosition="bottom"
      />

      {/* Short description */}
      <div style={{ marginTop: "1rem" }}>
        <h2>{property.type}</h2>
        <p><strong>Price:</strong> £{property.price}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p>{property.shortDescription}</p>
      </div>

      {/* React Tabs */}
      <div style={{ marginTop: "2rem" }}>
        <Tabs>
          <TabList>
            <Tab>Price</Tab>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <p>£{property.price}</p>
          </TabPanel>

          <TabPanel>
            <p>{property.description}</p>
          </TabPanel>

          <TabPanel>
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              style={{ maxWidth: "100%" }}
            />
          </TabPanel>

          <TabPanel>
            <iframe
              src={property.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Map"
            ></iframe>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetails;
