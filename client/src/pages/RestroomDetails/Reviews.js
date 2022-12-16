import { Fragment } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";

function Reviews(props) {
  return (
    <Fragment>
      <Card className="text-center">
        <Card.Header as="h5">Reviews</Card.Header>
        <Card.Body>
          {props.restroomData.reviews.length > 0 ? (
            <ListGroup as="ul">
              {props.restroomData.reviews.map((review, idx) => {
                return (
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={idx}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        {/* {review.userName !== null
                          ? review.userName
                          : review.userId} */}
                        {review.userName ? review.userName : review.userId}
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
          ) : (
            <h2>No reviews yet. Be the first?</h2>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default Reviews;
