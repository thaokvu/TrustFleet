from flask import Flask, jsonify, request, send_file
from flask_sqlalchemy import SQLAlchemy
import os
import pyotp
import qrcode
from io import BytesIO

app = Flask(__name__)
# Set the path to the database file
db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../Database/SecurityProject.db')
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
    SecretOTP = db.Column(db.String(16), nullable=False, default=pyotp.random_base32())

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
    Status = db.Column(db.String, default='active', nullable=False)

# Initialize Database
def create_tables():
    if not os.path.exists('securityProject.db'):
        db.create_all()
        print('Database and tables created.')
    else:
        print('Database already exists.')

# CUSTOMER ROUTES
# Get all customers
@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([{
        'custID': customer.custID,
        'firstName': customer.FirstName,
        'lastName': customer.LastName,
        'email': customer.Email,
        'phoneNumber': customer.PhoneNumber
    } for customer in customers])

# Add a customer
@app.route('/customer', methods=['POST'])
def add_customer():
    data = request.json
    new_customer = Customer(
        FirstName=data['firstName'],
        LastName=data['lastName'],
        Password=data['password'],
        Email=data['email'],
        PhoneNumber=data['phoneNumber']
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'customer added successfully'}), 201

# Get customer by ID
@app.route('/customer/<int:custID>', methods=['GET'])
def get_customer_by_id(custID):
    customer = Customer.query.get(custID)
    if customer:
        return jsonify({
            'custID': customer.custID,
            'firstName': customer.FirstName,
            'lastName': customer.LastName,
            'email': customer.Email,
            'phoneNumber': customer.PhoneNumber
        })
    return jsonify({'message': 'customer not found'}), 404

# Get customer by Email 
@app.route('/customer/email/<string:email>', methods=['GET'])
def get_customer_by_email(email):
    customer = Customer.query.filter_by(Email=email).first()
    if customer:
        return jsonify({
            'custID': customer.custID,
            'firstName': customer.FirstName,
            'lastName': customer.LastName,
            'email': customer.Email,
            'phoneNumber': customer.PhoneNumber
        })
    return jsonify({'message': 'customer not found'}), 404

# Get customer by last name 
@app.route('/customer/lastname/<string:last_name>', methods=['GET'])
def get_customer_by_lastname(last_name):
    customers = Customer.query.filter_by(LastName=last_name).all()
    if customers:
        return jsonify([{
            'custID': customer.custID,
            'firstName': customer.FirstName,
            'lastName': customer.LastName,
            'email': customer.Email,
            'phoneNumber': customer.PhoneNumber
        } for customer in customers])
    return jsonify({'message': 'No customers found with that last name'}), 404

# Get customer by phone num
@app.route('/customer/phone/<string:phone_number>', methods=['GET'])
def get_customer_by_phone(phone_number):
    customer = Customer.query.filter_by(PhoneNumber=phone_number).first()
    if customer:
        return jsonify({
            'custID': customer.custID,
            'firstName': customer.FirstName,
            'lastName': customer.LastName,
            'email': customer.Email,
            'phoneNumber': customer.PhoneNumber
        })
    return jsonify({'message': 'customer not found'}), 404

# EMPLOYEE ROUTES 
# Get all employees
@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([{
        'empID': employee.empID,
        'firstName': employee.FirstName,
        'lastName': employee.LastName,
        'email': employee.Email,
        'phoneNumber': employee.PhoneNumber,
        'position': employee.Position
    } for employee in employees])

# Add employee 
@app.route('/employee', methods=['POST'])
def add_employee():
    data = request.json
    new_employee = Employee(
        FirstName=data['firstName'],
        LastName=data['lastName'],
        Password=data['password'],
        Email=data['email'],
        PhoneNumber=data['phoneNumber'],
        Position=data['position'],
        FK_Employee=data.get('FKEmployee')  # Optional
    )
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({'message': 'employee added successfully'}), 201

# Get employee by ID
@app.route('/employee/<int:employee_id>', methods=['GET'])
def get_employee_by_id(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        return jsonify({
            'employeeID': employee.EmployeeID,
            'firstName': employee.FirstName,
            'lastName': employee.LastName,
            'email': employee.Email,
            'phoneNumber': employee.PhoneNumber
        })
    return jsonify({'message': 'employee not found'}), 404

# Get employee by email 
@app.route('/employee/email/<string:email>', methods=['GET'])
def get_employee_by_email(email):
    employee = Employee.query.filter_by(Email=email).first()
    if employee:
        return jsonify({
            'employeeID': employee.EmployeeID,
            'firstName': employee.FirstName,
            'lastName': employee.LastName,
            'email': employee.Email,
            'phoneNumber': employee.PhoneNumber
        })
    return jsonify({'message': 'employee not found'}), 404

# Get employee by last name 
@app.route('/employee/lastname/<string:last_name>', methods=['GET'])
def get_employee_by_lastname(last_name):
    employees = Employee.query.filter_by(LastName=last_name).all()
    if employees:
        return jsonify([{
            'employeeID': employee.EmployeeID,
            'firstName': employee.FirstName,
            'lastName': employee.LastName,
            'email': employee.Email,
            'phoneNumber': employee.PhoneNumber
        } for employee in employees])
    return jsonify({'message': 'No employees found with that last name'}), 404

# Get employee by phone num
@app.route('/employee/phone/<string:phone_number>', methods=['GET'])
def get_employee_by_phone(phone_number):
    employee = Employee.query.filter_by(PhoneNumber=phone_number).first()
    if employee:
        return jsonify({
            'employeeID': employee.EmployeeID,
            'firstName': employee.FirstName,
            'lastName': employee.LastName,
            'email': employee.Email,
            'phoneNumber': employee.PhoneNumber
        })
    return jsonify({'message': 'employee not found'}), 404

# VEHICLE ROUTES 
# Get all vehicles
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        'vIN': vehicle.VIN,
        'status': vehicle.Status,
        'type': vehicle.Type,
        'make': vehicle.Make,
        'model': vehicle.Model,
        'year': vehicle.Year,
        'licensePlate': vehicle.LicensePlate,
        'MPG': vehicle.MPG,
        'miles': vehicle.Miles,
        'condition': vehicle.Condition
    } for vehicle in vehicles])

# Add a vehicle
@app.route('/vehicle', methods=['POST'])
def add_vehicle():
    data = request.json
    new_vehicle = Vehicle(
        VIN=data['vIN'],
        Status=data['status'],
        Type=data['type'],
        Make=data['make'],
        Model=data['model'],
        Year=data['year'],
        LicensePlate=data['licensePlate'],
        MPG=data['MPG'],
        Miles=data['miles'],
        Condition=data['condition'],
        FK_Mechanic=data.get('FKMechanic')  # Optional
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({'message': 'vehicle added successfully'}), 201

# Get vehicle by VIN 
@app.route('/vehicle/vin/<string:vin>', methods=['GET'])
def get_vehicle_by_vin(vin):
    vehicle = Vehicle.query.filter_by(VIN=vin).first()
    if vehicle:
        return jsonify({
            'vIN': vehicle.VIN,
            'make': vehicle.Make,
            'model': vehicle.Model,
            'year': vehicle.Year,
            'licensePlate': vehicle.LicensePlate
        })
    return jsonify({'message': 'vehicle not found'}), 404

# Get vehicle by License Plate
@app.route('/vehicle/licenseplate/<string:license_plate>', methods=['GET'])
def get_vehicle_by_license_plate(license_plate):
    vehicle = Vehicle.query.filter_by(LicensePlate=license_plate).first()
    if vehicle:
        return jsonify({
            'vIN': vehicle.VIN,
            'make': vehicle.Make,
            'model': vehicle.Model,
            'year': vehicle.Year,
            'licensePlate': vehicle.LicensePlate
        })
    return jsonify({'message': 'vehicle not found'}), 404

# RENTAL RECORD ROUTES
# Get all rental records
@app.route('/rentals', methods=['GET'])
def get_rentals():
    rentals = RentalRecord.query.all()
    return jsonify([{
        'recordID': rental.RecordID,
        'startDate': rental.Start_Date,
        'endDate': rental.End_Date,
        'miles': rental.Miles,
        'initialCondition': rental.InitialCondition,
        'returnCondition': rental.ReturnCondition,
        'FKCus': rental.FK_Cus,
        'FKVehicle': rental.FK_Vehicle,
        'status': rental.Status
    } for rental in rentals])

# Add a rental record
@app.route('/rental', methods=['POST'])
def add_rental():
    data = request.json
    new_rental = RentalRecord(
        Start_Date=data['startDate'],
        End_Date=data.get('endDate'),
        Miles=data.get('miles'),
        InitialCondition=data['initialCondition'],
        ReturnCondition=data.get('returnCondition'),
        FK_Cus=data['FKCus'],
        FK_Vehicle=data['FKVehicle'],
        Status=data.get('status', 'active')
    )
    db.session.add(new_rental)
    db.session.commit()
    return jsonify({'message': 'rental record added successfully'}), 201

# Get rental record by customer
@app.route('/rentalrecord/customer/<int:customer_id>', methods=['GET'])
def get_rental_record_by_customer_id(customer_id):
    rental_records = RentalRecord.query.filter_by(CustomerID=customer_id).all()
    if rental_records:
        return jsonify([{
            'rentalID': record.RentalID,
            'customerID': record.CustomerID,
            'vehicleVIN': record.VehicleVIN,
            'startDate': record.StartDate,
            'endDate': record.EndDate,
            'status': record.Status
        } for record in rental_records])
    return jsonify({'message': 'No rental records found for this customer'}), 404

# Get rental record by VIN 
@app.route('/rentalrecord/vehicle/<string:vehicle_vin>', methods=['GET'])
def get_rental_record_by_vehicle_vin(vehicle_vin):
    rental_records = RentalRecord.query.filter_by(VehicleVIN=vehicle_vin).all()
    if rental_records:
        return jsonify([{
            'rentalID': record.RentalID,
            'customerID': record.CustomerID,
            'vehicleVIN': record.VehicleVIN,
            'startDate': record.StartDate,
            'endDate': record.EndDate,
            'status': record.Status
        } for record in rental_records])
    return jsonify({'message': 'No rental records found for this vehicle'}), 404

# Generate QR Codes for Google Auth
@app.route('/customer/<int:custID>/generate', methods=['GET'])
def generate_otp(custID):
    customer = Customer.query.get(custID)
    if not customer:
        return jsonify({'message': 'Customer not found'}), 404

    otp = pyotp.TOTP(customer.SecretOTP)
    uri = otp.provisioning_uri(name=customer.Email, issuer_name="YourAppName")
    img = qrcode.make(uri)
    buffer = BytesIO()
    img.save(buffer)
    buffer.seek(0)
    return send_file(buffer, mimetype="image/png")

@app.route('/customer/<int:custID>/verify', methods=['POST'])
def verify_otp(custID):
    data = request.json
    otp_code = data.get('otp_code')

    customer = Customer.query.get(custID)
    if not customer:
        return jsonify({'message': 'Customer not found'}), 404

    otp = pyotp.TOTP(customer.SecretOTP)
    if otp.verify(otp_code):
        return jsonify({'message': 'OTP verified successfully'})
    else:
        return jsonify({'message': 'Invalid OTP'}), 400

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
