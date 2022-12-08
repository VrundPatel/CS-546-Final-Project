import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import * as api from "../api/endpoints";
import Layout from "./layout";

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    });
  }, []);

  return (
    <>
      <Layout>
        <div>
          {restrooms.map((restroom, index) => {
            return (
              <Card key={restroom._id} style={{ width: "18rem" }}>
                <Card.Body>
                  {restroom.streetAddress}
                  <br />
                  {restroom.city},{restroom.state}
                  {restroom.zipCode}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
