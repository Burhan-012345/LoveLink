from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)

# Get the directory where app.py is located
basedir = os.path.abspath(os.path.dirname(__file__))

# Configure database path - create in the same directory as app.py
database_path = os.path.join(basedir, 'lovelock.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class Letter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(300))
    music_path = db.Column(db.String(300))
    mood_tag = db.Column(db.String(100))
    order_index = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image_path': self.image_path,
            'music_path': self.music_path,
            'mood_tag': self.mood_tag,
            'order_index': self.order_index,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Reason(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reason = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'reason': self.reason,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Shayri(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100))
    mood = db.Column(db.String(100))
    order_index = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'category': self.category,
            'mood': self.mood,
            'order_index': self.order_index,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/letters')
def letters():
    letters = Letter.query.order_by(Letter.order_index).all()
    return render_template('letters.html', letters=letters)

@app.route('/shayri')
def shayri():
    return render_template('shayri.html')

@app.route('/secret')
def secret():
    return render_template('secret.html')

@app.route('/api/letters')
def api_letters():
    letters = Letter.query.order_by(Letter.order_index).all()
    letters_data = [letter.to_dict() for letter in letters]
    return jsonify(letters_data)

@app.route('/api/reasons')
def api_reasons():
    reasons = Reason.query.all()
    reasons_data = [reason.to_dict() for reason in reasons]
    return jsonify(reasons_data)

@app.route('/api/shayris')
def api_shayris():
    shayris = Shayri.query.order_by(Shayri.order_index).all()
    shayris_data = [shayri.to_dict() for shayri in shayris]
    return jsonify(shayris_data)

def create_tables():
    """Create database tables if they don't exist"""
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

if __name__ == '__main__':
    create_tables()
    app.run(debug=True, port=5000)