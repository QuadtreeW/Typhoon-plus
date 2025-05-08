from flask import Flask, request, jsonify
from flask import render_template
import random
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/get-name', methods=['POST'])
def get_data():
    typhoon_name = request.json['name']
    with open('data_all.json', 'r') as f:
        data = json.load(f)
    if typhoon_name.strip() == '':
        # 如果搜索框为空，返回所有的台风名称
        result = list(set(item[4] for item in data))
    else:
        # 如果搜索框不为空，只返回匹配的台风名称
        result = list(set(item[4] for item in data if item[4] == typhoon_name))
    return jsonify(result)


@app.route('/get-selected-data', methods=['POST'])
def get_selected_data():
    selected_names = request.json['names']
    with open('data_all.json', 'r') as f:
        data = json.load(f)
    result = [item for item in data if item[4] in selected_names]
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
