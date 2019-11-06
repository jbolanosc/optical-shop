import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdAccessibility } from "react-icons/md";
import { FaUserMd, FaStethoscope, FaPoll, FaEye } from "react-icons/fa";

const styles = {
  nav: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  brand: {
    color: "white",
    textAlign: "center"
  }
};

const NavBar = () => (
  <nav className="navbar navbar-dark" style={styles.nav}>
    <IconContext.Provider value={{ size: "3em" }}>
      <span style={styles.brand}>
        3.14 <br /> <FaEye />
      </span>
      <Link to="/patients">
        <MdAccessibility />
      </Link>
      <Link to="/exams">
        <FaPoll alt="exams" />
      </Link>
      <Link to="/doctors">
        <FaUserMd />
      </Link>
      <Link to="/diagnostics">
        <FaStethoscope />
      </Link>
    </IconContext.Provider>
  </nav>
);

export default NavBar;
