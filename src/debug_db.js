const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Simple manual env reader
let supabaseUrl = '';
let supabaseKey = '';

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const getEnv = (key) => {
        const lines = env.split('\n');
        for (const line of lines) {
            if (line.startsWith(`${key}=`)) {
                return line.split('=')[1].trim().replace(/['"]/g, '');
            }
        }
        return null;
    };
    supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
    supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
} catch (e) {
    console.log('Env read error:', e.message);
}

if (!supabaseUrl || !supabaseKey) {
    console.log('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- Orders Sample ---');
    const { data: orders, error: oErr } = await supabase.from('orders').select('*').limit(1);
    if (oErr) console.log('Orders Error:', oErr);
    else if (orders && orders.length > 0) console.log('Order Sample:', orders[0]);
    else console.log('No orders found');

    console.log('--- Products Sample ---');
    const { data: products, error: pErr } = await supabase.from('products').select('*').limit(1);
    if (pErr) console.log('Products Error:', pErr);
    else if (products && products.length > 0) console.log('Product Sample:', products[0]);
}

check();
