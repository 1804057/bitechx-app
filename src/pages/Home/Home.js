import React,{useState, useEffect} from "react";
import axios from 'axios';
import './Home.scss';
import AddUserModal from "../../components/AddUserModal/AddUSerModal";
import Button from '@mui/joy/Button';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUserData(null);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users'); // Assuming the users endpoint is '/users'
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditUser = (userData) => {
    setSelectedUserData(userData); 
    setOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      console.log('User deleted successfully');
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <div className="container">
      <div className="heading">
      <h1 className="title">User List</h1>
      </div>
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
              <td className="actions">
                <EditIcon className="edit-button" onClick={() => handleEditUser(user)} >Edit</EditIcon>
                <DeleteIcon className="delete-button" onClick={() => handleDeleteUser(user.id)} >Delete</DeleteIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Grid container justifyContent="center" alignItems="center">
        <Button variant="outlined" color="neutral" style={{ margin: '20px' }} onClick={openModal}>
          Add User
        </Button>
      </Grid>
      <AddUserModal isOpen={open} onClose={closeModal} onUpdatedData={getUsers} userDataToEdit={selectedUserData}/>
    </div>
    
  );
};

export default Home;
