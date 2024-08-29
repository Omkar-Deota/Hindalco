from flask import Flask, request, jsonify
import pickle
import pandas as pd
import sqlalchemy

app = Flask(__name__)

# Load your model
with open('coal_quality_prediction_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Database connection
engine = sqlalchemy.create_engine("mysql+pymysql://root:Omkar12345@localhost:3306/samplecheck")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract input data from request
    vehicle_no = data.get('vehicle_no')
    t_id = data.get('t_id')
    weight_variation = data.get('weight_variation')
    delay_minutes = data.get('delay')

    # Prepare DataFrame for prediction
    input_df = pd.DataFrame({
        'vehicle_no': [vehicle_no],
        't_id': [t_id],
        'weight_variation': [weight_variation],
        'delay_minutes': [delay_minutes]
    })

    # Make predictions
    predictions = model.predict(input_df)
    
    # Create response with moisture and gcv predictions
    response = {
        'moisture': predictions[0][0],
        'gcv': predictions[0][1]
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000)
