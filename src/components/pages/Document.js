import React, { useEffect, useState } from "react";
import axios from "axios";

const Document = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "http://localhost:5000/api/content/findAll?page=0&limit=10";
        const response = await axios.get(apiUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontWeight: 600,
          fontSize: 24,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        WELCOME TO BUILDERFLOOR.COM
      </h2>
      <p
        style={{
          fontWeight: 600,
          fontSize: 20,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        All Documents
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Document;
