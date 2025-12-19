

function DisplayProp({ filteredProperties , }) {
  if (filteredProperties.length === 0) {
    return <h2>No properties found</h2>;
  }

  return (
    <div>
      <h1>Search Results</h1>

      {filteredProperties.map((property) => (
        <div key={property.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{property.title}</h3>
          <p>Type: {property.type}</p>
          <p>Price: £{property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>{property.tenure}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayProp;
