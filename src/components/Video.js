import React, { useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";

const Video = () => {
    
    const videoRef = useRef(null);


    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
          // Disable controls initially
          videoElement.controls = false;
    
          // Add event listener to disable controls on hover
          videoElement.addEventListener("mouseenter", () => {
            videoElement.controls = false;
          });
    
          // Add event listener to enable controls when mouse leaves
          videoElement.addEventListener("mouseleave", () => {
            videoElement.controls = false;
          });
        }
      }, []);


  return (
    <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
      <video
          ref={videoRef}
          className="absolute top-0 h-auto w-full bg-cover bg-center"
          controls
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/bg_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="text-7xl font-black"
              >
                Cultivating Connections, Harvesting Prosperity
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="opacity-80"
                style={{ margin: "20px", fontSize: "15px" }}
              >
                Join us on a transformative journey into the intricate world of
                life, where fertile land meets purposeful cultivation. Together,
                we sow the seeds of prosperity, nurturing sustainable growth and
                shared abundance.
              </Typography>
              {/* <NavContainer><ExploreButton/></NavContainer> */}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Video
