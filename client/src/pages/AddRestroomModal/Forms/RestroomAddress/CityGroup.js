import { Form, Col } from "react-bootstrap";

export default function CityGroup(props) {
  let error = "";
  return (
    <Form.Group as={Col} md="6" controlId="City">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        defaultValue={props.obj.city}
        placeholder="Ex: Hoboken"
        onChange={(e) => {
          props.populate({ city: e.target.value });
        }}
        isInvalid={!validateCity(props.obj.city)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  function validateCity(str) {
    if (!str) {
      error = "Cannot be blank";
      props.validCB(false);
      return false;
    }
    if (/\d/.test(str)) {
      error = "Must be a valid city (no digits)";
      props.validCB(false);
      return false;
    }
    props.validCB(true);
    return true;
  }
}
