import hashlib
import os
import base64


def get_salt():
    salt = os.urandom(16)
    return salt

def hash_password(password, salt):
    # update the hasher to include the salt
    hasher = hashlib.sha256()
    hasher.update(salt)
    hasher.update(password.encode())  # Hash the password
    hashed_password = hasher.digest() # generate the digest

    # Concatenate salt and hashed password
    salted_hash = salt + hashed_password
    return base64.b64encode(salted_hash).decode()


def extract_salt(salted_hash):
    decoded_hash = base64.b64decode(salted_hash)
    return decoded_hash[:16]  # Salt is 16 bytes as defined in above method
