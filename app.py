from flask import Flask, render_template, request,redirect, url_for,session,g,jsonify
from flask_sqlalchemy import SQLAlchemy
app: Flask = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\Users\\szymo\\Documents\\UserInterface\\database.db'
db = SQLAlchemy(app)
app.secret_key = 'wwa2020'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    surrname = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    identificator = db.Column(db.String(30), nullable=False)
    isHandi = db.Column(db.Integer, default = 0)
    hasTicket = db.Column(db.Integer, default=0)

    def __repr__(self):
        return  "User(name='%s', fullname='%s', IDnum='%s')" %(self.name, self.surrname, self.identificator)
@app.before_request
def before_request():
    if 'user_id' in session:
        g.user_id = User.query.get(session['user_id']).id
        g.nickname = User.query.get(session['user_id']).name
        g.identificator = User.query.get(session['user_id']).identificator
        g.hasTicket = User.query.get(session['user_id']).hasTicket

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/signup' , methods = ['POST'])
def signup():
    username = request.form['name']
    usersurrname = request.form['surrname']
    userpassword = request.form['password']
    useridNumber = request.form['idNumber']
    new_user = User(name = username,password = userpassword, surrname = usersurrname, identificator = useridNumber)
    comparator = User.query.filter_by(identificator = useridNumber).all()
    if comparator:
        return jsonify({'message': 'account exists'})
    else:
        db.session.add(new_user)
        db.session.commit()
        print(username)
        return jsonify({'message': 'Success'})

@app.route('/login' , methods = ['POST', 'GET'])
def login():
        password = request.form['password']
        idNumber = request.form['idnum']
        comparator = User.query.filter_by(identificator = idNumber).first()
        if comparator:
            if User.query.get(comparator.id).password ==password:
                session['user_id'] = comparator.id
                return render_template('main.html')
@app.route('/getQr', methods=['POST'])
def getQR():
    return jsonify({'userId': g.identificator, 'hasTicket': g.hasTicket})
@app.route('/buyTicket' , methods = ['POST'])
def buy():
     User.query.get(g.user_id).hasTicket = 1
     db.session.commit()
     return jsonify({'userId':g.identificator})
if __name__ == "__main__":
    app.run(debug=True)

