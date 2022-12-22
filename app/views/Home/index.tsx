import React from "react";

// import Map from "../../components/Map";
import Lens from "../../components/Lens";

const showMap = true;

const Home: React.FC = () => {
  return <>{showMap ? null : <Lens />}</>;
};

export default Home;
