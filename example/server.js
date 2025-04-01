// Load environment variables
require('dotenv').config();

// Improved error handling and debugging
try {
  // Remove mock Redis patching
  console.log('Using real Redis instance...');

  console.log('Loading dependencies...');
  const express = require('express');
  const bodyParser = require('body-parser');
  
  console.log('Importing Redis cache library...');
  const { ApiServiceCache, RedisService } = require('../dist');

  // Initialize the Express app
  const app = express();
  const port = 3001;

  // Middleware
  app.use(bodyParser.json());

  console.log('Initializing Redis connection...');
  // Create an instance of ApiServiceCache
  const apiCache = new ApiServiceCache(RedisService);

  // Routes
  app.get('/', (req, res) => {
    console.log('Home endpoint accessed');
    res.json({ message: 'Welcome to the Redis Cache Example API' });
  });

  // Create a session
  app.post('/sessions', async (req, res) => {
    console.log('Creating session:', req.body);
    try {
      const { sessionId, data } = req.body;
      
      if (!sessionId || !data) {
        return res.status(400).json({ error: 'sessionId and data are required' });
      }
      
      const result = await apiCache.setSessionIdFromAPIService(sessionId, JSON.stringify(data));
      
      if (result) {
        res.status(201).json({ 
          success: true, 
          message: 'Session created successfully',
          sessionId
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to create session' 
        });
      }
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error.message
      });
    }
  });

  // Get session data
  app.get('/sessions/:sessionId', async (req, res) => {
    console.log('Getting session:', req.params.sessionId);
    try {
      const { sessionId } = req.params;
      
      const data = await apiCache.getSessionIdFromAPIService(sessionId);
      
      if (data) {
        res.json({ 
          success: true, 
          sessionId,
          data: JSON.parse(data)
        });
      } else {
        res.status(404).json({ 
          success: false, 
          message: 'Session not found' 
        });
      }
    } catch (error) {
      console.error('Error retrieving session:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error.message
      });
    }
  });

  // Delete session
  app.delete('/sessions/:sessionId', async (req, res) => {
    console.log('Deleting session:', req.params.sessionId);
    try {
      const { sessionId } = req.params;
      
      const result = await apiCache.deleteKey(`sessionId:${sessionId}`);
      
      if (result) {
        res.json({ 
          success: true, 
          message: 'Session deleted successfully' 
        });
      } else {
        res.status(404).json({ 
          success: false, 
          message: 'Session not found or could not be deleted' 
        });
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error.message
      });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  });

  // Start the server
  console.log('Starting server...');
  app.listen(port, () => {
    console.log(`Redis Cache Example API listening at http://localhost:${port}`);
  });
} catch (error) {
  console.error('FATAL ERROR in server startup:', error);
}