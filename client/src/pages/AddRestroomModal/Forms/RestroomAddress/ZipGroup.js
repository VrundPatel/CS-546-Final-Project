import { Form, Col } from "react-bootstrap";

export default function ZipGroup(props) {
  let error = "";
  return (
    <Form.Group as={Col} md="3" controlId="Zip Code">
      <Form.Label>Zip Code</Form.Label>
      <Form.Control
        type="text"
        defaultValue={props.obj.zipCode}
        placeholder="Ex: 07030"
        onChange={(e) => {
          props.populate({ zipCode: e.target.value });
        }}
        isInvalid={!validateZip(props.obj.zipCode)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  function validateZip(str) {
    if (!str) {
      error = "Cannot be blank";
      props.validCB(false);
      return false;
    }
    if (!(/^[\d]{5}$/gm.test(str) || /^[\d-]{10}$/gm.test(str))) {
      error = "Please provide a valid US zip code";
      props.validCB(false);
      return false;
    }
    props.validCB(true);
    return true;
  }
}
