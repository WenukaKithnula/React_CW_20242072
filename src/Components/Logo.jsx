import "./Logo.css";
function Logo() {
  return (
    <>
      <div className="logo-icon-container">
        <div className="logo-icon-div">
          <img
            src="/images/Icons/logo.png"
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
