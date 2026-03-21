const express = require('express');
const cors = require('cors');
const {items} = require("./items.ts");

const app = express();

app.use(cors());
app.use(express.json());

function checkNeedsRevision(item) {
    if (!item.description) return true;
    if (!item.params) return true;

    return Object.values(item.params).some(v => v === undefined);
}

app.get('/items', (req, res) => {
    console.log('🔥 REQUEST ПРИШЁЛ');
    console.log('QUERY:', req.query);

    let result = items.map(item => ({
        ...item,
        needsRevision: checkNeedsRevision(item)
    }));

    const {
        q,
        limit,
        skip,
        needsRevision,
        categories
    } = req.query;

    if (q) {
        result = result.filter(i =>
            i.title.toLowerCase().includes(q.toLowerCase())
        );
    }

    if (needsRevision === 'true') {
        result = result.filter(i => i.needsRevision === true);
    }

    console.log('BEFORE FILTER:', result.length);

    if (categories) {
        console.log('FILTERING BY:', categories);

        const categoryList = categories.split(',');

        result = result.filter(i =>
            categoryList.includes(i.category)
        );
    }

    console.log('AFTER FILTER:', result.length);

    const total = result.length;

    const start = parseInt(skip) || 0;
    const end = start + (parseInt(limit) || total);

    result = result.slice(start, end);

    res.json({ items: result, total });
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);

    if (!item) return res.status(404).send('Not found');

    res.json({
        items: [{
            ...item,
            needsRevision: checkNeedsRevision(item)
        }],
        total: 1
    });
});

app.put('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === req.params.id);

    if (index === -1) {
        return res.status(404).send('Not found');
    }

    items[index] = {
        ...items[index],
        ...req.body
    };

    res.json(items[index]);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});