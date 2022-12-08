import { Form, Col } from "react-bootstrap";

export default function StreetAddressGroup(props) {
  let error = "";
  return (
    <Form.Group as={Col} controlId="StreetAddress">
      <Form.Label>Street Address</Form.Label>
      <Form.Control
        type="text"
        defaultValue={props.obj.streetAddress}
        placeholder="Ex: 1 Castle Point Terrace"
        onChange={(e) => {
          props.populate({ streetAddress: e.target.value });
        }}
        isInvalid={!validateStreetAddress(props.obj.streetAddress)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  function validateStreetAddress(str) {
    if (!str) {
      error = "Cannot be blank";
      props.validCB(false);
      return false;
    }
    props.validCB(true);
    return true;
  }
}
