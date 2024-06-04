import { useForm } from "react-hook-form";
import "../App.css";
import { error_icon } from "../asset/material-icon-name";
import { useState, useEffect } from "react";
import React from "react";
import {
  relations,
  identityNumberRegex,
  today,
  maxDate,
} from "../asset/constants";

function getDocumentRegex(v) {
  switch (v) {
    case "0":
      return identityNumberRegex[0];
    case "1":
      return identityNumberRegex[1];
    case "2":
      return identityNumberRegex[2];
    default:
      return null;
  }
}

function OtherDetails({ setStep, otherDetails, setOtherDetails }) {
  const [prevFormData, setPrevFormData] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [inputType, setInputType] = useState("text");

  const handleNext = (data) => {
    if (
      data.fName &&
      data.lName &&
      data.relation &&
      data.dob &&
      data.occupation &&
      data.doc &&
      data.identityNumber
    ) {
      setStep(2);
    }
  };
  const handlePrevious = () => {
    setStep(0);
  };
  let documentValue;

  useEffect(() => {
    documentValue = watch("doc");
    console.log(identityNumberRegex[documentValue]);
    watch((formData) => {
      console.log(formData);
      const hasNewValues =
        JSON.stringify(formData) !== JSON.stringify(prevFormData);
      if (hasNewValues) {
        setOtherDetails(formData);
        console.log("Personal Information:", formData);
        setPrevFormData(formData); // Update previous data for next comparison
      }
    });
  }, [watch, prevFormData, setOtherDetails]);

  return (
    <>
      <form onSubmit={handleSubmit(handleNext)}>
        <div
          className={`name-group ${
            errors.fName || errors.lName ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <input
              placeholder=" "
              {...register("fName", {
                required: true,
                pattern: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
              })}
              value={otherDetails.fName}
            />
            <label>Nominee First Name*</label>
            {errors.fName && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  A-Z, a-z only. No spaces before/after.
                </span>
              </span>
            )}
          </div>
          <div className="textfield">
            <input
              placeholder=" "
              value={otherDetails.lName}
              {...register("lName", {
                required: true,
                pattern: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
              })}
            />
            <label>Nominee Last Name*</label>
            {errors.lName && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  A-Z, a-z only. No spaces before/after.
                </span>
              </span>
            )}
          </div>
        </div>

        <div
          className={`name-group ${
            errors.relation || errors.dob ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <select
              name=""
              id=""
              placeholder=" "
              value={otherDetails.relation}
              {...register("relation", { required: true })}
              className={
                otherDetails.relation ? "labelMoveUp" : "labelMoveDown"
              }
            >
              <option className="dnone" value=""></option>
              {relations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              {/* </>
              )} */}
            </select>
            <label>Relation with AC Holder*</label>
            {errors.relation && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">Select Relation</span>
              </span>
            )}
          </div>
          <div className="textfield">
            <input
              type={inputType}
              placeholder=" "
              value={otherDetails.dob}
              {...register("dob", { required: true })}
              min={maxDate}
              max={today}
              className={otherDetails.dob ? "labelMoveUp" : "labelMoveDown"}
              onFocus={() => setInputType("date")}
              onBlur={() => setInputType("text")}
            />
            <label>Date of Birth*</label>
            {errors.dob && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">Select a Valid DOB</span>
              </span>
            )}
          </div>
        </div>

        <div
          className={`name-group addressField ${
            errors.doc || errors.identityNumber ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <select
              name=""
              id=""
              placeholder=" "
              value={otherDetails.doc}
        
              {...register("doc", { required: true })}
              className={otherDetails.doc ? "labelMoveUp" : "labelMoveDown"}
            >
              <option className="dnone" value=""></option>
              <option value={0}>Pan Card</option>
              <option value={1}>Adhaar Card</option>
              <option value={2}>Passport Number</option>
            </select>
            <label>Identity*</label>
            {errors.doc && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">Select Identity Document</span>
              </span>
            )}
          </div>
          <div className="textfield">
            <input
              placeholder=" "
              {...register("identityNumber", {
                required: true,
                pattern: getDocumentRegex(otherDetails.doc),
              })}
              value={otherDetails.identityNumber}
            />
            <label htmlFor="">Identity Number*</label>
            {errors.identityNumber && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  {!otherDetails.doc && <>select a Identity field first</>}
                  {otherDetails.doc === "0" && (
                    <>Ensure valid format "ABCDE1234F"</>
                  )}
                  {otherDetails.doc === "1" && (
                    <>Ensure valid format '012345678912'</>
                  )}
                  {otherDetails.doc === "2" && (
                    <>Ensure valid format 'A12345678'</>
                  )}
                </span>
              </span>
            )}
          </div>
        </div>
        <div
          className={`name-group ${
            errors.occupation || errors.organization ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <input
              placeholder=" "
              {...register("occupation", {
                required: true,
                pattern: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
              })}
              value={otherDetails.occupation}
            />
            <label>Occupation*</label>
            {errors.occupation && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  A-Z, a-z only. No spaces before/after.
                </span>
              </span>
            )}
          </div>
          <div className="textfield">
            <input
              placeholder=" "
              value={otherDetails.organization}
              {...register("organization", {
                pattern: /^[a-zA-Z.]+(?:\s+[a-zA-Z]+)*$/,
              })}
            />
            <label>Organization</label>
          </div>
        </div>
        <div className="name-group">
          {/* <div></div> */}
          <button className="btn pre" onClick={handlePrevious}>
            Previous
          </button>
          <button className="btn" onClick={handleNext} type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
export default OtherDetails;
