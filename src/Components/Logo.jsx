import "./Logo.css";

function Logo() {
  const base = import.meta.env.BASE_URL;

  return (
    <header className="logo-container">
      <div className="logo-icon-wrapper">
        <img
          src={`${base}images/Icons/logo.png`}
          alt="Company Logo"
          className="logo-icon"
        />
      </div>
      <span className="logo-text">Find homes. Save smarter</span>
    </header>
  );
}

export default Logo;
