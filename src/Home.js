import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
// import { PageTitle, Footer } from "@/widgets/layout";
import FeatureCard from "./components/feature-card";
import TeamCard from "./components/team-card";
import featuresData from "./data/features-data";
import teamData from "./data/team-data";
import contactData from "./data/contact-data";
import PageTitle from "./layout/page-title";
// import ExploreButton from "./components/explore-button";

export function Home() {
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

  const NavContainer = styled.div`
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 100%; /* Fill the height of the parent */
  `;

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        {/* <div className="absolute top-0 h-full w-full bg-[url('../public/img/background-3.png')] bg-cover bg-center" /> */}
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
        {/* <div className="absolute top-0 h-full w-full bg-black/30 bg-cover bg-center" /> */}
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
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(
              ({ color, title, icon, description }) => (
                console.log(icon),
                (
                  <FeatureCard
                    key={title}
                    color={color}
                    title={title}
                    icon={React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                    description={description}
                  />
                )
              )
            )}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
                style={{ marginTop: "20px", fontSize: "35px" }}
              >
                Our Goal
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                In the heart of our mission lies the commitment to nurturing a
                community where land and ambition thrive in unison. We are
                building a platform that transforms every idle acre into a
                beacon of sustainability and every harvest into a triumph of
                shared prosperity. Our endeavor is to create a robust network
                that extends from the soil to the dining table, guaranteeing
                that the diligent work of every farmer is met with just rewards.
                <br />
                <br />
                At the forefront of our objectives is the battle against hunger,
                striving to achieve the Sustainable Development Goal of zero
                hunger. By integrating advanced digital storage solutions and
                providing precise crop recommendations through market and
                demographic analysis, we are paving the path to a future where
                food security is guaranteed for everyone.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
  <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
    <CardHeader floated={false} className="relative h-56">
      <img
        alt="Card Image"
        src="/img/happy.jpg"
        className="object-cover h-full w-full rounded-t-lg"
        style={{ objectPosition: "center top" }}
      />
    </CardHeader>
    <CardBody>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        Enterprise
      </Typography>
      <Typography
        variant="h5"
        color="blue-gray"
        className="mb-3 mt-2 font-bold"
      >
        Top Notch Services
      </Typography>
      <Typography className="font-normal text-blue-gray-500">
        The Arctic Ocean freezes every winter and much of the
        sea-ice then thaws every summer, and that process will
        continue whatever happens.
      </Typography>
    </CardBody>
  </Card>
</div>
                    
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>
      {/* <div className="bg-white">
        <Footer />
      </div> */}
    </>
  );
}

export default Home;
