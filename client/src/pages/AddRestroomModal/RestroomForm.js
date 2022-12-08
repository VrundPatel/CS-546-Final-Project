import { Fragment, useState } from "react";
import RestroomAddress from "./Forms/RestroomAddress/RestroomAddress";
import RestroomProperties from "./Forms/RestroomProperties/RestroomProperties";
import RestroomFinalize from "./RestroomFinalize";
import axios from "axios";

function RestroomForm() {
  const [requestObj, setRequestObj] = useState({});
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  console.log("Updated object to:", requestObj);

  async function submitForm() {
    //Add extra data
    requestObj["author"] = "HarryT";
    try {
      const sub = await axios.post(
        "http://localhost:9000/restrooms",
        requestObj
      );
    } catch (e) {
      console.log(e);
    }

    console.log("SUBMIT");
    //post data
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
        />
      ) : (
        <></>
      )}
    </Fragment>
  );

  function populateObject(obj) {
    setRequestObj((requestObj) => ({
      ...requestObj,
      ...obj,
    }));
  }
}

export default RestroomForm;
