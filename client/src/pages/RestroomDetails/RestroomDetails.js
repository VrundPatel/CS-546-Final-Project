import { Accordion, Badge, Col, Row, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import WriteReview from "./WriteReview";
import Layout from "../layout";
import axios from "axios";

export default function RestroomDetails() {
  const [restroomData, setRestroomData] = useState(null);
  const [ready, setReady] = useState(false);
  const [review, setReview] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    setReady(false);
  }, [id]);

  const report = async (reason) => {
    const { data } = await axios.post(`http://localhost:9000/reports/${id}`, {
      restroomId: id,
      value: reason,
    });
    setRestroomData(data);
  };
    setRestroomData(data);
  }


  //useEffect to get restroom by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:9000/restrooms/${id}`);
        setRestroomData(resp.data);
        setReady(true);
        setReview(null);
      } catch (e) {
        console.log(e);
        return;
      }
    }
    fetchData();
  }, [id, review]);

  return (
    <Layout>
      {ready ? (
        <Container>
          <Row>
            <Col>
              <InfoCard restroomData={restroomData} onReport={report} />
            </Col>
          </Row>
          <Row>
            <Col xl={8} lg={8} md={6} sm={6}>
              <Row>
                <Col>
                  <Reviews restroomData={restroomData} />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Reports</Accordion.Header>
                      <Accordion.Body>
                        {
                          restroomData?.reports.map((item) => {
                            return (
                              <Card key={item?._id}>
                                <Card.Body>
                                  {`${item.value}`}
                                  <Badge pill bg="primary" style={{ float: 'right' }}>
                                    {item.reportedAt}
                                  </Badge>
                                </Card.Body>
                              </Card>
                            )
                          })
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <ul></ul>
                </Col>
              </Row>
            </Col>
            <Col xl={4} lg={4} md={6} sm={6}>
              <WriteReview restroomData={restroomData} setReview={setReview} />
            </Col>
          </Row>
        </Container>
      ) : (
        <h2>LOADING</h2>
      )}
    </Layout>
  );
}
