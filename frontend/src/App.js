import React, { useState } from 'react';
import {
  Container, Typography, TextField, MenuItem, Button,
  Paper, CircularProgress, Alert, Box
} from '@mui/material';

const battingTeams = ['Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore', 'Kolkata Knight Riders', 'Rajasthan Royals', 'Kings XI Punjab', 'Sunrisers Hyderabad', 'Delhi Daredevils', 'Deccan Chargers', 'Delhi Capitals', 'Punjab Kings', 'Lucknow Super Giants', 'Gujarat Titans', 'Pune Warriors', 'Gujarat Lions', 'Royal Challengers Bengaluru', 'Rising Pune Supergiant', 'Kochi Tuskers Kerala', 'Rising Pune Supergiants'];
const bowlingTeams = battingTeams;  // same list for simplicity
const venues = [
    'Eden Gardens',
    'Wankhede Stadium',
    'M Chinnaswamy Stadium',
    'Feroz Shah Kotla',
    'Rajiv Gandhi International Stadium, Uppal',
    'MA Chidambaram Stadium, Chepauk',
    'Sawai Mansingh Stadium',
    'Dubai International Cricket Stadium',
    'Wankhede Stadium, Mumbai',
    'Punjab Cricket Association Stadium, Mohali',
    'Sheikh Zayed Stadium',
    'Sharjah Cricket Stadium',
    'MA Chidambaram Stadium, Chepauk, Chennai',
    'Narendra Modi Stadium, Ahmedabad',
    'Maharashtra Cricket Association Stadium',
    'Dr DY Patil Sports Academy, Mumbai',
    'Brabourne Stadium, Mumbai',
    'Dr DY Patil Sports Academy',
    'Subrata Roy Sahara Stadium',
    'Arun Jaitley Stadium, Delhi',
    'Eden Gardens, Kolkata',
    'Kingsmead',
    'Rajiv Gandhi International Stadium',
    'M.Chinnaswamy Stadium',
    'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow',
    'M Chinnaswamy Stadium, Bengaluru',
    'Arun Jaitley Stadium',
    'Rajiv Gandhi International Stadium, Uppal, Hyderabad',
    'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium',
    'Maharashtra Cricket Association Stadium, Pune',
    'Sardar Patel Stadium, Motera',
    'SuperSport Park',
    'Punjab Cricket Association IS Bindra Stadium, Mohali',
    'Saurashtra Cricket Association Stadium',
    'Punjab Cricket Association IS Bindra Stadium',
    'Brabourne Stadium',
    'Sawai Mansingh Stadium, Jaipur',
    'Himachal Pradesh Cricket Association Stadium',
    'MA Chidambaram Stadium',
    'Holkar Cricket Stadium',
    'New Wanderers Stadium',
    'Zayed Cricket Stadium, Abu Dhabi',
    'Barabati Stadium',
    "St George's Park",
    'JSCA International Stadium Complex',
    'Newlands',
    'Shaheed Veer Narayan Singh International Stadium',
    'Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur',
    'Punjab Cricket Association IS Bindra Stadium, Mohali, Chandigarh',
    'Nehru Stadium',
    'Green Park',
    'Himachal Pradesh Cricket Association Stadium, Dharamsala',
    'De Beers Diamond Oval',
    'Buffalo Park',
    'Barsapara Cricket Stadium, Guwahati',
    'Vidarbha Cricket Association Stadium, Jamtha',
    'OUTsurance Oval',
    'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam'
];

const cities = [
  "Mumbai", "Kolkata", "Delhi", "Chennai", "Hyderabad", "Bangalore", "Chandigarh", "Jaipur", 
  "Pune", "Abu Dhabi", "Ahmedabad", "Bengaluru", "Visakhapatnam", "Durban", "Lucknow", "Dubai", 
  "Dharamsala", "Centurion", "Rajkot", "Sharjah", "Navi Mumbai", "Indore", "Johannesburg", 
  "Port Elizabeth", "Cuttack", "Ranchi", "Cape Town", "Raipur", "Mohali", "Kochi", "Kanpur", 
  "East London", "Kimberley", "Nagpur", "Guwahati", "Bloemfontein"
];


export default function IplPredictor() {
  const [formData, setFormData] = useState({
    cumulative_runs: '',
    cumulative_wickets: '',
    over: '',
    batting_team: '',
    bowling_team: '',
    venue: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_score);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{p: 4}}>
        <Typography variant="h4" align="center" gutterBottom>
          IPL First Innings Score Predictor
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gap: 2 }}
        >
          <TextField
            label="Cumulative Runs"
            name="cumulative_runs"
            type="number"
            value={formData.cumulative_runs}
            onChange={handleChange}
            required
          />
          <TextField
            label="Cumulative Wickets"
            name="cumulative_wickets"
            type="number"
            value={formData.cumulative_wickets}
            onChange={handleChange}
            required
          />
          <TextField
            label="Over"
            name="over"
            type="number"
            value={formData.over}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Batting Team"
            name="batting_team"
            value={formData.batting_team}
            onChange={handleChange}
            required
          >
            {battingTeams.map((team) => (
              <MenuItem key={team} value={team}>{team}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Bowling Team"
            name="bowling_team"
            value={formData.bowling_team}
            onChange={handleChange}
            required
          >
            {bowlingTeams.map((team) => (
              <MenuItem key={team} value={team}>{team}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          >
            {venues.map((venue) => (
              <MenuItem key={venue} value={venue}>{venue}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Predict Score'}
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {prediction !== null && (
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 3, fontWeight: 'bold', color: 'primary.main' }}
          >
            Predicted Score: {prediction.toFixed(2)}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
