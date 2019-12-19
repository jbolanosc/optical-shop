import React from "react";
import Particles from "react-particles-js";

const particlesOpt = {
  particles: {
    number: {
      value: 180
    },
    size: {
      value: 3
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};

const styles = {
  title: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    textAlign: "center"
  }
};

const Landing = () => (
  <div className="bg-info h-100 w-100">
    <div style={styles.title}>
      <h1>Welcome</h1>
      <h4>Please select an option to continue</h4>
    </div>

    <Particles params={particlesOpt} />
  </div>
);

export default Landing;
