import React from "react";

function Display() {
  const categories = ["All", "Men", "Women", "New Arrival"];
  return (
    <div>
      <div>
        {categories.map((category, index) => (
          <span key={index}>{category}</span>
        ))}
      </div>
    </div>
  );
}

export default Display;
