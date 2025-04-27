// src/pages/Dashboard.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

export default function Dashboard() {
  const totalTransactions = 1500;   // dummy data
  const flaggedTransactions = 45;   // dummy data

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Transactions</Typography>
            <Typography variant="h6">{totalTransactions}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Flagged Transactions</Typography>
            <Typography variant="h6">{flaggedTransactions}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
