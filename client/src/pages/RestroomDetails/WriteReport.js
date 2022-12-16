import { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function WriteReport() {
  const [reports, setReports] = useState("");

  console.log(reports);
  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submit");
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeReports = (e) => {
    setReports(e.target.value);
  };

  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header as="h5">Write a report</Card.Header>
        <Card.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Reports</Form.Label>
              <Form.Control
                onChange={onChangeReports}
                as="textarea"
                rows="7"
                placeholder="Write a report here!"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default WriteReport;
