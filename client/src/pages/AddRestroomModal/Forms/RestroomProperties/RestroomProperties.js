import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import RestroomHours from "./RestroomHours";
import RestroomTags from "./RestroomTags";

function RestroomProperties(props) {
  const [openHours, setOpenHours] = useState(false);
  const [closeHours, setCloseHours] = useState(false);

  function onNext() {
    props.nextStep(3);
  }

  function onPrev() {
    props.nextStep(props.step - 1);
  }

  return (
    <Form noValidate>
      <Row className="mb-3">
        <RestroomHours
          populate={props.populate}
          obj={props.obj}
          validOpen={setOpenHours}
          validClose={setCloseHours}
        />
      </Row>
      <Row className="mb-3">
        <RestroomTags populate={props.populate} obj={props.obj} />
      </Row>
      <Row>
        <Col>
          <Button
            onClick={onNext}
            disabled={!(props.obj.openingHours && props.obj.closingHours)}
          >
            Next
          </Button>
        </Col>
        <Col>
          <Button onClick={onPrev} disabled={props.step === 1 ? true : false}>
            Prev
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RestroomProperties;
