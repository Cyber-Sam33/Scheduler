import React from "react";
import classNames from "classnames";

import "components/Button.scss";
// Base uses no props and is considered the default button
export default function Button(props) {
  const buttonClass = classNames("button", {
    // Confirm uses the confirm prop to apply the .button--confirm modifier class
    "button--confirm": props.confirm,
    // Danger uses the danger prop to apply the .button--danger modifier class
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}

      // Clickable uses the onClick prop to handle the button click event
      onClick={props.onClick}

      // Disabled uses the disabled prop to apply the disabled attribute to the button element
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}






