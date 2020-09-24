import React from "react";

import Icon from "Components/Icon";

import "./style.scss";

const Button = ({ children, options }) => {
  let classes = ["button"];

  if (!!options?.classes) {
    classes = classes.concat(options?.classes);
  }

  if (!!options?.round) {
    classes.push("round");
  }

  if (!!options?.transparent) {
    classes.push("transparent");
  }

  if (!!options?.colorful) {
    classes.push("colorful");
  }

  if (!!options?.icon) {
    classes.push("icon-button");
  }

  return (
    <>
      {!options?.icon && (
        <button
          type={options?.type || "button"}
          className={classes.join(" ")}
          onClick={options?.onClick}
        >
          {children}
        </button>
      )}

      {!!options?.icon && (
        <button
          type={options?.type || "button"}
          className={classes.join(" ")}
          onClick={options?.onClick}
        >
          <Icon value={options?.icon} options={{ small: true }} />
          <span className="button-text">{children}</span>
          <span></span>
        </button>
      )}
    </>
  );
};

export default Button;
