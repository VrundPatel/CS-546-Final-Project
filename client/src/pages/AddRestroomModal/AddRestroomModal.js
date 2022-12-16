import { Modal } from "react-bootstrap";
import RestroomForm from "./RestroomForm";

function AddRestroomModal(props) {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new restroom
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RestroomForm setShow={props.setShow} />
      </Modal.Body>
    </Modal>
  );
}

export default AddRestroomModal;
