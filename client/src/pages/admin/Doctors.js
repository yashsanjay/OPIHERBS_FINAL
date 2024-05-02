import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table, Input, Button, Space } from "antd";
import styled from "styled-components";

const HomePageWrapper = styled.div`
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

  .actions-container {
    display: flex;
  }

  .approve-btn {
    background-color: #52c41a;
    border-color: #52c41a;
  }

  .reject-btn {
    background-color: #f5222d;
    border-color: #f5222d;
  }
`;
const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loadingTime, setLoadingTime] = useState(null); // Define setLoadingTime state

  

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        const updatedDoctors = doctors.map((doctor) =>
          doctor._id === record._id ? { ...doctor, status } : doctor
        );
        setDoctors(updatedDoctors);
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const startLoadingTime = performance.now(); // Start time
        const res = await axios.get("/api/v1/admin/getAllDoctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const endLoadingTime = performance.now(); // End time
        setLoadingTime(endLoadingTime - startLoadingTime); // Calculate loading time

        if (res.data.data.success) {
          setDoctors(res.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getDoctors();
  }, []);

  const filteredDoctors = doctors
    .filter((doctor) =>
      `${doctor.name} ${doctor.lastName}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleRedirectToExpanded = (doctorId) => {
    navigate(`/doctorsexpanded/${doctorId}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.name} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="actions-container">
          {((record.status === "pending") || (record.status === "rejected")) ? (
            <Button
              className="approve-btn"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </Button>
          ) : (
            <Button
              className="reject-btn"
              onClick={() => handleAccountStatus(record, "rejected")}
            >
              Reject
            </Button>
          )}
          <Button onClick={() => handleRedirectToExpanded(record._id)}>
            View Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <HomePageWrapper>
      <Layout>
        <h1 className="text-center m-3">All Doctors</h1>
        <Space style={{ paddingLeft: "50px" }}>
          <Input
            placeholder="Search by name"
            onChange={handleSearch}
            style={{ textAlign: "center" }}
          />
        </Space>
        <Table columns={columns} dataSource={filteredDoctors} />
      </Layout>
    </HomePageWrapper>
  );
};

export default Doctors;
