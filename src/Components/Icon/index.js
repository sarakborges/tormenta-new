import React from "react";

import Button from "Components/Button";

import "./style.scss";

const Icon = ({ value, options }) => {
  let classes = ["icon"];

  if (!!options?.classes) {
    classes = classes.concat(options?.classes);
  }

  if (!!options?.big) {
    classes.push("big");
  } else if (!!options?.small) {
    classes.push("small");
  } else if (!!options?.mini) {
    classes.push("mini");
  }

  if (!!options?.round) {
    classes.push("icon-round");
  }

  return (
    <>
      {(!options?.as || options?.as === "div") && (
        <div className={classes.join(" ")}>{value}</div>
      )}

      {options?.as === "button" && (
        <Button
          options={{
            classes,
            onClick: options?.onClick,
            transparent: options?.transparent,
          }}
        >
          {value}
        </Button>
      )}
    </>
  );
};

export default Icon;
