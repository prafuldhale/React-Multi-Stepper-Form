import { useForm } from "react-hook-form";
import { error_icon } from "../asset/material-icon-name";
import React from 'react';

function DocumentHandling({
  setStep,
  previewUrls,
  setPreviewUrls,
  uploadedFiles,
  setUploadedFiles,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePrevious = () => {
    setStep(1);
  };
  const handleNext = (data) => {
    console.log(previewUrls.photo);
    if (previewUrls.photo && previewUrls.signature && previewUrls.Aadhar) {
      setStep(3);
    }
  };
  const validateFileType = (file) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    return allowedTypes.includes(file.type);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    if (!newFile) return; // Handle empty file selection

    if (!validateFileType(newFile)) {
      alert("Please select a PNG or JPEG image file!");
      return ;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewUrls({
        ...previewUrls,
        [event.target.name]: e.target.result,
      });
    };

    reader.readAsDataURL(newFile); // Create a preview URL using data URI

    setUploadedFiles([
      ...uploadedFiles,
      { name: newFile.name, type: newFile.type },
    ]);
    sessionStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles)); // Store file information in sessionStorage
  };

  const handleGetFiles = () => {
    const storedFiles = JSON.parse(sessionStorage.getItem("uploadedFiles"));
    if (storedFiles) {
      setUploadedFiles(storedFiles); // Update state with retrieved information
    }
  };

  return (
    <form className="addressField" onSubmit={handleSubmit(handleNext)}>
      <div className="name-group">
        <div className="textfield ">
          <img src={previewUrls.photo} alt="" />
        </div>

        <div className="textfield">
          <input
            type="file"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={register("photo", { required: true })}
          />
          <label htmlFor="">Passport Photo*</label>
          {!previewUrls.photo && (
            <span className="error-message">
              <i className="material-symbols-outlined md-18">{error_icon}</i>
              <span className="message">Choose */.png, */.jpeg file</span>
            </span>
          )}
        </div>
      </div>
      <div className="name-group">
        <div className="textfield ">
          <img src={previewUrls.signature} alt="" />
        </div>

        <div className="textfield">
          <input
            type="file"
            name="signature"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={register("signature", { required: true })}
          />
          <label htmlFor="">Signature*</label>
          {!previewUrls.signature && (
            <span className="error-message">
              <i className="material-symbols-outlined md-18">{error_icon}</i>
              <span className="message">Choose */.png, */.jpeg file</span>
            </span>
          )}
        </div>
      </div>
      <div className="name-group">
        <div className="textfield ">
          <img src={previewUrls.Aadhar} alt="" />
        </div>

        <div className="textfield">
          <input
            type="file"
            name="Aadhar"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            ref={register("Aadhar", { required: true })}
          />
          <label htmlFor="">Aadhar Card*</label>
          {!previewUrls.Aadhar && (
            <span className="error-message">
              <i className="material-symbols-outlined md-18">{error_icon}</i>
              <span className="message">Choose */.png, */.jpeg file</span>
            </span>
          )}
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
  );
}

export default DocumentHandling;
