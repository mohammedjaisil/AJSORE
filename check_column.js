
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read directly from .env.local to avoid dotenv dependency if not installed
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSchema() {
  console.log('Attempting to add fulfillment_status column to orders table...');
  
  // We can't use .rpc() if we don't have a specific function
  // But we can try to run a query that might fail if it doesn't exist, 
  // or we can use the supabase client to check if it's there.
  
  // Actually, Supabase JS client doesn't support raw SQL unless we have an RPC.
  // I'll check if there's a column already or not.
  
  const { data, error } = await supabase
    .from('orders')
    .select('fulfillment_status')
    .limit(1);

  if (error && error.code === 'PGRST204') {
    console.error('Column fulfillment_status does not exist. You need to run this in Supabase SQL editor:');
    console.log('ALTER TABLE orders ADD COLUMN fulfillment_status TEXT DEFAULT \'UNFULFILLED\';');
  } else if (error) {
    console.error('Error checking column:', error);
  } else {
    console.log('Column fulfillment_status already exists.');
  }
}

fixSchema();
