import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images et vidéos sont autorisées!'), false);
    }
  }
});

// ✅ SOLUTION TEMPORAIRE : Stockage en mémoire (supprimez cette partie quand MongoDB sera installé)
let articles = [];
let nextId = 1;

// Routes temporaires sans MongoDB
app.get('/api/articles', (req, res) => {
  console.log('📨 GET /api/articles - Articles:', articles.length);
  res.json(articles);
});

app.post('/api/articles', upload.single('media'), (req, res) => {
  try {
    console.log('📨 POST /api/articles - Body:', req.body);
    console.log('📁 File:', req.file);

    const { titre, contenu, auteur } = req.body;

    if (!titre || !contenu) {
      return res.status(400).json({
        message: 'Le titre et le contenu sont requis'
      });
    }

    const newArticle = {
      _id: nextId.toString(),
      titre: titre.trim(),
      contenu,
      auteur: auteur || 'Administrateur',
      media: req.file ? `/uploads/${req.file.filename}` : null,
      typeMedia: req.file ? (req.file.mimetype.startsWith('image/') ? 'image' : 'video') : null,
      dateCreation: new Date(),
      dateModification: new Date()
    };

    articles.unshift(newArticle); // Ajouter au début
    nextId++;

    console.log('✅ Article créé:', newArticle);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({
      message: 'Erreur serveur',
      error: error.message
    });
  }
});

app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(a => a._id === req.params.id);
  if (!article) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }
  res.json(article);
});

app.put('/api/articles/:id', upload.single('media'), (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const index = articles.findIndex(a => a._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    articles[index] = {
      ...articles[index],
      titre: titre || articles[index].titre,
      contenu: contenu || articles[index].contenu,
      media: req.file ? `/uploads/${req.file.filename}` : articles[index].media,
      typeMedia: req.file ? (req.file.mimetype.startsWith('image/') ? 'image' : 'video') : articles[index].typeMedia,
      dateModification: new Date()
    };

    res.json(articles[index]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }

  articles.splice(index, 1);
  res.json({ message: 'Article supprimé avec succès' });
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API fonctionne!',
    timestamp: new Date().toISOString(),
    articlesCount: articles.length
  });
});

// Démarrer le serveur SANS MongoDB
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(`📊 Mode: Stockage en mémoire (temporaire)`);
  console.log(`🔗 API Test: http://localhost:${PORT}/api/test`);
  console.log(`📝 API Articles: http://localhost:${PORT}/api/articles`);
  console.log(`💡 Pour MongoDB: docker run -d -p 27017:27017 --name mongodb mongo:latest`);
});
