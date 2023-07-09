import React from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

const SelectionList = ({ items, selected, onChange }) => {

  return (
    <div key={uuidv4()} className="select-list">
      {items.map((item, index) => (
        <div key={"wrapper-" + uuidv4()} className="select-item-wrapper">
          <div
            className="select-item-text"
            onClick={() => onChange(index)}
            style={{
              backgroundColor: selected === index ? item.color : "transparent",
              padding: "10px",
              borderRadius: "5px",
              margin: "5px",
              cursor: "pointer",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {item.label}
          </div>
          <div
            className="select-item-color"
            style={{
              width: "100px",
              height: "20px",
              backgroundColor: item.color,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SelectionList;
