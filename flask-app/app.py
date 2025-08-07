from flask import Flask, jsonify, request
from flask_cors import CORS
from agents_data import agents
#from agents_db import agent_chain
import os
 
app = Flask(__name__)
CORS(app)
 
@app.route("/agents", methods=["GET"])
def get_all_agents():
    return jsonify(list(agents.keys()))
 
@app.route("/agent/<name>", methods=["GET"])
def get_agent_info(name):
    decoded_name = name.replace('%20', ' ')
    agent = agents.get(decoded_name)
    if agent:
        return jsonify({
            "name": decoded_name,
            "description": agent["description"],
            "narrative": agent["narrative"]
        })
    else:
        return jsonify({"error": "Agent not found"}), 404
 
 
# @app.route("/migrate", methods=["POST"])
# def run_migration():
#     data = request.json
#     filename = data.get("filename")
 
#     if not filename:
#         return {"error": "Filename required"}, 400
 
#     try:
#         result = agent_chain.run(f"Migrate data from {filename}")
#         return {"message": result}, 200
#     except Exception as e:
#         return {"error": str(e)}, 500
 
UPLOAD_DIR = os.path.abspath("uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
 
@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return {"error": "No file part"}, 400
 
    file = request.files["file"]
    if file.filename == "":
        return {"error": "No selected file"}, 400
 
    filepath = os.path.join(UPLOAD_DIR, file.filename)
    file.save(filepath)
    return {"message": "File uploaded", "filename": filepath}
 
if __name__ == '__main__':
    app.run(port=5003)