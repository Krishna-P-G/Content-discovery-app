import React from "react";
import "./MainPage.css";
import Akatsuki_Logo from "../../../assets/akatsuki.png";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/TopBar/navbar";
import { categories } from "../../Navbar/Data/data";
import Category from "../../Navbar/Categories/categories";
import { imageData } from "../Data/data";
import { VideoData } from "../Data/data";
function MainPage() {

  return (
    <>
      <Navbar /> 
    <div className="main-container">
      <div className="categories-container">
        {categories.map((data) => (
          <Category key={data.id} data={data} />
        ))}
      </div>
      <motion.div className="MainPage-page">
      <div className="MainPage_Title">Trending Images</div>
        {imageData.map((mainImage, i) => (
          <motion.div layout key={i} className="MainPage-Image-div">
            <img className="MainPage-Image-img" src={mainImage.MainPageUrl} alt="" />
            <img src={Akatsuki_Logo} alt="" className="MainPage-Image-profile-pic" />
            <div className="MainPage-Image-caption">{mainImage.MainPageCaption}</div>
            <div className="MainPage-Image-username">By {mainImage.MainUsername}</div>
          </motion.div>
        ))}
        <div className="separator-line"></div>
        {VideoData.map((mainVideo, i) => (
          <motion.div layout key={i} className="MainPage-Video-div">
            <img className="MainPage-Video-img" src={mainVideo.MainPageUrl} alt="" />
            <img src={Akatsuki_Logo} alt="" className="MainPage-Video-profile-pic" />
            <div className="MainPage-Video-caption">{mainVideo.MainPageCaption}</div>
            <div className="MainPage-Video-username">By {mainVideo.MainUsername}</div>
          </motion.div>
        ))}

      </motion.div>
    </div>
    </>

  );
}

export default MainPage;
