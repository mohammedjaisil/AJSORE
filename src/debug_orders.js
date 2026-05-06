const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let supabaseUrl = '';
let supabaseKey = '';

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const lines = env.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
            supabaseUrl = trimmed.split('=')[1].trim().replace(/['"]/g, '');
        }
        if (trimmed.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
            supabaseKey = trimmed.split('=')[1].trim().replace(/['"]/g, '');
        }
    }
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('orders').select('*').limit(1);
    if (error) {
        console.log('Error fetching orders:', error);
    } else if (data && data.length > 0) {
        console.log('Order Columns:', Object.keys(data[0]));
    } else {
        console.log('No orders in table to check columns.');
        // Try getting info from information_schema if possible, but simpler to just try a query on a non-existent table to see columns? 
        // Or just select a dummy column.
    }
}
check();
