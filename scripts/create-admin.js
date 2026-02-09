// Script to generate bcrypt hash for admin password
const bcrypt = require('bcryptjs');

const password = 'admin123'; // Change this to your desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
        console.error('Error generating hash:', err);
        return;
    }

    console.log('\n=== ADMIN USER CREATION ===\n');
    console.log('Password:', password);
    console.log('Bcrypt Hash:', hash);
    console.log('\n=== SQL COMMAND ===\n');
    console.log(`
-- Run this in your Supabase SQL Editor:
INSERT INTO public.users (email, name, role, password, email_verified)
VALUES (
    'admin@ajstore.com',
    'Super Admin',
    'ADMIN',
    '${hash}',
    NOW()
)
ON CONFLICT (email) 
DO UPDATE SET 
    role = 'ADMIN',
    password = '${hash}';
    `);
    console.log('\n=== LOGIN CREDENTIALS ===\n');
    console.log('Email: admin@ajstore.com');
    console.log('Password:', password);
    console.log('\n========================\n');
});
