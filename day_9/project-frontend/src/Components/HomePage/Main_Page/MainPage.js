import React, { useState } from "react";
import "./MainPage.css";
import Obito_Profile from "../../../assets//obito_profile.jpg";
import { motion } from "framer-motion";
import Navbar from "../../Navbar/TopBar/Navbar";
import { categories } from "../../Navbar/Data/data";
import Category from "../../Navbar/Categories/categories";
import { imageData } from "../Data/data";
import { VideoData } from "../Data/data";
import Heart_OutLine from "../../../assets/heart-outline.png";
import Heart_Full from "../../../assets/heart-full.png";
import save_OutLine from "../../../assets/save-outline.png";
import save_Full from "../../../assets/save-full.png";
import left_arrow from "../../../assets/left-arrow.png";
import right_arrow from "../../../assets/right-arrow.png";
import Footer from "../../Navbar/Footer/Footer";


function MainPage() {
  // start like save updation //

  const [imageLikes, setImageLikes] = useState(
    Array(imageData.length).fill(false)
  );
  const [videoLikes, setVideoLikes] = useState(
    Array(VideoData.length).fill(false)
  );

  const toggleImageLike = (index) => {
    const updatedLikes = [...imageLikes];
    updatedLikes[index] = !updatedLikes[index];
    setImageLikes(updatedLikes);
  };

  const toggleVideoLike = (index) => {
    const updatedLikes = [...videoLikes];
    updatedLikes[index] = !updatedLikes[index];
    setVideoLikes(updatedLikes);
  };

  const [imageSaves, setImageSaves] = useState(
    Array(imageData.length).fill(false)
  );
  const [videoSaves, setVideoSaves] = useState(
    Array(VideoData.length).fill(false)
  );

  const toggleImageSave = (index) => {
    const updatedSaves = [...imageSaves];
    updatedSaves[index] = !updatedSaves[index];
    setImageSaves(updatedSaves);
  };

  const toggleVideoSave = (index) => {
    const updatedSaves = [...videoSaves];
    updatedSaves[index] = !updatedSaves[index];
    setVideoSaves(updatedSaves);
  };

  // end of like & save updation //

  // scroll right and changing the post //

  const [activeSlide, setActiveSlide] = useState(0);

  const scrollLeft = () => {
    const slider = document.querySelector(".MainPageImage-slider");
    const activeSlide = document.querySelector(".MainPage-Image-div.active");

    if (slider && activeSlide) {
      const newPosition = activeSlide.offsetLeft - 300; // Adjust the scroll amount as needed

      if (newPosition < 0) {
        // If reached the beginning, scroll to the last post
        const lastSlide = document.querySelector(
          ".MainPage-Image-div:last-child"
        );
        if (lastSlide) {
          lastSlide.scrollIntoView({ behavior: "smooth", inline: "start" });
          setActiveSlide(imageData.length - 1);
        }
      } else {
        activeSlide.previousElementSibling.scrollIntoView({
          behavior: "smooth",
          inline: "start",
        });
        setActiveSlide((prevSlide) =>
          prevSlide === 0 ? imageData.length - 1 : prevSlide - 1
        );
      }
    }
  };

  const scrollRight = () => {
    const slider = document.querySelector(".MainPageImage-slider");
    const activeSlide = document.querySelector(".MainPage-Image-div.active");

    if (slider && activeSlide) {
      const newPosition = activeSlide.offsetLeft + 300;

      if (newPosition >= slider.scrollWidth) {
        const firstSlide = document.querySelector(
          ".MainPage-Image-div:first-child"
        );
        if (firstSlide) {
          firstSlide.scrollIntoView({ behavior: "smooth", inline: "start" });
          setActiveSlide(0);
        }
      } else {
        activeSlide.nextElementSibling.scrollIntoView({
          behavior: "smooth",
          inline: "start",
        });
        setActiveSlide((prevSlide) =>
          prevSlide === imageData.length - 1 ? 0 : prevSlide + 1
        );
      }
    }
  };

  // end of scroll right and changing the post //

  return (
    <>
      <div className="main-container">
        <div className="categories-container">
          {categories.map((data) => (
            <Category key={data.id} data={data} />
          ))}
        </div>
        <div className="content-container">
          <div className="MainPage-page">
            {/* Video section */}
            <span className="MainPage_Video_Title">Trending Images</span>
            <motion.div className="MainPageVideo-page">
              {VideoData.map((mainVideo, index) => (
                <motion.div
                  layout
                  key={index}
                  className={`MainPage-Video-div ${
                    index === activeSlide ? "active" : ""
                  }`}
                >
                  <img
                    className="MainPage-Video-img"
                    src={mainVideo.MainPageUrl}
                    alt=""
                  />
                  <div className="MainPage_Like_Save">
                    <img
                      src={videoLikes[index] ? Heart_Full : Heart_OutLine}
                      alt="Heart"
                      className="MainPage_Video_like"
                      onClick={() => toggleVideoLike(index)}
                    />
                    <img
                      src={videoSaves[index] ? save_Full : save_OutLine}
                      alt="Save"
                      className="MainPage_Video_save"
                      onClick={() => toggleVideoSave(index)}
                    />
                  </div>
                  <div className="post_profile_section">
                    <img
                      src={Obito_Profile}
                      alt=""
                      className="MainPage-Video-profile-pic"
                    />
                    <div className="MainPage-Video-caption">
                      {mainVideo.MainPageCaption}
                    </div>
                    <div className="MainPage-Video-username">
                      By {mainVideo.MainUsername}
                    </div>
                    </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Video section */}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default MainPage;

// {/* <span className="MainPage_Image_Title">Trending Images</span>

// <div className="MainPageImage-slider">
//   <motion.div className="MainPageImage-page">
//     {imageData.map((mainImage, index) => (
//       <motion.div
//         key={index}
//         className={`MainPage-Image-div ${
//           index === activeSlide ? "active" : ""
//         }`}
//       >
//         <img
//           className="MainPage-Image-img"
//           src={mainImage.MainPageUrl}
//           alt=""
//         />
//         <div className="MainPage_Like_Save">
//           <img
//             src={imageLikes[index] ? Heart_Full : Heart_OutLine}
//             alt="Heart"
//             className="MainPage_Image_like"
//             onClick={() => toggleImageLike(index)}
//           />
//           <img
//             src={imageSaves[index] ? save_Full : save_OutLine}
//             alt="Save"
//             className="MainPage_Image_save"
//             onClick={() => toggleImageSave(index)}
//           />
//         </div>
//         <div className="post_profile_section">
//           <img
//             src={Obito_Profile}
//             alt=""
//             className="MainPage-Image-profile-pic"
//           />
//           <div className="MainPage-Image-caption">
//             {mainImage.MainPageCaption}
//           </div>
//           <div className="MainPage-Image-username">
//             By {mainImage.MainUsername}
//           </div>
//         </div>
//       </motion.div>
//     ))}
//   </motion.div>
// </div>

// {/* slider control for image */}
// {/* <div className="img-slider-controls">
//   <img
//     src={left_arrow}
//     alt="left_arrow"
//     onClick={scrollLeft}
//     className="img-slider-control left"
//   />
//   <img
//     src={right_arrow}
//     alt="right_arrow"
//     onClick={scrollRight}
//     className="img-slider-control right"
//   />
// </div>
// {/* slider control for image */}

// {/* Image section */}

// // {/* <div className="separator-line"></div> */} */} */}