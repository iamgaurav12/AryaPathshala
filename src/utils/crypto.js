// Helper function to hash passwords using SHA-256
export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// Compare a password with a hash
export const comparePasswords = async (password, hashedPassword) => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hashedPassword;
};