import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import DataList from './components/DataList';
import { Modal, Divider, Button, Input, Form } from "antd";
import TopBar from '../../components/TopBar';
import Footer from "../../components/Footer";
import "./styles.css"

ProjectDetail.propTypes = {

};

function ProjectDetail(props) {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState([]);

  const [isChangeOwner, setChangeOwner] = useState(false)

  useEffect(() => {
    let data = [];
    try {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          "user-agent": "Chrome",
        },
      })
        .then(async (response) => {
          // Handle the response
          const jsonRes = await response.json();
          data = jsonRes.data;
          if (data.project !== null && data.project !== undefined) {
            setProjectDetail(data.project);
          }
        })
        .catch((error) => {
          // Handle the error
          Modal.error({
            title: "ERROR",
            content: "Server error when trying to get project detail.",
          });
        });
    } catch {}
  }, [id]);

  const popupChangeOwner = (e) => {
    console.log("click Change Owner")
    console.log(projectDetail)
    setChangeOwner(true);
  };

  const handleChangeOwnerShip = async (e) => {
    const newOwnerEmail = e.ownerEmail;
    const responseChangeOwnership = await fetch(
      "http://localhost:5000/drive/change-ownership",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          "user-agent": "Chrome",
        },
        body: JSON.stringify({
          ownerEmail: newOwnerEmail,
          projectId: id,
          folderId: projectDetail.driveParent,
        }),
      }
    );
    if (!responseChangeOwnership.ok) {
      Modal.error({
        title: "ERROR",
        content: "Server error when trying to get annotation file.",
      });
    }
    else {
      const dataResponseJson = await responseChangeOwnership.json();
      console.log("This is the response of request changing ownership");
    }
    setChangeOwner(false);
  }

  return (
    <div className="project-detail-page-wrapper">
      <TopBar topText={`Projects / ${projectDetail.title}`} />
      <Divider className="divider-custom" />
      <div className="project-description-wrapper">
        <p className="project-description-text">{projectDetail.description}</p>
      </div>
      {isChangeOwner ? (
        <Modal
          title="Change Project Owner"
          open={isChangeOwner}
          onCancel={() => setChangeOwner(false)}
          footer={null}
        >
          <Form onFinish={handleChangeOwnerShip}>
            <Form.Item label="Email" name="ownerEmail" required>
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <></>
      )}
      <Button className="button-change-owner" onClick={popupChangeOwner}>
        Change Owner
      </Button>
      <DataList projectDetail={projectDetail} id={projectDetail._id} />
      <Footer />
    </div>
  );
}

export default ProjectDetail;
