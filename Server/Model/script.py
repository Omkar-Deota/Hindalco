from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

with open('coal_quality_prediction_model.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Ensure the data is correctly formatted
    input_data = {
        'vehicle_no': [data['vehicle_no']],
        't_id': [data['t_id']],
        'weight_variation': [data['weight_variation']],
        'delay_minutes': [data['delay']]
    }
    
    input_df = pd.DataFrame(input_data)

    try:
        # Make predictions
        predictions = model.predict(input_df)
        
        # Return predictions
        return jsonify(predictions.tolist())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)