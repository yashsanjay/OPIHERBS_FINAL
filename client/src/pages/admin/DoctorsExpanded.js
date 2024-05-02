import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import './DoctorsExpanded.css'

const DoctorsExpandedWrapper = styled.div`
  max-width: 1350px;
  margin: 50px auto; /* Adjusted margin for better spacing */
  overflow: auto;
  height: 100%; /* Changed height to 100% */
  padding: 30px; /* Reduced padding */
`;


const DoctorsExpanded = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const params = useParams();

  useEffect(() => {
    // Fetch doctor details here
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.post(
          "/api/v1/admin/getDoctorById",
          { doctorId: params.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDoctorDetails(response.data.data);
          console.log(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctorDetails();
  }, []);

  return (
    <DoctorsExpandedWrapper>
      <Layout>
        {doctorDetails && (
          <>
            <h1 className="doctors-expanded-heading">Doctor Details</h1>
            <Row className="doctors-expanded-row" gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <h4 className="doctors-expanded-subheading">Personal Details:</h4>
                <p className="doctors-expanded-info">First Name: {doctorDetails.name}</p>
                <p className="doctors-expanded-info">Last Name: {doctorDetails.lastName}</p>
                <p className="doctors-expanded-info">Phone: {doctorDetails.phone}</p>
                <p className="doctors-expanded-info">Email: {doctorDetails.email}</p>
                <p className="doctors-expanded-info">Website: {doctorDetails.website}</p>
                <p className="doctors-expanded-info">Address: {doctorDetails.district}</p>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <h4 className="doctors-expanded-subheading">Professional Details:</h4>
                <p className="doctors-expanded-info">Specialization: {doctorDetails.specialization}</p>
                <p className="doctors-expanded-info">Experience: {doctorDetails.experience}</p>
                <p className="doctors-expanded-info">Fees Per Consultation: {doctorDetails.feesPerCunsaltation}</p>
                <p className="doctors-expanded-info">Timings: {doctorDetails.timings.join(" - ")}</p>
              </Col>
              <Col xs={24} md={24} lg={8}>
                {/* Additional columns can be added here */}
              </Col>
            </Row>
          </>
        )}
      </Layout>
    </DoctorsExpandedWrapper>
  );
};

export default DoctorsExpanded;
