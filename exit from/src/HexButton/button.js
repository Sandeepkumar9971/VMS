import React from "react";
import "./button.css";

export default function Button(props) {
  return (
    <div>
      <button
        id={props.id}
        className={`btncls ${props.className != undefined? props.className:"" }`}
        onClick={(e) => props.onClick && props.onClick(e)}
      >
        {props.buttonTitle}
      </button>
    </div>
  );
}
