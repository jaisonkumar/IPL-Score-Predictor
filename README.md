# IPL First Innings Score Predictor

## Overview
The IPL First Innings Score Predictor is a web application that predicts the total first innings cricket score based on current match conditions. It leverages a machine learning model trained on historical IPL data to forecast scores dynamically using features like current runs, wickets, overs, teams, venue, and city.

***

<img width="685" height="848" alt="Screenshot 2025-10-28 015913" src="https://github.com/user-attachments/assets/1cc110e6-d8c3-47e9-ab5f-eb347da49de4" />


## Features

- Predict first innings scores based on live match state.
- Supports all IPL teams and popular venues.
- Provides user-friendly, modern web UI for easy input and result display.
- Backend API built with Django serving prediction model.
- Machine learning model built using RandomForestRegressor for robust predictions.

***

## Tech Stack & Tools

- Frontend: React with Material UI for modern and responsive UI.
- Backend: Django REST API for serving machine learning model.
- Machine Learning: Python, scikit-learn RandomForestRegressor.
- Other: Axios/fetch API for client-server communication.

***

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js and npm
- Git

### Installation Steps

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/ipl-score-predictor.git
cd ipl-score-predictor
```

2. **Setup backend**

```bash
cd ipl_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Setup frontend**

In a new terminal window:

```bash
cd ipl_frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:8000`.

### Usage

- Open the frontend in your browser.
- Fill in match details including current runs, wickets, over, teams, venue, and city.
- Click **Predict Score** to receive the predicted first innings score.

***

## Code Structure

- `ipl_backend/`: Django backend and API code.
- `ipl_frontend/`: React frontend source code.
- `ipl_backend/predictor/models.py`: Machine learning model loading and inference logic.
- `ipl_frontend/src/App.js`: Main React application and UI components.

***


## License

This project is licensed under the MIT License.

***
