from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)
# Set the path to the database file
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../Database/SecurityProject.db")
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define Models
class Customer(db.Model):
    custID = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String, nullable=False)
    LastName = db.Column(db.String, nullable=False)
    Password = db.Column(db.String, nullable=False)
    Email = db.Column(db.String, nullable=False)
    PhoneNumber = db.Column(db.Integer, nullable=False)

class Employee(db.Model):
    empID = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String, nullable=False)
    LastName = db.Column(db.String, nullable=False)
    Password = db.Column(db.String, nullable=False)
    Email = db.Column(db.String, nullable=False)
    PhoneNumber = db.Column(db.Integer, nullable=False)
    Position = db.Column(db.String, nullable=False)
    FK_Employee = db.Column(db.Integer, db.ForeignKey('employee.empID'))

class Vehicle(db.Model):
    VIN = db.Column(db.Integer, primary_key=True)
    Status = db.Column(db.String, nullable=False)
    Type = db.Column(db.String, nullable=False)
    Make = db.Column(db.String, nullable=False)
    Model = db.Column(db.String, nullable=False)
    Year = db.Column(db.String, nullable=False)
    LicensePlate = db.Column(db.String, nullable=False)
    MPG = db.Column(db.Float, nullable=False)
    Miles = db.Column(db.Integer, nullable=False)
    Condition = db.Column(db.String, nullable=False)
    FK_Mechanic = db.Column(db.Integer, db.ForeignKey('employee.empID'))

class RentalRecord(db.Model):
    RecordID = db.Column(db.Integer, primary_key=True)
    Start_Date = db.Column(db.Date, nullable=False)
    End_Date = db.Column(db.Date)
    Miles = db.Column(db.Integer)
    InitialCondition = db.Column(db.String, nullable=False)
    ReturnCondition = db.Column(db.String)
    FK_Cus = db.Column(db.Integer, db.ForeignKey('customer.custID'))
    FK_Vehicle = db.Column(db.Integer, db.ForeignKey('vehicle.VIN'))
    Status = db.Column(db.String, default='Active', nullable=False)

# Initialize Database
def create_tables():
    if not os.path.exists("SecurityProject.db"):
        db.create_all()
        print("Database and tables created.")
    else:
        print("Database already exists.")

# Routes for Customer
@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([{
        "custID": customer.custID,
        "FirstName": customer.FirstName,
        "LastName": customer.LastName,
        "Email": customer.Email,
        "PhoneNumber": customer.PhoneNumber
    } for customer in customers])

@app.route('/customer', methods=['POST'])
def add_customer():
    data = request.json
    new_customer = Customer(
        FirstName=data['FirstName'],
        LastName=data['LastName'],
        Password=data['Password'],
        Email=data['Email'],
        PhoneNumber=data['PhoneNumber']
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({"message": "Customer added successfully"}), 201

# Routes for Employee
@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([{
        "empID": employee.empID,
        "FirstName": employee.FirstName,
        "LastName": employee.LastName,
        "Email": employee.Email,
        "PhoneNumber": employee.PhoneNumber,
        "Position": employee.Position
    } for employee in employees])

@app.route('/employee', methods=['POST'])
def add_employee():
    data = request.json
    new_employee = Employee(
        FirstName=data['FirstName'],
        LastName=data['LastName'],
        Password=data['Password'],
        Email=data['Email'],
        PhoneNumber=data['PhoneNumber'],
        Position=data['Position'],
        FK_Employee=data.get('FK_Employee')  # Optional
    )
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({"message": "Employee added successfully"}), 201

# Routes for Vehicle
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        "VIN": vehicle.VIN,
        "Status": vehicle.Status,
        "Type": vehicle.Type,
        "Make": vehicle.Make,
        "Model": vehicle.Model,
        "Year": vehicle.Year,
        "LicensePlate": vehicle.LicensePlate,
        "MPG": vehicle.MPG,
        "Miles": vehicle.Miles,
        "Condition": vehicle.Condition
    } for vehicle in vehicles])

@app.route('/vehicle', methods=['POST'])
def add_vehicle():
    data = request.json
    new_vehicle = Vehicle(
        VIN=data['VIN'],
        Status=data['Status'],
        Type=data['Type'],
        Make=data['Make'],
        Model=data['Model'],
        Year=data['Year'],
        LicensePlate=data['LicensePlate'],
        MPG=data['MPG'],
        Miles=data['Miles'],
        Condition=data['Condition'],
        FK_Mechanic=data.get('FK_Mechanic')  # Optional
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({"message": "Vehicle added successfully"}), 201

# Routes for RentalRecord
@app.route('/rentals', methods=['GET'])
def get_rentals():
    rentals = RentalRecord.query.all()
    return jsonify([{
        "RecordID": rental.RecordID,
        "Start_Date": rental.Start_Date,
        "End_Date": rental.End_Date,
        "Miles": rental.Miles,
        "InitialCondition": rental.InitialCondition,
        "ReturnCondition": rental.ReturnCondition,
        "FK_Cus": rental.FK_Cus,
        "FK_Vehicle": rental.FK_Vehicle,
        "Status": rental.Status
    } for rental in rentals])

@app.route('/rental', methods=['POST'])
def add_rental():
    data = request.json
    new_rental = RentalRecord(
        Start_Date=data['Start_Date'],
        End_Date=data.get('End_Date'),
        Miles=data.get('Miles'),
        InitialCondition=data['InitialCondition'],
        ReturnCondition=data.get('ReturnCondition'),
        FK_Cus=data['FK_Cus'],
        FK_Vehicle=data['FK_Vehicle'],
        Status=data.get('Status', 'Active')
    )
    db.session.add(new_rental)
    db.session.commit()
    return jsonify({"message": "Rental record added successfully"}), 201

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
