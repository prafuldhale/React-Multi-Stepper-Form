import { useForm } from "react-hook-form";
import "../App.css";
import { error_icon } from "../asset/material-icon-name";
import { useState, useEffect } from "react";
import { maxDate, today } from "../asset/constants";
import React from 'react';

function PersonalInformation({
  setStep,
  personalInformation,
  setPersonalInformation,
}) {
  const [prevFormData, setPrevFormData] = useState({});
  const [inputType, setInputType] = useState('text');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleNext = (data) => {
    if (
      data.fName?.trimEnd() &&
      data.lName?.trimEnd() &&
      data.mobilenumber?.trimEnd() &&
      data.email?.trimEnd() &&
      data.gender?.trimEnd() &&
      data.dob?.trimEnd() &&
      data.address?.trimEnd() &&
      data.pincode?.trimEnd() &&
      data.city?.trimEnd()
    )
      setStep(1);
  };

  useEffect(() => {
    watch((formData) => {
      console.log(formData);
      const hasNewValues =
        JSON.stringify(formData) !== JSON.stringify(prevFormData);
      if (hasNewValues) {
        setPersonalInformation(formData);
        console.log("Personal Information:", formData);
        setPrevFormData(formData); // Update previous data for next comparison
      }
    });
  }, [watch, prevFormData, setPersonalInformation]);

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
              value={personalInformation.fName}
            />
            <label>First Name*</label>
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
              type="text"
              value={personalInformation.lName}
              {...register("lName", {
                required: true,
                pattern: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
              })}
            />
            <label>Last Name*</label>
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
            errors.mobilenumber || errors.email ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <input
              placeholder=""
              value={personalInformation.mobilenumber}
              type="text"
              maxLength={10}
              {...register("mobilenumber", {
                required: true,
                pattern: /^\d{10}$/,
                
              })}
            />
            <label>Mobile Number*</label>
            {errors.mobilenumber && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  Digits 10 only for mobile number
                </span>
              </span>
            )}
          </div>

          <div className="textfield">
            <input
              placeholder=" "
              type="email"
              value={personalInformation.email}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z.-_]+@[a-zA-Z.-_]+\.[a-zA-Z]{2,}$/,
              })}
            />
            <label>Email*</label>
            {errors.email && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">Invalid Email</span>
              </span>
            )}
          </div>
        </div>
        <div
          className={`name-group ${
            errors.gender || errors.dob ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <select
              name=""
              id=""
              placeholder=" "
              value={personalInformation.gender}
              {...register("gender", { required: true })}
              className={
                personalInformation.gender ? "labelMoveUp" : "labelMoveDown"
              }
            >
              <option className="dnone" value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="NaN">Rather not Say</option>
              {/* </>
              )} */}
            </select>
            <label>Gender*</label>
            {errors.gender && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">Select Gender</span>
              </span>
            )}
          </div>
          <div className="textfield">
            <input
              type={inputType}
              placeholder="DD/MM/YYYY"
              value={personalInformation.dob}
              {...register("dob", { required: true, max: today })}
              min={maxDate}
              max={today}
              className={
                personalInformation.dob ? "labelMoveUp" : "labelMoveDown"
              }
              onFocus={() => setInputType('date')}
              onBlur={() => setInputType('text')}
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

        <div className={`name-group ${errors.address ? "setupMargin" : ""}`}>
          <div className="textfield addressField">
            <textarea
              placeholder=" "
              className=""
              rows="4"
              {...register("address", { required: true })}
              value={personalInformation.address}
            ></textarea>
            <label>Address*</label>
            {errors.address && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">*Required</span>
              </span>
            )}
          </div>
        </div>
        <div
          className={`name-group ${
            errors.pincode || errors.city ? "setupMargin" : ""
          }`}
        >
          <div className="textfield">
            <input
              placeholder=" "
              value={personalInformation.pincode}
              maxLength={6}
              {...register("pincode", {
                required: true,
                pattern: /^\d{6}$/,
              })}
            />
            <label>Pincode*</label>
            {errors.pincode && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">6 digits pincode only</span>
              </span>
            )}
          </div>

          <div className="textfield">
            <input
              placeholder=" "
              type="text"
              value={personalInformation.city}
              {...register("city", {
                required: true,
                pattern: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
              })}
            />
            <label>City*</label>
            {errors.city && (
              <span className="error-message">
                <i className="material-symbols-outlined md-18">{error_icon}</i>
                <span className="message">
                  A-Z, a-z only. No spaces before/after.
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="name-group">
          <div></div>
          <button className="btn" onClick={handleNext} type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
export default PersonalInformation;
