import "./Logo.css";

function Logo() {
  const base = import.meta.env.BASE_URL; // automatically handles dev vs production

  return (
    <>
      <div className="logo-icon-container">
        <div className="logo-icon-div">
          <img
            src={`${base}images/Icons/logo.png`}
            alt="Company Logo"
            className="logo-icon"
          />
        </div>
        <div className="logo-word">Find homes. Save smarter</div>
      </div>
    </>
  );
}

export default Logo;
