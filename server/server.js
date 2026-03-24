const express = require('express');
const cors = require('cors');
const {items} = require("./items");

const app = express();

app.use(cors());
app.use(express.json());

function checkNeedsRevision(item) {
    if (!item.description) return true;
    if (!item.params) return true;

    return Object.values(item.params).some(v => v === undefined);
}

app.get('/items', (req, res) => {
    console.log(req.query)
    let result = items.map(item => ({
        ...item,
        needsRevision: checkNeedsRevision(item)
    }));

    const {
        q,
        limit,
        skip,
        needsRevision,
        categories,
        sort
    } = req.query;

    if (q) {
        result = result.filter(i =>
            i.title.toLowerCase().includes(q.toLowerCase())
        );
    }

    if (needsRevision === 'true') {
        result = result.filter(i => i.needsRevision === true);
    }

    if (categories) {
        const categoryList = categories.split(',');

        result = result.filter(i =>
            categoryList.includes(i.category)
        );
    }

    if (sort) {
        switch (sort) {
            case 'titleFromStart':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case 'titleFromEnd':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case 'newStart':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;

            case 'oldStart':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;

            case 'cheapStart':
                result.sort((a, b) => a.price - b.price);
                break;

            case 'expensiveStart':
                result.sort((a, b) => b.price - a.price);
                break;
        }
    }

    const total = result.length;

    const start = parseInt(skip) || 0;
    const end = start + (parseInt(limit) || total);

    result = result.slice(start, end);

    res.json({ items: result, total });
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));

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
    const index = items.findIndex(i => i.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send('Not found');
    }

    items[index] = {
        ...items[index],
        ...req.body
    };

    res.json(items[index]);
});

app.post('/llm/improve-description', async (req, res) => {
    const { title, category, params, description } = req.body;

    const prompt = `
Ты помогаешь писать объявления.

Дано:
Название: ${title}
Категория: ${category}
Характеристики: ${JSON.stringify(params)}
Описание: ${description || 'нет'}

Сделай улучшенное, продающее описание (до 1000 символов) на русском языке.
`;

    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            prompt,
            stream: false
        })
    });

    const data = await response.json();
    console.log(data)

    res.json({ text: data.response });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});