import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestroomAddress from "./Forms/RestroomAddress/RestroomAddress";
import RestroomProperties from "./Forms/RestroomProperties/RestroomProperties";
import RestroomFinalize from "./RestroomFinalize";
import axios from "axios";
import { propTypes } from "react-bootstrap/esm/Image";

function RestroomForm(props) {
  const navigate = useNavigate();
  const [requestObj, setRequestObj] = useState({});
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  console.log("Updated object to:", requestObj);

  function buildFinalResponseObj() {
    //get object as it stands
    let resp = structuredClone(requestObj);

    //set the author
    resp["author"] = "HarryT";

    //convert tags from object into array
    let arrTags = [];
    for (const [key, value] of Object.entries(requestObj.tags)) {
      console.log(`item : ${key}: ${value}`);
      arrTags.push(key);
    }
    resp.tags = arrTags;

    return resp;
  }

  async function submitForm() {
    setPosting(true);
    //get the final object
    let finalResponse = buildFinalResponseObj();
    let response;
    try {
      response = await axios.post(
        "http://localhost:9000/restrooms",
        finalResponse
      );
    } catch (e) {
      console.log(e);
      setError(e.message);
      setPosting(false);
      return;
    }

    console.log(response.data.newObj._id);
    //post data
    setPosting(false);
    props.setShow(false);
    navigate(`/restroom/${response.data.newObj._id}`);
  }

  return (
    <Fragment>
      {step === 1 ? (
        <RestroomAddress
          populate={populateObject}
          obj={requestObj}
          nextStep={setStep}
          step={step}
        />
      ) : (
        <></>
      )}
      {step === 2 ? (
        <RestroomProperties
          populate={populateObject}
          obj={requestObj}
          nextStep={setStep}
          step={step}
        />
      ) : (
        <></>
      )}
      {step === 3 ? (
        <RestroomFinalize
          populate={populateObject}
          obj={requestObj}
          submit={submitForm}
          confirm={result}
          nextStep={setStep}
          step={step}
          posting={posting}
          error={error}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );

  function populateObject(obj) {
    setError(null);
    setRequestObj((requestObj) => ({
      ...requestObj,
      ...obj,
    }));
  }
}

export default RestroomForm;
