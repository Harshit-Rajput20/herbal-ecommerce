-- Run this SQL in the Supabase SQL Editor to make a user an admin
-- Replace 'YOUR_USER_ID' with the actual user ID you want to make an admin

INSERT INTO admin_users (id, email)
SELECT id, email FROM auth.users 
WHERE id = 'YOUR_USER_ID';

-- To find your user ID, you can run:
-- SELECT * FROM auth.users;
