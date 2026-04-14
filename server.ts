import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Login API
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Simple mock logic
    if (email === 'admin@beautisticglam.com' && password === 'admin123') {
      return res.json({
        id: 'admin-1',
        email: 'admin@beautisticglam.com',
        name: 'Admin User',
        role: 'admin'
      });
    }

    if (email === 'user@example.com' && password === 'user123') {
      return res.json({
        id: 'user-1',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user'
      });
    }

    // Generic user creation for demo
    if (password === 'password123') {
       return res.json({
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        email: email,
        name: email.split('@')[0],
        role: 'user'
      });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
