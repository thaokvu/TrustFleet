import java.security.*;
import java.util.*;

public class PwdSaltHasher {

    public static byte[] getSalt() throws NoSuchAlgorithmException {
        SecureRandom sr = SecureRandom.getInstanceStrong();
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt;
    }

    public static String hashPassword(String password, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt); // Salt the digest
        byte[] hashedPassword = md.digest(password.getBytes()); // Hash the password

        byte[] saltedHash = new byte[salt.length + hashedPassword.length]; // new pass
        System.arraycopy(salt, 0, saltedHash, 0, salt.length); // prepend salt
        System.arraycopy(hashedPassword, 0, saltedHash, salt.length, hashedPassword.length); // actual pass after
        return Base64.getEncoder().encodeToString(saltedHash);
    }



    public static byte[] extractSalt(String saltedHash) {
        byte[] decodedHash = Base64.getDecoder().decode(saltedHash);
        byte[] salt = new byte[16]; // Assuming salt is 16 bytes
        System.arraycopy(decodedHash, 0, salt, 0, salt.length);
        return salt;
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {

        String password = "mySecurePassword";
        byte[] salt = getSalt(); // Generate a salt
        System.out.println("Generated Salt: " + Base64.getEncoder().encodeToString(salt));
        String saltedHashedPassword = hashPassword(password, salt); // Hash the password

        System.out.println("Salted and Hashed Password: " + saltedHashedPassword);

        // If you need to extract the salt again later
        byte[] extractedSalt = extractSalt(saltedHashedPassword);
        System.out.println("Extracted Salt: " + Base64.getEncoder().encodeToString(extractedSalt));

    }
}
