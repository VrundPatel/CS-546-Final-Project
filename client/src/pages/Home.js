import { useEffect, useState } from "react";
import { Card, Button, Form, Col, Row, ToggleButton, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as api from "../api/endpoints";
import axios from "axios";
import Layout from "./layout";
import ReactPaginate from "react-paginate";
import './home.css';

export default function Restrooms() {
  const [restrooms, setRestrooms] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
	const [going, setGoing] = useState(false);

  // useEffect(() => {
  //   api.getAllRestrooms().then((res) => {
  //     setRestrooms(res);
  //   });
  // }, []);

  const navigate = useNavigate();

  const initialState = {
    searchTerm: '',
    checked: 1,
    activeFilters: []
  };


  const [genderNeutralCheckState, setGenderNeutralCheckState] = useState(false);
  const [adaCheckState, setAdaCheckState] = useState(false);
  const [stationCheckState, setStationCheckState] = useState(false);
  const [buyCheckState, setBuyCheckState] = useState(false);
  const [keyCheckState, setKeyCheckState] = useState(false);
  const [ampleCheckState, setAmpleCheckState] = useState(false);
  const [seatCoverCheckState, setSeatCoverCheckState] = useState(false);
  const [noTouchCheckState, setNoTouchCheckState] = useState(false);
  const [resetCheckState, setResetCheckState] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const { searchTerm } = formState;
	const [searchState, setSearchState] = useState(false);

  // const onSearchSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post(`http://localhost:9000/search`, {
  //       "searchRestrooms": searchTerm
  //     });
	// 		setSearchState(true);
  //     setRestrooms(data);
  //   } catch (e) {
  //     alert('Error')
  //   }
  // }

  const onLocationSubmit = async (event) => {
    event.preventDefault();
    console.log("searching by device location");
    // Fetch device location
    if (!navigator.geolocation) {
      setStatus("Can't get location, try a different browser");
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          try {
            const { data } = await axios.get(`http://localhost:9000/search/${position.coords.latitude}/${position.coords.longitude}`);
            setRestrooms(data);
						setSearchState(true);
            setLoading(false)
          } catch (e) {
            alert('Error')
            setLoading(false)
          }
        },
        () => {
          setStatus("Unable to retrieve your location");
          setLoading(false)
        }
      );
    }
  }

	const onGottaGoSubmit = async (event) => {
    event.preventDefault();
    // Fetch device location
    if (!navigator.geolocation) {
      setStatus("Can't get location, try a different browser");
    } else {
      setGoing(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          try {
            const { data } = await axios.get(`http://localhost:9000/search/${position.coords.latitude}/${position.coords.longitude}`);
            setRestrooms(data);
            setGoing(false)
						window.open(
							`https://www.google.com/maps/dir/?api=1&destination=${data[0].streetAddress}`,
							"_blank"
							)
          } catch (e) {
            alert('Error')
            setGoing(false)
          }
        },
        () => {
          setStatus("Unable to retrieve your location");
          setGoing(false)
        }
      );
    }
  }

	function distanceToRestroom(deviceCoords, restroomCoords) {
		let deviceLat = deviceCoords.coords.latitude;
		let deviceLong = deviceCoords.coords.longitude;
		let restroomLat = restroomCoords.coordinates[1];
		let restroomLong = restroomCoords.coordinates[0];
		console.log("Device: " + deviceLat + ", " + deviceLong);
		console.log("Restroom: " + restroomLat + ", " + restroomLong);
	}

  const activeFilters = [genderNeutralCheckState, adaCheckState, stationCheckState, buyCheckState, keyCheckState, ampleCheckState, noTouchCheckState, seatCoverCheckState];

  const filteredRestrooms = restrooms.filter(filteredRestroom => {
    if (genderNeutralCheckState && !filteredRestroom.tags.includes("Gender-neutral")) {
      return false;
    }
    if (adaCheckState && !filteredRestroom.tags.includes("ADA compliant")) {
      return false;
    }
    if (stationCheckState && !filteredRestroom.tags.includes("Baby-changing")) {
      return false;
    }
    if (buyCheckState && !filteredRestroom.tags.includes("Gotta buy something")) {
      return false;
    }
    if (keyCheckState && !filteredRestroom.tags.includes("Ask for key")) {
      return false;
    }
    if (ampleCheckState && !filteredRestroom.tags.includes("Ample stalls")) {
      return false;
    }
    if (seatCoverCheckState && !filteredRestroom.tags.includes("Seat covers")) {
      return false;
    }
    if (noTouchCheckState && !filteredRestroom.tags.includes("No-touch")) {
      return false;
    }
    return filteredRestroom;
  });

	// React-Paginate Components
	// Invoke when user click to request another page.
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;
	const endOffset = itemOffset + itemsPerPage;
	const items = filteredRestrooms.slice(itemOffset, endOffset);
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredRestrooms.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredRestrooms.length / itemsPerPage);

	const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredRestrooms.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

	console.log(searchState);
	console.log(filteredRestrooms);

  return (
    <>
      <Layout>
				<div className='location-button-container'>
            <Button className='location-button' variant="primary" type="submit" size="lg" onClick={onLocationSubmit} disabled={loading}>
						&#128205; {loading ? "Searching..." : "Search Nearby"}
            </Button>
				</div>
				<br />
				<div className='gottago-button-container'>
            <Button className='location-button' variant="primary" type="submit" size="lg" onClick={onGottaGoSubmit} disabled={going}>
						&#127939; {going ? "Going..." : "GottaGo"}
            </Button>
				</div>
				<hr />
        <div className='filter-container'>
          <Form className='filter-form' onSubmit={onLocationSubmit}>
            <Form.Label><h2>Filters</h2></Form.Label>
            <br />
            <ToggleButton
              id="gender-neutral-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={genderNeutralCheckState}
              value="1"
              onChange={(e) => {
                setGenderNeutralCheckState(e.currentTarget.checked);
              }}
            >
              Gender-neutral
            </ToggleButton>
            {" "}
            <ToggleButton
              id="ada-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={adaCheckState}
              value="1"
              onChange={(e) => {
                setAdaCheckState(e.currentTarget.checked);
              }}
            >
              ADA compliant
            </ToggleButton>
            {" "}
            <ToggleButton
              id="station-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={stationCheckState}
              value="1"
              onChange={(e) => {
                setStationCheckState(e.currentTarget.checked);
              }}
            >
              Baby-Changing Station
            </ToggleButton>
            {" "}
            <ToggleButton
              id="buy-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={buyCheckState}
              value="1"
              onChange={(e) => {
                setBuyCheckState(e.currentTarget.checked);
              }}
            >
              Gotta Buy Something
            </ToggleButton>
            {" "}
            <ToggleButton
              id="key-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={keyCheckState}
              value="1"
              onChange={(e) => {
                setKeyCheckState(e.currentTarget.checked);
              }}
            >
              Ask For Key
            </ToggleButton>
            {" "}
            <ToggleButton
              id="ample-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={ampleCheckState}
              value="1"
              onChange={(e) => {
                setAmpleCheckState(e.currentTarget.checked);
              }}
            >
              Ample stalls
            </ToggleButton>
            {" "}
            <ToggleButton
              id="no-touch-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={noTouchCheckState}
              value="1"
              onChange={(e) => {
                setNoTouchCheckState(e.currentTarget.checked);
              }}
            >
              No-touch
            </ToggleButton>
            {" "}
            <ToggleButton
              id="seat-covers-toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={seatCoverCheckState}
              value="1"
              onChange={(e) => {
                setSeatCoverCheckState(e.currentTarget.checked);
              }}
            >
              Seat covers
            </ToggleButton>
            {" "}
            <ToggleButton
              id="reset-toggle-check"
              type="checkbox"
              variant="secondary"
              checked={resetCheckState}
              value="1"
              onChange={() => {
                setGenderNeutralCheckState(false);
                setAdaCheckState(false);
                setStationCheckState(false);
                setBuyCheckState(false);
                setKeyCheckState(false);
                setAmpleCheckState(false);
                setSeatCoverCheckState(false);
                setNoTouchCheckState(false);
              }}
              disabled={!activeFilters.filter(Boolean).length}
            >
              Reset
            </ToggleButton>
          </Form>
        </div>
				<br />
        <hr />

        {/* Search Results with variable preprocesser filtering*/}
        <div>
          { loading &&
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
         
					<>
					<div className="results-container" hidden={!searchState}>
						<h2>{filteredRestrooms.length} Result{filteredRestrooms.length !== 1 ? "s" : ""}</h2>
						<p hidden={filteredRestrooms.length}>No results within 20 miles {":("}</p>
						<p hidden={!filteredRestrooms.length}>Showing results {itemOffset+1}-{filteredRestrooms.length > endOffset? endOffset: filteredRestrooms.length}</p>
						{items.map((outputRestroom, index) => {
							return (
								<Card key={outputRestroom._id} style={{ width: "32rem" }}>
									<Card.Body>
										<a href={"/restroom/" + outputRestroom._id}>{outputRestroom.streetAddress}</a>
										<br />
										{outputRestroom.city}, {outputRestroom.state} {outputRestroom.zipCode}
										<br />
										{distanceToRestroom(position, outputRestroom.loc)}
										<br />
										<div align="center">
											<Button className='navigate-button' variant="secondary" type="submit" onClick={
												(event) => {
													event.preventDefault();
													console.log("viewing restroom info");
													navigate(`/restroom/${outputRestroom._id}`);
												}
											}>
												&#128270; View Info
											</Button>
											{" "}
											<Button className='navigate-button' variant="primary" type="submit" onClick={
												(event) => {
													event.preventDefault();
													console.log("navigating");
													window.open(
														`https://www.google.com/maps/dir/?api=1&destination=${outputRestroom.streetAddress}`,
														"_blank"
														)
												}
											}>
												&#10138; Navigate
											</Button>
										</div>
									</Card.Body>
								</Card>
							);
						})}
						<ReactPaginate
							containerClassName="pagination"
							activeClassName="active"
							pageClassName="page-item"
							pageLinkClassName="page-link"
							previousClassName="page-item"
							previousLinkClassName="page-link"
							nextClassName="page-item"
							nextLinkClassName="page-link"
							breakClassName="page-item"
							breakLinkClassName="page-link"
							breakLabel="..."
							nextLabel="Next"
							onPageChange={handlePageClick}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							pageCount={pageCount}
							previousLabel="Previous"
							renderOnZeroPageCount={null}
						/>
					</div>
					</>
        </div>
      </Layout>
    </>
  );
}
