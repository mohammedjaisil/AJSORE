const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkColumns() {
    const { data, error } = await supabase.rpc('get_table_info', { table_name: 'orders' });
    if (error) {
        // Fallback: use a raw query if RPC fails
        const { data: cols, error: err2 } = await supabase.from('orders').select('*').limit(1);
        if (err2) console.log(err2);
        else console.log('Sample data:', cols[0]);
    } else {
        console.log(data);
    }
}

checkColumns();
