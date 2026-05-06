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
    const { data } = await supabase.from('products').select('*').limit(1);
    const cols = Object.keys(data[0]);
    console.log('Includes "category":', cols.includes('category'));
    console.log('Includes "category_name":', cols.includes('category_name'));
}
check();
