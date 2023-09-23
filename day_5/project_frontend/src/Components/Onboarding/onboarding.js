import React, { useState } from "react";
import "./onboarding.css";
import { Link } from "react-router-dom";

export function Onboarding() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };


  return (
    <>
      <div className="onboarding-container">
        <form className="onboarding-form" onSubmit={handleFormSubmit}>
          <div className="onboarding_circle_container">
            {/* Circle without a picture */}
            <div className="onboarding_circle"></div>
          </div>
          <div className="upload-button-container">
            {/* Upload Profile Picture Button */}
            <button className="upload_profile">
                Upload profile picture
            </button>
          </div>
          <Link to="/home">
          <button className="continue">
            <span className="continue_span">Continue</span>
            <em className="continue_em"></em>
          </button>
          </Link>
          
        </form>
      </div>
      <div className="onboarding_wallpaper"></div>
    </>
  );
}
