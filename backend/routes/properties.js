const express = require('express');
const router = express.Router();
const pool = require('../db/pool');


router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const city = req.query.city;
    const zipcode = req.query.zipcode;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const beds = parseInt(req.query.beds);
    const baths = parseFloat(req.query.baths);

    if (limit < 1 || limit > 100) {
      return res.status(400).json({ error: 'limit must be between 1 and 100' });
    }
    if (offset < 0) {
      return res.status(400).json({ error: 'offset must be 0 or greater' });
    }
    if (minPrice && minPrice < 0) {
      return res.status(400).json({ error: 'minPrice must be a positive number' });
    }
    if (maxPrice && maxPrice < 0) {
      return res.status(400).json({ error: 'maxPrice must be a positive number' });
    }
    if (beds && beds < 0) {
      return res.status(400).json({ error: 'beds must be a positive number' });
    }
    if (baths && baths < 0) {
      return res.status(400).json({ error: 'baths must be a positive number' });
    }

    const whereConditions = [];
    const values = [];

    if (city && city.trim()) {
      whereConditions.push('LOWER(TRIM(L_City)) = LOWER(TRIM(?))');
      values.push(city);
    }

    if (zipcode && zipcode.trim()) {
      whereConditions.push('L_Zip = ?');
      values.push(zipcode);
    }

    if (minPrice) {
      whereConditions.push('L_SystemPrice >= ?');
      values.push(minPrice);
    }

    if (maxPrice) {
      whereConditions.push('L_SystemPrice <= ?');
      values.push(maxPrice);
    }

    if (beds) {
      whereConditions.push('L_Keyword2 >= ?');
      values.push(beds);
    }

    if (baths) {
      whereConditions.push('LM_Dec_3 >= ?');
      values.push(baths);
    }

    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

    const countQuery = `SELECT COUNT(*) as total FROM rets_property ${whereClause}`;
    const [countResult] = await pool.query(countQuery, values);
    const total = countResult[0].total;

    const dataQuery = `SELECT * FROM rets_property ${whereClause} LIMIT ? OFFSET ?`;
    const [results] = await pool.query(dataQuery, [...values, limit, offset]);

    res.json({
      total: total,
      limit: limit,
      offset: offset,
      results: results
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id/openhouses', async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!listingId || listingId.length > 50) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const checkQuery = 'SELECT COUNT(*) as count FROM rets_property WHERE L_ListingID = ?';
    const [checkResult] = await pool.query(checkQuery, [listingId]);

    if (checkResult[0].count === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const query = 'SELECT * FROM rets_openhouse WHERE L_ListingID = ? ORDER BY OpenHouseDate ASC, OH_StartTime ASC';
    const [results] = await pool.query(query, [listingId]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching open houses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const listingId = req.params.id;

    if (!listingId || listingId.length > 50) {
      return res.status(400).json({ error: 'Invalid listing ID' });
    }

    const query = 'SELECT * FROM rets_property WHERE L_ListingID = ?';
    const [results] = await pool.query(query, [listingId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching property detail:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

