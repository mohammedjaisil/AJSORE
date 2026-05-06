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
    const { data, error } = await supabase.from('orders').select('*').limit(1);
    const row = data[0];
    const cols = Object.keys(row);
    console.log('Columns Found:', cols.length);
    if (cols.includes('fulfillment_status')) console.log('MATCH: fulfillment_status');
    if (cols.includes('enhanced_status')) console.log('MATCH: enhanced_status');
    if (cols.includes('status')) console.log('MATCH: status');
}
check();
