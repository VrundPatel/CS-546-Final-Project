import { Fragment, useState } from "react";
import { Alert, Button, Col, Row, Spinner, Table } from "react-bootstrap";

export default function RestroomFinalize(props) {
  let taglist;
  if (props.obj.tags) {
    taglist = getTagsString(props.obj.tags);
  }

  let hours;
  if (props.obj.openingHours && props.obj.closingHours) {
    hours = getHoursString(props.obj.openingHours, props.obj.closingHours);
  }

  function onNext() {
    props.nextStep(3);
  }

  function onPrev() {
    props.nextStep(props.step - 1);
  }

  return (
    <Fragment>
      <h4>Finalize</h4>
      <Row>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Street Address</td>
              <td>
                <strong>{props.obj.streetAddress}</strong>
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <strong>{props.obj.city}</strong>
              </td>
            </tr>
            <tr>
              <td>State</td>
              <td>
                <strong>{props.obj.state}</strong>
              </td>
            </tr>
            <tr>
              <td>Zipcode</td>
              <td>
                <strong>{props.obj.zipCode}</strong>
              </td>
            </tr>
            <tr>
              <td>Hours</td>
              <td>
                <strong>{hours}</strong>
              </td>
            </tr>
            <tr>
              <td>Tags</td>
              <td>
                <strong>{taglist}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <Button onClick={props.submit}>Submit</Button>
        </Col>
        <Col>
          {props.posting === true ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <></>
          )}
          {props.error ? (
            <Alert variant={"danger"}>{props.error}</Alert>
          ) : (
            <></>
          )}
        </Col>
        <Col>
          <Button onClick={onPrev} disabled={props.step === 1 ? true : false}>
            Prev
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}

function getHoursString(open, close) {
  if (open === "25:00") {
    return "Don't know";
  }
  return open + " - " + close;
}

function getTagsString(obj) {
  let retlist = "";
  for (const [key, value] of Object.entries(obj)) {
    retlist = retlist + `${key}, `;
  }
  console.log(retlist);
  return retlist.substring(0, retlist.length - 2);
}
