import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Card, Space, Tag } from "@arco-design/web-react";
import { IconPlus, IconDelete } from "@arco-design/web-react/icon";
import Footer from "../components/Footer";
const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [editID, setEditID] = useState(null);
  const [editText, setEditText] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("http://localhost:4000/history");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log("Data received:", data); // 检查收到的数据
      setHistory(data);
      console.log("History set:", data); // 检查设置状态后的数据
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedContent = { answer: editText };
      const response = await fetch(`http://localhost:4000/history/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const updatedItem = await response.json();

      setHistory((currentHistory) => currentHistory.map((item) => (item.id === id ? { ...item, answer: updatedItem.conversation.answer } : item)));
      setEditID(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating history:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/history/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      setHistory((currentHistory) => currentHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  return (
    <>
      <header className="mt-4 mb-4 text-center container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="display-4 text-primary">EthiQuery</h1>
          <nav className="nav">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/how-to-use" className={`nav-link ${location.pathname === "/how-to-use" ? "active" : ""}`}>
                  How to Use
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}>
                  History
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap" }}>
        {history.map((item) => {
          return (
            <Card
              style={{ marginBottom: 10, width: 300, marginLeft: 50,marginRight: 10 }}
              hoverable
              title={item.question}
              extra={
                <div style={{ display: "flex" }}>
                  <Space size="small">
                    {editID === item.id ? (
                      <Button type="primary" onClick={() => handleUpdate(item.id)}>
                        update
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => {
                          setEditID(item.id);
                          setEditText(item.answer);
                        }}
                      >
                        edit
                      </Button>
                    )}
                    <Button
                      type="primary"
                      status="danger"
                      icon={<IconDelete />}
                      onClick={() => {
                        console.log("Deleting item with ID:", item.id);
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Space>
                </div>
              }
            >
              <Tag color="" bordered>
                position:{item.position}
              </Tag>
              <div style={{ marginTop: 5 }}>{editID === item.id ? <input type="text" value={editText} onChange={handleEditChange} /> : <span>{item.answer}</span>}</div>
            </Card>
            
          );
        })}
        <Footer />
      </div>
    </>
  );
};

export default HistoryPage;
