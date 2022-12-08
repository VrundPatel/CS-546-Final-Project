import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import AddRestroomModal from "./AddRestroomModal";

function AddRestroomButton() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add a Restroom
      </Button>

      <AddRestroomModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
}

export default AddRestroomButton;
