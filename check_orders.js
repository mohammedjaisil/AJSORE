const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic env parser
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.join('=').trim().replace(/^"(.*)"$/, '$1');
    }
});

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
);

async function checkOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('fulfillment_status, payment_status, status')
    .limit(10);

  if (error) {
    console.error('Error fetching orders:', error);
    return;
  }

  console.log('Orders sample:', JSON.stringify(data, null, 2));
}

checkOrders();
