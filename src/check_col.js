const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let supabaseUrl = '';
let supabaseKey = '';

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const getEnv = (key) => {
        const lines = env.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith(`${key}=`)) {
                return trimmed.split('=')[1].trim().replace(/['"]/g, '');
            }
        }
        return null;
    };
    supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
    supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: orders, error } = await supabase.from('orders').select('fulfillment_status').limit(1);
    if (error) console.log(error);
    else console.log('Fulfillment Status Type/Sample:', typeof orders[0]?.fulfillment_status, orders[0]?.fulfillment_status);
}
check();
