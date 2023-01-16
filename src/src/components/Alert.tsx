import React from "react";

interface AlertProps {
  className: string;
  message: string;
}

const Alert = (props: AlertProps) => {
  return (
    <div className={"alert " + props.className} role="alert">
      {props.message}
    </div>
  );
};

export default Alert;
