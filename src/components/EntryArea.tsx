import React, { FormEventHandler } from "react";
import TextArea from "./form/TextArea";

interface EntryAreaProps {
  onSubmit: FormEventHandler;
  onChange: Function;
}

const EntryArea = (props: EntryAreaProps) => {
  return (
    <form onSubmit={props.onSubmit} className="mt-3">
      <h3>Yeni Entry</h3>
      <TextArea onChange={props.onChange} />
      <button className="btn btn-primary">Paylaş</button>
    </form>
  );
};

export default EntryArea;
