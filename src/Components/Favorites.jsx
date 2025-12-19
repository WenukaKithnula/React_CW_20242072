function Favorites({ favoriteProperties }) {
  return (
    <div>
      <h2>Favorites Test</h2>

      {favoriteProperties.map((item, index) => (
        <h3 key={index}>{item}</h3>
      ))}
    </div>
  );
}

export default Favorites;
