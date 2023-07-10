import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../components/TopBar';

import { useSelector } from "react-redux";
import { googleLoginSelector } from "./../../redux/selectors";
import VerticalTab from './components/Tabs';

import { Divider } from "antd";

import "./styles.css"

UserInformation.propTypes = {

};

function UserInformation(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const googleLoginData = useSelector(googleLoginSelector);

  // Temporary comment.
  // const componentTopBarRef = useRef(null);
  // const [componentTopBarHeight, setComponentTopBarHeight] = useState(0);

  const [componentTopBarHeight, setComponentTopBarHeight] = useState(0);

  const handleDataFromTopBar = (data) => {
    console.log("setComponentTopBarHeight: ", data)
    setComponentTopBarHeight(data);
  };

  // useEffect(() => {
  //   if (componentTopBarRef) {
  //     console.log("Top Bar width: ", componentTopBarRef.current.clientHeight);
  //     setComponentTopBarHeight(componentTopBarRef.current.clientHeight);
  //   }
  // }, [componentTopBarRef]);

  useEffect(() => {
    if (googleLoginData) {
      setEmail(googleLoginData.email)
      setFamilyName(googleLoginData.family_name);
      setGivenName(googleLoginData.given_name);
      setPictureUrl(googleLoginData.picture);
      setName(googleLoginData.name);
    }
  }, googleLoginData);

  return (
    <div className="user-profile-page">
      <TopBar topText="User Profile" sendDataToParent={handleDataFromTopBar} />
      <Divider className="custom-divider" />
      <VerticalTab
        name={name}
        topBarWidth={componentTopBarHeight}
        email={email}
        familyName={familyName}
        givenName={givenName}
        picture={pictureUrl}
      />
    </div>
  );
}

export default UserInformation;