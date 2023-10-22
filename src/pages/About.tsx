import React from 'react'
import "../styles/home.css";
import HomeBar from "../components/Homebar";
import HomeFooter from "../components/Footer";
import Spline from "@splinetool/react-spline";

const SPLINE_ABOUT = `https://prod.spline.design/kkSOmPWkIvdc1562/scene.splinecode`;

const About = () => {

	return (
		<div className="App">
			<div className="header">
				<HomeBar />
				<h2>ABOUT ME</h2>
			</div>
			<div className="spline-container">
				<Spline scene={SPLINE_ABOUT} />
				<h4>May take some time to load, thanks for your patience!</h4>
			</div>
			<div className="footer-container">
				<HomeFooter/>
			</div>
		</div>
	);
};
  
export default About;