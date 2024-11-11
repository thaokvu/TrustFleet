import java.sql.*;


public class SqlInteractor {
    private Connection conn;

    public SqlInteractor(String dbFilePath) throws SQLException {
        String url = "jdbc:sqlite:" + dbFilePath;
        conn = DriverManager.getConnection(url);
    }

    public void close() throws SQLException {
        if (conn != null) {
            conn.close();
        }
    }

    public ResultSet getCustomerByLastName(String lastName) throws SQLException {
            String sql = "SELECT * FROM Customer WHERE LastName = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, lastName);
            ResultSet rs = pstmt.executeQuery();
            return rs;
        }
    
    public ResultSet getCustomerById(int id) throws SQLException {
        String sql = "SELECT * FROM Customer WHERE custID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, id);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getCustomerByEmail(String email) throws SQLException {
        String sql = "SELECT * FROM Customer WHERE Email = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, email);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getCustomerByPhone(String phone) throws SQLException {
        String sql = "SELECT * FROM Customer WHERE Phone = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, phone);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getEmployeeById(int id) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE empID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, id);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getEmployeeByEmail(String email) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE Email = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, email);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getEmployeeByPhone(String phone) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE Phone = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, phone);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getEmployeeByLastName(String lastName) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE LastName = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, lastName);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getEmployeeByPosition(String position) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE Position = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, position);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }
    
    public ResultSet getEmployeeByManager(int managerID) throws SQLException {
        String sql = "SELECT * FROM Employee WHERE FK_Employee = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, managerID);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getVehicleByVIN(String vin) throws SQLException {
        String sql = "SELECT * FROM Vehicle WHERE VIN = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, vin);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getVehicleByLicensePlate(String licensePlate) throws SQLException {
        String sql = "SELECT * FROM Vehicle WHERE LicensePlate = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, licensePlate);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getVehicleByMechanic(int mechanicID) throws SQLException {
        String sql = "SELECT * FROM Vehicle WHERE FK_Mechanic = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, mechanicID);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getRentalRecordByCustomer(int custID) throws SQLException {
        String sql = "SELECT * FROM RentalRecord WHERE FK_Cus = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, custID);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getRentalRecordByVehicle(String vin) throws SQLException {
        String sql = "SELECT * FROM RentalRecord WHERE FK_Vehicle = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, vin);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    public ResultSet getRentalRecordActive() throws SQLException {
        String sql = "SELECT * FROM RentalRecord WHERE status = 'Active'";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        return rs;
    }

    // Setters

    public void setCustomer(String firstName, String lastName, String email, String phone, String password, byte[] salt) throws SQLException {
        String sql = "INSERT INTO Customer (FirstName, LastName, Email, Phone, Password, Salt) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, firstName);
        pstmt.setString(2, lastName);
        pstmt.setString(3, email);
        pstmt.setString(4, phone);
        pstmt.setString(5, password);
        pstmt.setBytes(6, salt);
        pstmt.executeUpdate();
    }

    public void setEmployee(String firstName, String lastName, String email, String phone, String password, byte[] salt, String position, int managerID) throws SQLException {
        String sql = "INSERT INTO Employee (FirstName, LastName, Email, Phone, Password, Salt, Position, FK_Employee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, firstName);
        pstmt.setString(2, lastName);
        pstmt.setString(3, email);
        pstmt.setString(4, phone);
        pstmt.setString(5, password);
        pstmt.setBytes(6, salt);
        pstmt.setString(7, position);
        pstmt.setInt(8, managerID);
        pstmt.executeUpdate();
    }

    public void setVehicle(String vin, String licensePlate, String make, String model, int year, String color, int mechanicID) throws SQLException {
        String sql = "INSERT INTO Vehicle (VIN, LicensePlate, Make, Model, Year, Color, FK_Mechanic) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, vin);
        pstmt.setString(2, licensePlate);
        pstmt.setString(3, make);
        pstmt.setString(4, model);
        pstmt.setInt(5, year);
        pstmt.setString(6, color);
        pstmt.setInt(7, mechanicID);
        pstmt.executeUpdate();
    }

    public void setRentalRecord(int custID, String vin, String startDate, String endDate, String status) throws SQLException {
        String sql = "INSERT INTO RentalRecord (FK_Cus, FK_Vehicle, StartDate, EndDate, Status) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, custID);
        pstmt.setString(2, vin);
        pstmt.setString(3, startDate);
        pstmt.setString(4, endDate);
        pstmt.setString(5, status);
        pstmt.executeUpdate();
    }

    public void setRentalRecordStatus(String vin, String status) throws SQLException {
        // status should be either "Active" or "Completed"
        String sql = "UPDATE RentalRecord SET Status = ? WHERE FK_Vehicle = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, status);
        pstmt.setString(2, vin);
        pstmt.executeUpdate();
    }

    public void setVehicleMechanic(String vin, int mechanicID) throws SQLException {
        String sql = "UPDATE Vehicle SET FK_Mechanic = ? WHERE VIN = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, mechanicID);
        pstmt.setString(2, vin);
        pstmt.executeUpdate();
    }

    public void setEmployeeManager(int empID, int managerID) throws SQLException {
        String sql = "UPDATE Employee SET FK_Employee = ? WHERE empID = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, managerID);
        pstmt.setInt(2, empID);
        pstmt.executeUpdate();
    }

    public static void main(String[] args) {
        try {
            SqlInteractor db = new SqlInteractor("Database/SecurityProject.db");
            db.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}