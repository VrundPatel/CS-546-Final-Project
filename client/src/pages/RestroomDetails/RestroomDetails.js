import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import WriteReview from "./WriteReview";
import Layout from "../layout";
import axios from "axios";

let testData = {
  _id: "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
  streetAddress: "123 Main Street",
  city: "NYC",
  state: "NY",
  zipCode: "12345",
  overallRating: 2.0,
  openingHours: "10AM",
  closingHours: "10PM",
  availability: "['gendered', 'gender-neutral']",
  amenities: "['ADA', 'baby-changing station']",
  reviews: [
    {
      _id: "7c7997a2-c0d2-4f8c-b27a-6a1d4b5b6acd",
      reviewText: "Nice and clean place",
      userId: "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
      rating: 2.0,
    },
    {
      _id: "7c7997a2-c0d2-4f8c-b27a-6a1d4b5b6ace",
      reviewText:
        "Nice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean placeNice and clean place",
      userId: "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
      rating: 2.0,
    },
  ],
  reports: [
    {
      _id: "7e7997a2-c0d2-4f8c-b27a-6a1d4b5b6916",
      value: "Down for maintenance",
      userId: "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    },
    {
      _id: "7e7997a2-c0d2-4f8c-b27a-6a1d4b5b6917",
      value: "Permanently closed",
      userId: "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    },
  ],
};

export default function RestroomDetails() {
  const [restroomData, setRestroomData] = useState(null);
  const [ready, setReady] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    setReady(false);
  }, [id]);

  //useEffect to get restroom by ID
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:9000/restrooms/${id}`);
        setRestroomData(resp.data);
        console.log(resp.data);
        setReady(true);
      } catch (e) {
        console.log(e);
        return;
      }
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {ready ? (
        <Container>
          <Row>
            <Col>
              <InfoCard restroomData={restroomData} />
            </Col>
          </Row>
          <Row>
            <Col xl={8} lg={8} md={6} sm={6}>
              <Reviews restroomData={restroomData} />
            </Col>
            <Col xl={4} lg={4} md={6} sm={6}>
              <WriteReview />
            </Col>
          </Row>
        </Container>
      ) : (
        <h2>LOADING</h2>
      )}
    </Layout>
  );
}
