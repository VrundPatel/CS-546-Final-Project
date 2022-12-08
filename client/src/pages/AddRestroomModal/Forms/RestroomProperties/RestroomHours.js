import { Fragment, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function RestroomHours(props) {
  const [radioK, setRadioK] = useState(false);
  const [radioDK, setRadioDK] = useState(false);
  const [radio24H, setRadio24H] = useState(false);
  console.log(props.obj);
  const handleKnow = (e) => {
    setRadioK(true);
    setRadioDK(false);
    setRadio24H(false);
  };

  const handleDontKnow = (e) => {
    props.populate({ openingHours: "25:00", closingHours: "25:00" });

    setRadioK(false);
    setRadioDK(true);
    setRadio24H(false);
  };

  const handle24Hour = (e) => {
    props.populate({ openingHours: "00:00", closingHours: "23:59" });

    setRadioK(false);
    setRadioDK(false);
    setRadio24H(true);
  };

  return (
    <Fragment>
      <h4>When is it available?</h4>
      <Row>
        <Col>
          <Form.Check
            inline
            name="g1"
            type={"radio"}
            label={"I know the actual hours"}
            onChange={handleKnow}
          />
          <Form.Check
            inline
            name="g1"
            type={"radio"}
            label={"Don't know hours"}
            onChange={handleDontKnow}
          />
          <Form.Check
            inline
            name="g1"
            type={"radio"}
            label={"Its open 24 hours"}
            onChange={handle24Hour}
          />
        </Col>
      </Row>
      {radioK ? (
        <Row>
          <Col>
            <FloatingLabel controlId="open" label="Opening Time">
              <Form.Control
                value={props.obj.openingHours}
                onChange={(e) => {
                  props.populate({ openingHours: e.target.value });
                }}
                type="time"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="close" label="Closing Time">
              <Form.Control
                value={props.obj.closingHours}
                onChange={(e) => {
                  props.populate({ closingHours: e.target.value });
                }}
                type="time"
              />
            </FloatingLabel>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </Fragment>
  );
}
