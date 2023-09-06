import React from "react";
import { AiFillDelete } from "react-icons/ai";
import "./DeleteButton.css";

function DeleteButton(props) {
  return (
    <>
      <button className="delete" onClick={props.onClick}>
        <AiFillDelete />
      </button>
    </>
  );
}

export default DeleteButton;
