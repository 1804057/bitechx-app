import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onUpdatedData, userDataToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  useEffect(() => {
    if (userDataToEdit) {
      setFormData(userDataToEdit);
    }
  }, [userDataToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userDataToEdit) {
        await axios.put(`http://localhost:3001/users/${userDataToEdit.id}`, formData);
      } else {
        await axios.post('http://localhost:3001/users', formData);
      }
      setFormData({
        name: '',
        password: ''
      })

      console.log('User data updated/added');
      onUpdatedData();
      onClose();
      
    } catch (error) {
      console.error('Error updating/adding user data:', error);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {userDataToEdit ? 'Edit User' : 'Add User'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined" color="neutral"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            {userDataToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default AddUserModal;
