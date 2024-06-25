import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './JsonDemo.css';
import {useNavigate} from 'react-router-dom'

export const JsonDemo = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [datas, setDatas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate=useNavigate();

  const handleSignup = () => {
    if (editingId) {
      axios.put(`http://127.0.0.1:3001/users/${editingId}`, { name, email, phoneNo, password, confirmPassword })
        .then(() => {
          alert("Updated successfully");
          fetchPosts();
        })
        .catch((e) => {
          console.log(e);
        });
      setName('');
      setEmail('');
      setPhoneNo('');
      setPassword('');
      setConfirmPassword('');
      setEditingId(null);
    } else {
      axios.post("http://127.0.0.1:3001/users", { name, email, phoneNo, password, confirmPassword })
        .then(() => {
          alert("Sign up successfully");
          setName('');
          setEmail('');
          setPhoneNo('');
          setPassword('');
          setConfirmPassword('');
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  


  const handleEdit = (data) => {
    setEditingId(data.id);
    setName(data.name);
    setEmail(data.email);
    setPhoneNo(data.phoneNo);
    setPassword(data.password);
    setConfirmPassword(data.confirmPassword);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:3001/users/${id}`)
      .then(() => {
        alert("Data Deleted Successfully");
        fetchPosts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="SignUpContainer" >
      <center>
        <h2>Sign Up</h2>
        <div>
          <label>
            Name:
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Phone No:
            <input type='text' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
        </div>
        <button onClick={handleSignup}>{editingId ? "Update" : "Sign Up"}</button>

        <div className="data-container">
          {
            datas.map((data) => (
              <div key={data.id} className="data-item">
                <p>Name: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Phone No: {data.phoneNo}</p>
                <button onClick={() => handleEdit(data)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            ))
          }
        </div>
      </center>
    </div>
  );
};

export default JsonDemo;
