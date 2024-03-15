import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Home.scss'
const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users'); // Assuming the users endpoint is '/users'
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();

    
  }, []);
  
  return (
    <div className="container">
      <h1 className="title">User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td className="actions action-buttons">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
