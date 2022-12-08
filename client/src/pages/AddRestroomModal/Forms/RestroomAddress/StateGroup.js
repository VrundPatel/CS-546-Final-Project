import { Form, Col, ProgressBar } from "react-bootstrap";

export default function CityGroup(props) {
  let error = "";
  return (
    <Form.Group as={Col} md="3" controlId="State">
      <Form.Label>State</Form.Label>
      <Form.Control
        type="text"
        defaultValue={props.obj.state}
        placeholder="Ex: NJ"
        onChange={(e) => {
          props.populate({ state: e.target.value });
        }}
        isInvalid={!validateState(props.obj.state)}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );

  function validateState(str) {
    if (!str) {
      error = "Cannot be blank";
      props.validCB(false);
      return false;
    }
    if (!(str in props.states)) {
      error = "Must be a valid state abbreviation (NJ, NY, CA, etc)";
      props.validCB(false);
      return false;
    }
    props.validCB(true);
    return true;
  }
}
