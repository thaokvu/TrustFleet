BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Customer" (
	"custID"	INTEGER,
	"FirstName"	TEXT NOT NULL,
	"LastName"	TEXT NOT NULL,
	"Password"	TEXT NOT NULL,
	"Email"	TEXT NOT NULL,
	"PhoneNumber"	INTEGER NOT NULL,
	PRIMARY KEY("custID")
);
CREATE TABLE IF NOT EXISTS Employee (
    empID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Password TEXT NOT NULL,
    Email TEXT NOT NULL,
    PhoneNumber INTEGER NOT NULL,
    Position TEXT NOT NULL,
    FK_Employee INTEGER, -- Manager ID
    FOREIGN KEY (FK_Employee) REFERENCES Employee(empID) -- Self-referencing foreign key
);
CREATE TABLE IF NOT EXISTS RentalRecord (
    RecordID INTEGER PRIMARY KEY,
    Start_Date DATE NOT NULL,
    End_Date DATE, -- Nullable, as ongoing rentals might not have an end date yet
    Miles INTEGER,
    InitialCondition TEXT NOT NULL,
    ReturnCondition TEXT, -- Nullable, as ongoing rentals won't have a return condition
    FK_Cus INTEGER,
    FK_Vehicle INTEGER,
    Status TEXT DEFAULT 'Active', -- New column to track if the rental is ongoing ('Active') or completed ('Completed')
    FOREIGN KEY (FK_Cus) REFERENCES Customer(custID),
    FOREIGN KEY (FK_Vehicle) REFERENCES Vehicle(VIM)
);
CREATE TABLE IF NOT EXISTS Vehicle (
    VIM INTEGER PRIMARY KEY,
    Status TEXT NOT NULL,
    Type TEXT NOT NULL,
    Make TEXT NOT NULL,
    Model TEXT NOT NULL,
    Year TEXT NOT NULL,
    LicensePlate TEXT NOT NULL,
    MPG REAL NOT NULL,
    Miles INTEGER NOT NULL,
    Condition TEXT NOT NULL,
    FK_Mechanic INTEGER,
    FOREIGN KEY (FK_Mechanic) REFERENCES Employee(empID) -- References the mechanic's employee ID
);
CREATE VIEW ActiveRentals AS
SELECT 
	*
FROM 
	RentalRecord
WHERE 
	Status = "Active";
CREATE VIEW CompletedRentals AS
SELECT 
	*
FROM 
	RentalRecord
WHERE 
	Status = "Completed";
CREATE VIEW CustomerWithTotalRentals AS
SELECT 
    c.custID,
    c.FirstName,
    c.LastName,
    c.Email,
    c.PhoneNumber,
    COUNT(r.RecordID) AS TotalRentals
FROM 
    Customer c
LEFT JOIN 
    RentalRecord r ON c.custID = r.FK_Cus
GROUP BY 
    c.custID;
COMMIT;
