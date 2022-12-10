import { Fragment } from "react";
import {Card, ListGroup } from "react-bootstrap";

function Reports(props) {
  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header as="h5">Reports</Card.Header>
        <Card.Body>
          <ListGroup as="ul">
            {props.data.Reports.map((report, idx) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={idx}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {report.userId}
                    </div>
                    {report.value}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default Reports;