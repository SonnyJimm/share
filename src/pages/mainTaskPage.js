import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/pages/main-page.css";
const defaultUser = {
  id: uuidv4(),
  firstname: "",
  lastname: "",
  about: "",
  favColor: "#ff0000",
  gender: "male",
  dob: "",
  luckNumber: 0,
  courseSatisfaction: 0,
  phone: "",
  education: "high School",
  hobbies: {
    Basketball: false,
    motorcycle: false,
    "pool billiards": false,
  },
};
const MainTaskPage = () => {
  const ref = useRef({});
  const [user, setUser] = useState(defaultUser);
  const [userErrors, setUserErrors] = useState({
    firstname: "",
    lastname: "",
    about: "",
    favColor: "",
    gender: "",
    dob: "",
    luckNumber: "",
    courseSatisfaction: "",
    phone: "",
    education: "",
  });
  const updateUser = (e) => {
    user[e.target.name] = e.target.value;
    if (userErrors[e.target.name].length > 0) {
      userErrors[e.target.name] = "";
      setUserErrors({ ...userErrors });
    }
    setUser({ ...user });
  };
  const updateHobbies = (e) => {
    user.hobbies[e.target.value] = !user.hobbies[e.target.value];
    setUser({ ...user });
  };
  const isNumber = (e) => {
    var key = e.key;
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };
  const updateScore = (e) => {
    if (e.target.value <= 10) {
      user.courseSatisfaction = e.target.value;
      setUser({ ...user });
    }
  };
  const updatePhone = (e) => {
    user.phone = e.target.value.replaceAll("-", "");
    if (user.phone.length > 3) {
      user.phone = user.phone.slice(0, 3) + "-" + user.phone.slice(3);
    }
    if (user.phone.length > 6) {
      user.phone = user.phone.slice(0, 6) + "-" + user.phone.slice(6);
    }
    if (userErrors.phone.length > 0) {
      userErrors.phone = "";
      setUserErrors({ ...userErrors });
    }
    setUser({ ...user });
  };
  const focus = () => {
    for (let key in userErrors) {
      if (userErrors[key].length > 0) {
        ref.current[key].focus();
        return;
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let errors = false;
    if (user.firstname.length <= 0) {
      errors = true;
      userErrors.firstname = "Please fill this field";
    }
    if (user.lastname.length <= 0) {
      errors = true;
      userErrors.lastname = "Please fill this field";
    }
    if (!/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/.test(user.phone)) {
      errors = true;
      userErrors.phone = "Please input your phone number";
    }
    if (user.dob === "") {
      errors = true;
      userErrors.dob = "Please fill your birth date";
    } else {
      let userInput = new Date(user.dob);
      let latest = new Date("1990-01-01");
      if (
        latest.getTime() > userInput.getTime() ||
        userInput.getTime() > Date.now()
      ) {
        errors = true;
        userErrors.dob = "Please enter valid date";
      }
    }
    if (errors) {
      setUserErrors({ ...userErrors });
      focus();
    } else {
      let finaluser = { ...user };
      finaluser.hobbies = Object.keys(user.hobbies).filter(
        (val) => user.hobbies[val] === true
      );
      console.log(finaluser);
    }
  };
  return (
    <div className="main-page">
      <h3>Home Task Page</h3>
      <form className="main-page-form" onSubmit={onSubmit}>
        <div className="main-page-form-name">
          <div className="main-page-form-item">
            <label>Firstname :</label>
            <input
              className={userErrors.firstname.length > 0 ? "error" : ""}
              ref={(el) => (ref.current.firstname = el)}
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={user.firstname}
              onChange={updateUser}
            />
            {userErrors.firstname.length > 0 && (
              <span className="error-message">{userErrors.firstname}</span>
            )}
          </div>
          <div className="main-page-form-item">
            <label>LastName :</label>
            <input
              ref={(el) => (ref.current.lastname = el)}
              className={userErrors.lastname.length > 0 ? "error" : ""}
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={updateUser}
            />
            {userErrors.lastname.length > 0 && (
              <span className="error-message">{userErrors.lastname}</span>
            )}
          </div>
        </div>
        <div className="main-page-form-item">
          <label>Phone :</label>
          <input
            ref={(el) => (ref.current.phone = el)}
            className={userErrors.phone.length > 0 ? "error" : ""}
            type="text"
            name="phone"
            placeholder="123-45-678"
            value={user.phone}
            onKeyPress={isNumber}
            onChange={updatePhone}
          />
          {userErrors.phone.length > 0 && (
            <span className="error-message">{userErrors.phone}</span>
          )}
        </div>
        <div className="main-page-form-item">
          <label>Date of Birth :</label>
          <input
            ref={(el) => (ref.current.dob = el)}
            className={userErrors.dob.length > 0 ? "error" : ""}
            type="date"
            name="dob"
            value={user.dob}
            onChange={updateUser}
          />
          {userErrors.dob.length > 0 && (
            <span className="error-message">{userErrors.dob}</span>
          )}
        </div>
        <div className="main-page-form-item">
          <label>Favorite color :</label>
          <input
            type="color"
            name="favColor"
            value={user.favColor}
            onChange={updateUser}
          />
        </div>
        <div className="main-page-form-item">
          <label>Course satisfaction score :</label>
          <input
            type="number"
            name="courseSatisfaction"
            value={user.courseSatisfaction}
            onChange={updateScore}
          />
        </div>
        <div className="main-page-form-item">
          <label>Education degree :</label>
          <select
            name="education"
            value={user.education}
            onChange={updateScore}
          >
            <option value="high School">high school</option>
            <option value="collage">collage</option>
            <option value="bachelor">bachelor</option>
            <option value="master">master</option>
            <option value="doctor">doctor</option>
          </select>
        </div>
        <div className="main-page-form-item">
          <label>Hobbies :</label>
          <fieldset>
            <input
              type="checkbox"
              name="hobbies"
              id="Basketball"
              value="Basketball"
              checked={user.hobbies.Basketball}
              onChange={updateHobbies}
            />
            <label>Basketball</label>

            <input
              type="checkbox"
              name="hobbies"
              id="motorcycle"
              value="motorcycle"
              checked={user.hobbies.motorcycle}
              onChange={updateHobbies}
            />
            <label>Motorcycle</label>

            <input
              type="checkbox"
              name="hobbies"
              id="pool"
              checked={user.hobbies["pool billiards"]}
              value="pool billiards"
              onChange={updateHobbies}
            />
            <label>Pool Billiards</label>
          </fieldset>
        </div>
        <div className="main-page-form-item">
          <label>Gender :</label>
          <fieldset>
            <input
              type="radio"
              name="gender"
              checked={"male" === user.gender}
              onChange={updateUser}
              value="male"
              id="male"
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              checked={"female" === user.gender}
              onChange={updateUser}
              value="female"
              id="female"
            />
            <label>Female</label>
          </fieldset>
        </div>
        <div className="main-page-form-item">
          <label>Lucky Number :</label>
          <input
            type="number"
            value={user.luckNumber}
            onChange={updateUser}
            name="luckNumber"
          />
        </div>
        <div className="main-page-form-item">
          <label>About :</label>
          <textarea
            id="about"
            value={user.about}
            onChange={updateUser}
            name="about"
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div className="main-page-form-item">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MainTaskPage;
