# Welcome to TrustFleet!

## About
> TrustFleet's mission is to revolutionize the vehicle and equipment industry by developing a secure and reliable system. Traditional rental services often struggle with issues like identity theft, unauthorized use of vehicles, and property damage.
> Our application will incorporate cutting-edge security measures, including multi-factor authentication (MFA), to guarantee verifiable transactions, safeguard customer information, and protect rented assets.
> We are aiming to deploy this system in high-traffic areas, like airports, where security and efficiency are of the utmost importance.

## Usage
This project requires having npm (https://nodejs.org/en/download/prebuilt-installer) and Python 3 (https://www.python.org/downloads/) installed on your system.

### Setup and activate Python virtual environment (optional):
```
cd backend
python -m venv venv
```
Windows:
```
venv\Scripts\activate.bat
```
Linux and MacOS:
```
source venv/bin/activate
```
When finished running the project, deactivate the virtual environment:
```
deactivate
```

### Start Backend:
```
cd backend
pip install -r requirements.txt
python app.py
```

### Start Frontend:
```
cd Frontend
npm install
npm run dev
```


## Key Features
- **Authentication & Security:** Implemented advanced multi-factor authentication (MFA) and data encryption to protect user identities and secure vehicle rental transactions, addressing risks like identity theft and vehicle misuse.
- **Real-Time Availability Tracking:** Continuously monitor the availability of vehicles and equipment, ensuring efficient rental management, especially in high-demand locations like airports.
- **Auditing & Compliance:** Maintain detailed system logs to track all transactions and activities, enabling thorough auditing and ensuring regulatory compliance.
- **Data Protection:** Utilize a robust database management system to securely store and control access to customer and rental data, safeguarding confidentiality and integrity.
- **Payment Integration:** Integrate with payment systems to facilitate efficient and secure transactions between users and the rental service.

## Technology Stack
- **Frontend:** ReactJS, Material UI
- **Backend:** Python, Flask, SQLAlchemy
- **Database:** SQLite
- **Security:** hashlib, PyOTP, qrcode
