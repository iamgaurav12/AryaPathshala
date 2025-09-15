# Environment Variables Setup for Arya Pathshala Admin

To securely set up the admin authentication system, you'll need to configure the following environment variables in your `.env` file:

## Required Variables

1. `VITE_ADMIN_USERNAME`
   - The username for the admin account
   - Example: `VITE_ADMIN_USERNAME=admin`

2. `VITE_ADMIN_PASSWORD_HASH`
   - The SHA-256 hash of the admin password
   - You can generate this hash using the following steps:
     1. Open the browser console
     2. Paste and run the following code:
     ```javascript
     async function generateHash(password) {
       const encoder = new TextEncoder();
       const data = encoder.encode(password);
       const hashBuffer = await crypto.subtle.digest('SHA-256', data);
       const hashArray = Array.from(new Uint8Array(hashBuffer));
       return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
     }
     
     // Replace 'your-password' with your actual password
     generateHash('your-password').then(hash => console.log(hash));
     ```
     3. Copy the generated hash
     4. Add it to your .env file:
     ```
     VITE_ADMIN_PASSWORD_HASH=your-generated-hash
     ```

## Important Security Notes

1. Never commit your `.env` file to version control
2. Keep your password and its hash secure
3. Regularly update your password and its hash
4. Use a strong password that includes:
   - At least 12 characters
   - Mix of uppercase and lowercase letters
   - Numbers
   - Special characters

## Example .env file

```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD_HASH=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
```

Note: The example hash above is for the password "password" and should NOT be used in production.