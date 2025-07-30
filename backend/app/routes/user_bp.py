from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from app import db, bcrypt
from app.models import User
from datetime import timedelta


user_bp = Blueprint('user', __name__)


# RUTA CREAR USUARIO
@user_bp.route('/signup', methods=['POST'])
def create_user():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')

        if not email or not password or not name:
            return jsonify({'error': 'Email, password y nombre son necesarios'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Este email ya esta en uso.'}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(email=email, password=password_hash, name=name)


        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully.','user_created':new_user.serialize()}), 201

    except Exception as e:
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500


#RUTA LOG-IN ( CON TOKEN DE RESPUESTA )
@user_bp.route('/login', methods=['POST'])
def get_token():
    try:

        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        login_user = User.query.filter_by(email=email).first()

        if not login_user:
            return jsonify({'error': 'El email proporcionado no corresponde a ninguno registrado'}), 404

        password_from_db = login_user.password
        true_o_false = bcrypt.check_password_hash(password_from_db, password)
        
        if true_o_false:
            expires = timedelta(minutes=30)

            user_id = login_user.id
            role = login_user.role
            additional_claims = { "role": role}

            access_token = create_access_token(identity=str(user_id), additional_claims=additional_claims, expires_delta=expires)
            return jsonify({ 'access_token':access_token, 'role': role}), 200

        else:
            return {"Error":"Contraseña  incorrecta"}, 401
    
    except Exception as e:
        return {"Error":"El email proporcionado no corresponde a ninguno registrado: " + str(e)}, 500
    
    
@user_bp.route('/users')
@jwt_required()
def show_users():
    current_user_id = get_jwt_identity()
    if current_user_id:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'email': user.email
            }
            user_list.append(user_dict)
        return jsonify(user_list), 200
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401
    






                
      
                
  