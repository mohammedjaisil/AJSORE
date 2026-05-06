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
    const { data } = await supabase.from('orders').select('fulfillment_status');
    console.log('Fulfillment Statuses:', [...new Set(data?.map(o => o.fulfillment_status) || [])]);
}
check();
