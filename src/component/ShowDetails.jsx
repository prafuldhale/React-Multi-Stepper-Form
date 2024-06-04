import { type } from "@testing-library/user-event/dist/type";
import "../App.css";
import { timeline } from "../asset/constants";
import logo from "../asset/logo.png";
import { jsPDF } from "jspdf";
import React from 'react';
function ShowDetails({
  setStep,
  previewUrls,
  uploadedFiles,
  personalInformation,
  otherDetails,
}) {
  const goToFirstPage = () => {
    setStep(0);
  };

  const printDiv = () => {
    console.log("Printing");
    var printContents = document.getElementById("information-table")?.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = originalContents;
    window.onafterprint = () => {
      setStep(0);
    };
    window.print();

    // const doc = new jsPDF();
    // const content = document.getElementById("information-table");
    // let pdf = new jsPDF();

    // pdf.html(content.innerHTML, {
    //     callback: function (pdf) {
    //         pdf.save("output.pdf");
    //     }
    // });
  };
  return (
    <>
      <div className="details">
        <div className="printable">
          <div id="print"></div>
          <div className="information-table" id="information-table">
            <table border={2}>
              <thead>
                <tr>
                  <th colSpan={2}>
                    <div className="title">Account Opening Form</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Applicant Name:</td>
                  <td>
                    {personalInformation?.fName +
                      " " +
                      personalInformation.lName}
                  </td>
                </tr>
                <tr>
                  <td>Mobile Number:</td>
                  <td>{personalInformation?.mobilenumber}</td>
                </tr>
                <tr>
                  <td>Email Id:</td>
                  <td>{personalInformation.email}</td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>{personalInformation.gender}</td>
                </tr>
                <tr>
                  <td>Ac Holder Date of Birth:</td>
                  <td>{personalInformation.dob}</td>
                </tr>
                <tr>
                  <td>Document provided for verification</td>
                  <td>
                    {otherDetails.doc === "0" && <>Parment Account Number</>}
                    {otherDetails.doc === "1" && <>Adhaar Card</>}
                    {otherDetails.doc === "2" && <>Passport</>}
                  </td>
                </tr>
                <tr>
                  <td>Identification Number</td>
                  <td>{otherDetails.identityNumber}</td>
                </tr>
                <tr>
                  <td>Occupation</td>
                  <td>{otherDetails.occupation}</td>
                </tr>
                {otherDetails.organization && (
                  <tr>
                    <td>Organization</td>
                    <td>{otherDetails.organization}</td>
                  </tr>
                )}

                <tr>
                  <td>Address:</td>
                  <td>
                    {personalInformation.address +
                      " " +
                      personalInformation.city +
                      " " +
                      personalInformation.pincode}
                  </td>
                </tr>
                <tr>
                  <td>Nominees Name:</td>
                  <td>{otherDetails.fName + " " + otherDetails.lName}</td>
                </tr>
                <tr>
                  <td>Relationship with Account Holder:</td>
                  <td>{otherDetails.relation}</td>
                </tr>
                <tr>
                  <td>DoB of Nominees</td>
                  <td>{otherDetails.dob}</td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
            <div className="img-group">
              <img src={previewUrls.photo} alt="" id="photo" />
              <img src={previewUrls.signature} alt="" className="signature" />
              <p>
                I hereby declare that the information given above and in the
                enclosed documents is true to the best of my knowledge and
                belief and nothing has been concealed therein. I understand that
                if the information given by me is proved false/not true, I will
                have to face the punishment as per the law. Also, all the
                benefits availed by me shall be summarily withdrawn.
              </p>
              <img src={logo} className="logo" alt="loading logo" />
            </div>
          </div>
          <p>{timeline}</p>
        </div>

        <div className="name-group">
          <button type="button" className="btn" onClick={goToFirstPage}>
            Edit
          </button>
          <button type="button" className="btn" onClick={printDiv}>
            Print
          </button>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
