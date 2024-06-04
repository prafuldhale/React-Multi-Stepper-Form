import { useEffect, useState } from "react";
import "../App.css";
import PersonalInformation from "./PersonalInformation";
import React from "react";
import OtherDetails from "./OtherDetails";
import DocumentHandling from "./DocumentHandling";
import ShowDetails from "./ShowDetails";
export default function Stepper() {
  const [step, setStep] = useState(0);
  const [personalInformation, setPersonalInformation] = useState({});
  const [otherDetails, setOtherDetails] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({});
  useEffect(() => {});

  return (
    <>
      {step !== 3 && (
        <div className="line-container">
          <div
            className={`circle ${step === 0 ? "active" : ""}  ${
              step === 1 ? "completedStep" : ""
            }`}
          >
            1
          </div>
          <div className="progress" />
          <div
            className={`circle ${step === 1 ? "active" : ""}  ${
              step === 2 ? "completedStep" : ""
            }`}
          >
            2
          </div>
          <div className="progress" />
          <div
            className={`circle ${step === 2 ? "active" : ""}  ${
              step === 3 ? "completedStep" : ""
            }`}
          >
            3
          </div>
        </div>
      )}

      {step === 0 && (
        <PersonalInformation
          setStep={setStep}
          personalInformation={personalInformation}
          setPersonalInformation={setPersonalInformation}
        ></PersonalInformation>
      )}
      {step === 1 && (
        <OtherDetails
          setStep={setStep}
          otherDetails={otherDetails}
          setOtherDetails={setOtherDetails}
        ></OtherDetails>
      )}
      {step === 2 && (
        <DocumentHandling
          setStep={setStep}
          previewUrls={previewUrls}
          setPreviewUrls={setPreviewUrls}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        ></DocumentHandling>
      )}
      {step === 3 && (
        <ShowDetails
          setStep={setStep}
          previewUrls={previewUrls}
          uploadedFiles={uploadedFiles}
          personalInformation={personalInformation}
          otherDetails={otherDetails}
        ></ShowDetails>
      )}
    </>
  );
}
