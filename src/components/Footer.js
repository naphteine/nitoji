import React from "react";

const Footer = () => {
  const newDate = new Date();
  const currentYear = newDate.getFullYear();
  let dateDisplay = "2022";
  if (currentYear !== dateDisplay) {
    dateDisplay = "2022-" + currentYear;
  }
  return (
    <footer>
      All rights reserved. Nitoji (c) {dateDisplay}.{" "}
      <a href="https://gguilt.com">gguilt</a>
    </footer>
  );
};

export default Footer;
