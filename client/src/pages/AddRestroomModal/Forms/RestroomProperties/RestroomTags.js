import { Fragment, useEffect, useState } from "react";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

let tags = [
  { tag: "Gender-neutral", desc: "No male/female designation" },
  { tag: "ADA compliant", desc: "Friendly to people with disabilities" },
  { tag: "Baby-changing", desc: "Has a baby changing station" },
  { tag: "Gotta buy something", desc: "Need to purchase something to use" },
  { tag: "Ask for key", desc: "Have to ask for key for access" },
  { tag: "Ample stalls", desc: "Has more toilets than average" },
  {
    tag: "No-touch",
    desc: "Bathroom functions can be used without direct contact (sensors)",
  },
  { tag: "Seat covers", desc: "Provides seat covers" },
];

let activeTags = {};

export default function RestroomTags(props) {
  return (
    <Fragment>
      <h4>Select all that apply</h4>
      <Row xs={2} sm={2} md={4} className="g-2">
        {tags.map((tag, idx) => (
          <Col key={idx}>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip id={`tooltip-${tag.tag}`}>{tag.desc}</Tooltip>}
            >
              <Form.Check
                checked={tag.tag in activeTags}
                name="g1"
                type={"checkbox"}
                label={tag.tag}
                onChange={(e) => {
                  console.log(tag.tag, e.target.checked);
                  if (!(tag.tag in activeTags)) {
                    activeTags[tag.tag] = tag.desc;
                    props.populate({ tags: activeTags });
                  } else {
                    delete activeTags[tag.tag];
                    props.populate({ tags: activeTags });
                  }
                }}
              />
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
}
