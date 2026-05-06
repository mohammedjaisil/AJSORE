const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

let supabaseUrl = '';
let supabaseKey = '';

try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const lines = env.split('\n');
    for (const line of lines) {
        if (line.trim().startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '');
        if (line.trim().startsWith('SUPABASE_SERVICE_ROLE_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '');
    }
} catch (e) {}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.rpc('get_enum_values', { enum_type_name: 'order_status' });
    if (error) {
        // Fallback: try to execute a raw SQL query or just guess based on standard types
        const { error: err } = await supabase.from('orders').select('*').eq('status', 'INVALID_TEST_STRING_123');
        if (err && err.message) {
             const match = err.message.match(/enum order_status: "([^"]+)",/);
             console.log('Error output to parse:', err.message);
        }
    } else {
        console.log(data);
    }
}
check();
