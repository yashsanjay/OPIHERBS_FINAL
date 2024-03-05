// AdminAppointments.js

import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, Input, Space, Button } from "antd";
import styled from "styled-components";
const AppointmentsPageWrapper = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  overflow: scroll;
  height: 100vh;
  padding: 20px;

  .ant-input {
    width: 300px;
    margin-bottom: 16px;
  }

  .ant-btn {
    margin-right: 8px;
  }
`;


const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorSearchValue, setDoctorSearchValue] = useState('');
  const [patientSearchValue, setPatientSearchValue] = useState('');

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllAppointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoctorSearch = (e) => {
    setDoctorSearchValue(e.target.value);
  };

  const handlePatientSearch = (e) => {
    setPatientSearchValue(e.target.value);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const filteredAppointments = appointments
    .filter((appointment) =>
      `${appointment.doctorName}`.toLowerCase().includes(doctorSearchValue.toLowerCase()) &&
      `${appointment.patientName}`.toLowerCase().includes(patientSearchValue.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order

  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctorName",
    },
    {
      title: "Patient",
      dataIndex: "patientName",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    // Add more columns based on your appointment data
  ];

  return (
    <AppointmentsPageWrapper>
      <Layout>
        <h1 className="text-center m-3">All Appointments</h1>
        <Space style={{ marginBottom: 16, paddingLeft: "50px" }}>
          <Input placeholder="Search by doctor" onChange={handleDoctorSearch} />
          </Space>
          <Space style={{ marginBottom: 16, paddingLeft: "270px" }}>
          <Input placeholder="Search by patient" onChange={handlePatientSearch} />
          </Space>
          
        
        <div className="table-container">
          <Table columns={columns} dataSource={filteredAppointments} />
        </div>
      </Layout>
    </AppointmentsPageWrapper>
  );
};

export default AdminAppointments;
