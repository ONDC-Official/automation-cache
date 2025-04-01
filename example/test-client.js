const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Helper function to make API requests
async function makeRequest(method, endpoint, data = null) {
  try {
    console.log(`Making ${method} request to ${endpoint}`);
    
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Request error details:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.message);
      console.error('Is the server running?');
    } else {
      console.error('Error in request setup:', error.message);
    }
    throw error;
  }
}

// Test the API
async function runTests() {
  console.log('Redis Cache API Test Client');
  console.log('==========================\n');
  
  try {
    // Check if the server is running
    console.log('1. Testing server connection...');
    const homeResponse = await makeRequest('GET', '/');
    console.log('Response:', homeResponse);
    console.log('Server is running!\n');
    
    // Create a new session
    console.log('2. Creating a new session...');
    const sessionId = 'test-session-' + Date.now();
    const sessionData = {
      userId: 123,
      username: 'testuser',
      preferences: {
        theme: 'dark',
        language: 'en'
      },
      lastLogin: new Date().toISOString()
    };
    
    const createResponse = await makeRequest('POST', '/sessions', {
      sessionId,
      data: sessionData
    });
    console.log('Response:', createResponse);
    console.log('Session created successfully!\n');
    
    // Retrieve the session
    console.log('3. Retrieving the session...');
    const getResponse = await makeRequest('GET', `/sessions/${sessionId}`);
    console.log('Response:', getResponse);
    
    // Verify data is correct
    if (JSON.stringify(getResponse.data) === JSON.stringify(sessionData)) {
      console.log('Data verification: SUCCESS - Data matches what was stored\n');
    } else {
      console.log('Data verification: FAILED - Data does not match\n');
      console.log('Expected:', sessionData);
      console.log('Received:', getResponse.data);
    }
    
    // Delete the session
    console.log('4. Deleting the session...');
    const deleteResponse = await makeRequest('DELETE', `/sessions/${sessionId}`);
    console.log('Response:', deleteResponse);
    console.log('Session deleted successfully!\n');
    
    // Verify session is deleted
    console.log('5. Verifying session is deleted...');
    const verifyDeleteResponse = await makeRequest('GET', `/sessions/${sessionId}`);
    
    if (!verifyDeleteResponse.success && verifyDeleteResponse.message === 'Session not found') {
      console.log('Delete verification: SUCCESS - Session was properly deleted\n');
    } else {
      console.log('Delete verification: FAILED - Session still exists\n');
    }
    
    console.log('All tests completed!');
    
  } catch (error) {
    console.error('Test failed with error:', error.message);
  }
}

// Run the tests
runTests(); 