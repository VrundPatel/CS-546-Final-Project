import { useState } from "react";
import { Badge, Button, Card, Modal, Table, Form } from "react-bootstrap";

function InfoCard(props) {
  console.log(props);
  const { onReport } = props;
  const {
    _id: id,
    streetAddress,
    city,
    state,
    zipCode,
    openingHours,
    closingHours,
    tags,
    overallRating,
    lastUpdated
  } = props.restroomData;

  const [show, setShow] = useState(false);
  const [reportReason, setReportReason] = useState(null);

  const handleClose = () => {
    onReport(reportReason)
    setShow(false);
  }
  
  const handleShow = () => setShow(true);

  const onOptionChange = (e) => {
    console.log(e);
    setReportReason(e.target.value);
  }

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>
            <h1>{`${streetAddress}, ${city}, ${state}, ${zipCode}`}</h1> <br />
						<Button className='navigate-button' variant="primary" type="submit" onClick={
							(event) => {
								event.preventDefault();
								window.open(
									`https://www.google.com/maps/dir/?api=1&destination=${streetAddress}`,
									"_blank"
									)
							}
						}>
							&#10138; Navigate
						</Button>
          </Card.Title>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Hours</td>
                <td>
									{((openingHours == "25:00" && closingHours == "25:00") ? "Unavailable" : `${openingHours}-${closingHours}`)}
                </td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>
                  {tags.map((tag, idx) => {
                    return (
                      <Badge pill bg="primary" key={tag}>
                        {tag}
                      </Badge>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td>overallRating</td>
                <td>{overallRating}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button size="sm" onClick={handleShow}>Report</Button>
        </Card.Footer>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select aria-label="Default select example" onChange={onOptionChange}>
              <option>Choose the reason</option>
              <option value="Down for maintenance">Down for maintenance</option>
              <option value="Drainage Issues">Drainage Issues</option>
              <option value="Broken">Broken</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoCard;
