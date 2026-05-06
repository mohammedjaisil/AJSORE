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
    const { data, error } = await supabase.from('orders').select('fulfillment_status');
    if (error) console.log(error);
    else {
        const statuses = [...new Set(data.map(o => o.fulfillment_status))];
        console.log('Unique Fulfillment Statuses:', statuses);
    }
}
check();
