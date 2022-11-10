import React from "react";
import "./EntryArticle.css";

const EntryArticle = (props) => {
  return (
    <div className="row d-flex justify-content-center">
      <article className="entry col-lg-8 align-center" align="center">
        <p>{props.entry}</p>
        <footer>
          <h6>{props.author}</h6>
          <p>{props.footer}</p>
        </footer>
      </article>
    </div>
  );
};

export default EntryArticle;
