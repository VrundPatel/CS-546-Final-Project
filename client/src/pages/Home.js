import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Link, useNavigate } from "react-router-dom";
import * as api from '../api/endpoints';
import axios from 'axios';
import Layout from "./layout";

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    api.getAllRestrooms().then((res) => {
      setRestrooms(res);
    });
  }, []);

	const navigate = useNavigate();

  const initialState = {
    searchTerm: '',
    checked: 1,
    deviceLat: '',
    deviceLong: ''
  };

  const [adaCheckState, setAdaCheckState] = useState(false);
  const [genderNeutralCheckState, setGenderNeutralCheckState] = useState(false);
  const [stationCheckState, setStationCheckState] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [deviceLat, deviceLong] = useState(initialState);
  const { searchTerm } = formState;

  const handleOnChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const onSearchSubmit = async (event) => {
    event.preventDefault();
		console.log("searching by term");
    try {
      const { data } = await axios.post(`http://localhost:9000/search`, {
        "searchRestrooms": searchTerm
      });
      if (!!data) {
        console.log('data returned ', data);
        setRestrooms(data);
        // const foundRestroom = await compare(searchTerm, data.streetAddress);
        // const foundRestroom = null;
        // if (foundRestroom) {
        //   setRestrooms(data);
        // }
        // else {
        //   alert(`Not Found! No such a restroom`);
        // }
      }
    } catch (e) {
      alert('Error')
    }
  }

	const onLocationSubmit = async (event) => {
    event.preventDefault();
		console.log("searching by location");
    try {
      const { data } = await axios.get(`http://localhost:9000/search`, {
        "lat": deviceLat,
        "long": deviceLong
      });
			console.log('data returned ', data);
    } catch (e) {
      alert('Error')
    }
  }

  return (
    <>
      <Layout>
        <div className='search-bar-container'>
          <Form className='search-form' onSubmit={onSearchSubmit}>
            <h2 style={{ 'textAlign': 'center' }}>GottaGo</h2>
            <Row className="mb-3">
              <Form.Label>Search</Form.Label>
              <Col>
                <Form.Control
                  onChange={handleOnChange}
                  value={searchTerm}
                  name="searchTerm"
                  type="searchTerm"
                  placeholder="Enter search term" />
              </Col>
              <Col>
                <Button variant="primary" type="submit" disabled={!searchTerm}>
                  Search
                </Button>
              </Col>
            </Row>
            <div className='location-button-container'>
              <Button className = 'location-button' variant="primary" type="submit">
                  TODO: Closest Near Me
              </Button>
            </div>
          </Form>
        </div>

        <div className='filter-container'>
          <Form className='filter-form' onSubmit={onSearchSubmit}>
            <Row className="mb-3">
              <Form.Label>Filters</Form.Label>
              <Col>
                <ToggleButton
                  id="ada-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={adaCheckState}
                  value="1"
                  onChange={(e) => setAdaCheckState(e.currentTarget.checked)}
                >
                  ADA
                </ToggleButton>
              </Col>
              <Col>
                <ToggleButton
                  id="gender-netural-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={genderNeutralCheckState}
                  value="1"
                  onChange={(e) => setGenderNeutralCheckState(e.currentTarget.checked)}
                >
                  Gender-Neutral
                </ToggleButton>
              </Col>
              <Col>
                <ToggleButton 
                  id="station-toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={stationCheckState}
                  value="1"
                  onChange={(e) => setStationCheckState(e.currentTarget.checked)}
                >
                  Baby-Changing Station
                </ToggleButton>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Search Results with preprocessing filter*/}
        <div>
          <h2> Results </h2>
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
