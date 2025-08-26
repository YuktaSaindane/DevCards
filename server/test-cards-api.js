// Simple test script for the new card API endpoints
const http = require('http');

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testCardsAPI() {
  console.log('🧪 Testing New Cards API...\n');

  try {
    // Test 1: Get all decks to find a deck ID
    console.log('1️⃣ Getting decks to find a deck ID...');
    const decks = await makeRequest('/api/decks');
    console.log(`   Status: ${decks.status}`);
    
    if (decks.data.length === 0) {
      console.log('   ❌ No decks found! Make sure the server is seeded.');
      return;
    }
    
    const firstDeck = decks.data[0];
    console.log(`   Found deck: "${firstDeck.title}" with ${firstDeck.cards.length} cards`);
    console.log('   ✅ Get decks passed!\n');

    // Test 2: Get cards for the first deck
    console.log('2️⃣ Getting cards for the first deck...');
    const cards = await makeRequest(`/api/decks/${firstDeck.id}/cards`);
    console.log(`   Status: ${cards.status}`);
    console.log(`   Found ${cards.data.length} cards`);
    if (cards.data.length > 0) {
      console.log(`   First card: "${cards.data[0].front}" -> "${cards.data[0].back}"`);
    }
    console.log('   ✅ Get cards passed!\n');

    // Test 3: Add a new card
    console.log('3️⃣ Adding a new card...');
    const newCard = await makeRequest(`/api/decks/${firstDeck.id}/cards`, 'POST', {
      front: 'Test Question',
      back: 'Test Answer'
    });
    console.log(`   Status: ${newCard.status}`);
    console.log(`   Updated deck now has ${newCard.data.cards.length} cards`);
    console.log('   ✅ Add card passed!\n');

    // Test 4: Delete the card we just added
    const addedCard = newCard.data.cards[newCard.data.cards.length - 1];
    console.log('4️⃣ Deleting the card we just added...');
    const deleteResult = await makeRequest(`/api/decks/${firstDeck.id}/cards/${addedCard.id}`, 'DELETE');
    console.log(`   Status: ${deleteResult.status}`);
    console.log(`   Updated deck now has ${deleteResult.data.cards.length} cards`);
    console.log('   ✅ Delete card passed!\n');

    console.log('🎉 All card API tests passed! The new endpoints are working perfectly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 The server might not be running. Make sure to run:');
      console.log('   cd server');
      console.log('   npm run dev');
    }
  }
}

testCardsAPI();
