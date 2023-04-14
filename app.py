from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins=["http://localhost:3000"], resources={r"/*": {"origins": "*"}})
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Chave secreta para assinar os tokens JWT
jwt = JWTManager(app)

users = []

class User:
    def __init__(self, name, email, password):
        self.id = len(users) + 1
        self.name = name
        self.email = email
        self.password = password
        self.registered_at = datetime.now()
        
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'registered_at': self.registered_at.isoformat(),
        }

def find_user(email, password):
    for user in users:
        if user.email == email and user.password == password:
            return user

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({'message': 'Missing fields'}), 400
    for user in users:
        if user.email == email:
            return jsonify({'message': 'Email already registered'}), 400
    user = User(name, email, password)
    users.append(user)
    access_token = create_access_token(identity=user.id)
    return jsonify({'user': user.to_dict(), 'access_token': access_token}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Missing fields'}), 400
    user = find_user(email, password)
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({'user': user.to_dict(), 'access_token': access_token}), 200

@app.route('/validate_token', methods=['POST'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    return jsonify({'user_id': current_user_id}), 200

@app.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    return jsonify({'users': [user.to_dict() for user in users]}), 200

if __name__ == '__main__':
    app.run(debug=True)
