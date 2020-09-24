import React from "react";

import "./style.scss";

const Input = ({ options }) => {
  let classes = ["input"];

  if (!!options?.classes) {
    classes = classes.concat(options?.classes);
  }

  return (
    <input
      placeholder={options?.placeholder || "Digite aqui"}
      className={classes.join(" ")}
      value={options.value}
      onChange={options?.onChange}
    />
  );
};

export default Input;
