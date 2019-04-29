/**
 * Best Shop
 * 
 * index.js
 * 
 * Copyright 2019-present, AloesLu. All rights reserved.
 */

 // ===== MODULES ===============================================================
import express from 'express';

const router = express.Router();

// GET home page
router.get('/', (_, res) => {
  res.render('./mainpage', {
    demo: process.env.DEMO,
    listId: null,
  });
});

export default router;