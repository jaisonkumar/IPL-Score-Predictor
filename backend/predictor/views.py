import os
import pickle
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Load model + mapping dicts
model_path = os.path.join(os.path.dirname(__file__), 'xgb_ipl_with_maps.pkl')
with open(model_path, 'rb') as f:
    saved = pickle.load(f)

model = saved['model']
batting_team_map = saved['batting_team_map']
bowling_team_map = saved['bowling_team_map']
venue_map = saved['venue_map']
city_map = saved['city_map']

@csrf_exempt
def predict_score(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST request required'}, status=400)
    
    try:
        data = json.loads(request.body)

        batting_team_enc = batting_team_map.get(data['batting_team'])
        bowling_team_enc = bowling_team_map.get(data['bowling_team'])
        venue_enc = venue_map.get(data['venue'])
        city_enc = city_map.get(data['city'])

        if None in [batting_team_enc, bowling_team_enc, venue_enc, city_enc]:
            return JsonResponse({'error': 'Invalid team, venue, or city name'}, status=400)

        features = np.array([
            float(data['cumulative_runs']),
            float(data['cumulative_wickets']),
            float(data['over']),
            batting_team_enc,
            bowling_team_enc,
            venue_enc,
            city_enc
        ]).reshape(1, -1)

        print("Input features for prediction:", features.tolist())
        pred_score = model.predict(features)[0]
        return JsonResponse({'predicted_score': round(float(pred_score), 2)})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
