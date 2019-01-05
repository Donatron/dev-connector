import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div className="text-center">
      <img
        src={spinner}
        alt="loading"
        style={{ width: "200px", margin: "auto", dispay: "block" }}
      />
    </div>
  );
}
