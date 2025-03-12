import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);


// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://your-frontend-url.onrender.com' // You'll update this later
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());


interface AuthenticatedRequest extends Request {
  user?: any;
}


const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
      return;
    }
    
    
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'healthy' });
});


app.get('/api/protected', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  console.log('Protected endpoint accessed by:', {
    email: user.email,
    timestamp: new Date().toISOString(),
    ip: req.ip
  });
  res.json({ message: 'hello' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});