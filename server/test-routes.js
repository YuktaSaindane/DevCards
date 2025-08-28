// Quick test to check all routes
const http = require('http');

function testRoute(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({ path, status: res.statusCode, body: body.substring(0, 100) });
      });
    });

    req.on('error', (err) => {
      resolve({ path, status: 'ERROR', body: err.message });
    });

    req.end();
  });
}

async function testAllRoutes() {
  console.log('🧪 Testing all routes...\n');
  
  const routes = [
    '/api/health',
    '/api/test-flashcards',
    '/api/decks',
    '/api/decks/40b9f9c9-a586-4e3d-937e-b4eaf351f25a/flashcards', // Your specific deck ID
  ];
  
  for (const route of routes) {
    const result = await testRoute(route);
    console.log(`${result.status === 200 ? '✅' : '❌'} ${result.path} - Status: ${result.status}`);
    if (result.body && result.status === 200) {
      console.log(`   Response: ${result.body}...`);
    }
    console.log('');
  }
}

testAllRoutes();

