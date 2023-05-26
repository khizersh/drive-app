import React, { useEffect, useState } from "react";

const AddFolder = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    contact: "",
    linkedIn: "",
    skypeName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postCode: "",
    country: "",
    summary: "",
    contactName: "",
    purpose: "",
    skills: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickAddFolder = () => {

  }

  return (
    <div className="container">
      <div className="row  mx-2 p-3">
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>FirstName</text>
            </div>
            <div className="col-7">
              <input
                name="firstName"
                maxlength="50"
                required="required"
                placeholder="First Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.firstName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>LastName</text>
            </div>
            <div className="col-7">
              <input
                name="lastName"
                maxlength="50"
                required="required"
                placeholder="Last Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.lastName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Email *</text>
            </div>
            <div className="col-7">
              <input
                name="email"
                maxlength="50"
                required="required"
                placeholder="Email *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.email}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Job Title</text>
            </div>
            <div className="col-7">
              <input
                name="jobTitle"
                maxlength="50"
                required="required"
                placeholder="Job Title"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.jobTitle}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Company</text>
            </div>
            <div className="col-7">
              <input
                name="company"
                maxlength="50"
                required="required"
                placeholder="Company"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.company}
              />
            </div>
          </div>
        </div>

        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>LinkedIn</text>
            </div>
            <div className="col-7">
              <input
                name="linkedIn"
                maxlength="50"
                required="required"
                placeholder="LinkedIn*"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.linkedIn}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>SkypeName *</text>
            </div>
            <div className="col-7">
              <input
                name="skypeName"
                maxlength="50"
                required="required"
                placeholder="SkypeName"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.skypeName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Address 1</text>
            </div>
            <div className="col-7">
              <input
                name="address1"
                maxlength="50"
                required="required"
                placeholder="Address 1"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.address1}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Address 2</text>
            </div>
            <div className="col-7">
              <input
                name="address2"
                maxlength="50"
                required="required"
                placeholder="First Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.address2}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>City</text>
            </div>
            <div className="col-7">
              <input
                name="city"
                maxlength="50"
                required="required"
                placeholder="City"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.city}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>State</text>
            </div>
            <div className="col-7">
              <input
                name="state"
                maxlength="50"
                required="required"
                placeholder="State"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.state}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Postal Code</text>
            </div>
            <div className="col-7">
              <input
                name="postCode"
                maxlength="50"
                required="required"
                placeholder="Postal Code"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.postCode}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Country</text>
            </div>
            <div className="col-7">
              <input
                name="country"
                maxlength="50"
                required="required"
                placeholder="Country"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.country}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Summary</text>
            </div>
            <div className="col-7">
              <input
                name="summary"
                maxlength="50"
                required="required"
                placeholder="Summary"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.summary}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Contact Name</text>
            </div>
            <div className="col-7">
              <input
                name="contactName"
                maxlength="50"
                required="required"
                placeholder="Summary"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.contactName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Purpose</text>
            </div>
            <div className="col-7">
              <input
                name="purpose"
                maxlength="50"
                required="required"
                placeholder="Purpose"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.purpose}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Skills</text>
            </div>
            <div className="col-7">
              <input
                name="skills"
                maxlength="50"
                required="required"
                placeholder="Skills"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.skills}
              />
            </div>
          </div>
        </div>
        <div className="col-12 text-right mt-2">
          <button
            className="p-1 text-right login-btn weight-600 font-14 px-3 "
            onClick={onClickAddFolder}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolder;
