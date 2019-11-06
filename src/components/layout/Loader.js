import React, { styleSheet } from "react";
import { BounceyLoader } from "react-loaders-spinners";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    height: "300px"
  },
  loader: {
    margin: "auto",
    textAlign: "center"
  }
};

const Loading = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }}
  >
    <BounceyLoader style={styles.loader} width={35} height={35} />
  </div>
);

export default Loading;
