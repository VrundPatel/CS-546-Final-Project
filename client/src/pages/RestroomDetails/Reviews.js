import { Fragment } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";

function Reviews(props) {
  console.log(typeof props);
  console.log(typeof props.reviews);
  return (
    <Fragment class="overflow-auto">
      <Card className="text-center">
        <Card.Header as="h5">Reviews</Card.Header>
        <Card.Body>
          <ListGroup as="ul">
            {props.data.reviews.map((review, idx) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {review.userId}
                      <Badge style={{ marginLeft: "1vw" }} bg="primary" pill>
                        {review.rating}
                      </Badge>
                    </div>
                    {review.reviewText}
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

export default Reviews;
