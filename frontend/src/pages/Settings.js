// src/pages/Settings.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Settings() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Enable Notifications" />
        <FormControlLabel control={<Switch />} label="Dark Mode" />
      </FormGroup>
    </Container>
  );
}
