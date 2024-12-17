import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownCleaner from './index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize MarkdownCleaner
const markdownCleaner = new MarkdownCleaner(process.env.OPENAI_API_KEY);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/clean-markdown', async (req, res) => {
  try {
    const { markdownContent } = req.body;

    // Validate input
    if (!markdownContent || typeof markdownContent !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid markdown content' 
      });
    }

    // Clean the markdown
    const cleanedMarkdown = await markdownCleaner.cleanMarkdown(markdownContent);

    res.json({ 
      success: true, 
      cleanedMarkdown: cleanedMarkdown 
    });
  } catch (error) {
    console.error('Markdown cleaning error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
