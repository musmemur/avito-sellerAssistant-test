function randomDate(daysBack = 45) {
    const now = Date.now();
    const past = now - daysBack * 24 * 60 * 60 * 1000;

    return new Date(past + Math.random() * (now - past));
}

function maybe(value, probability = 0.1) {
    return Math.random() < probability ? null : value;
}

const items = [
    {
        id: 1,
        category: 'electronics',
        title: 'iPhone 13 128GB',
        description: '',
        price: 650,
        params: { type: 'phone', brand: 'Apple', model: 'iPhone 13', condition: 'used', color: 'black' },
        createdAt: randomDate()
    },
    {
        id: 2,
        category: 'electronics',
        title: 'Samsung Galaxy S22',
        description: 'Отличное состояние, полный комплект',
        price: 550,
        params: { type: 'phone', brand: 'Samsung', model: 'S22', condition: 'used', color: 'white' },
        createdAt: randomDate()
    },
    {
        id: 3,
        category: 'electronics',
        title: 'MacBook Air M1',
        description: '',
        price: 900,
        params: { type: 'laptop', brand: 'Apple', model: 'Air M1', condition: 'used' },
        createdAt: randomDate()
    },
    {
        id: 4,
        category: 'electronics',
        title: 'Lenovo ThinkPad X1',
        description: 'Рабочий ноутбук, хорошее состояние',
        price: 700,
        params: { type: 'laptop', brand: 'Lenovo', model: 'X1', condition: 'used', color: 'black' },
        createdAt: randomDate()
    },

    {
        id: 5,
        category: 'auto',
        title: 'BMW X5 2018',
        description: '',
        price: 28000,
        params: { brand: 'BMW', model: 'X5', yearOfManufacture: 2018, transmission: 'automatic', mileage: 90000 },
        createdAt: randomDate()
    },
    {
        id: 6,
        category: 'auto',
        title: 'Toyota Camry 2016',
        description: 'Надежный автомобиль',
        price: 15000,
        params: { brand: 'Toyota', model: 'Camry', yearOfManufacture: 2016, transmission: 'automatic', mileage: 120000 },
        createdAt: randomDate()
    },
    {
        id: 7,
        category: 'auto',
        title: 'Audi A4 2019',
        description: '',
        price: 22000,
        params: { brand: 'Audi', model: 'A4', yearOfManufacture: 2019 },
        createdAt: randomDate()
    },
    {
        id: 8,
        category: 'auto',
        title: 'Lada Vesta 2020',
        description: 'Как новая',
        price: 9000,
        params: { brand: 'Lada', model: 'Vesta', yearOfManufacture: 2020, transmission: 'manual' },
        createdAt: randomDate()
    },

    {
        id: 9,
        category: 'real_estate',
        title: '1-к квартира, Москва',
        description: '',
        price: 70000,
        params: { type: 'flat', address: 'Москва', area: 35, floor: 5 },
        createdAt: randomDate()
    },
    {
        id: 10,
        category: 'real_estate',
        title: 'Дом в Подмосковье',
        description: 'Большой участок',
        price: 150000,
        params: { type: 'house', address: 'Московская область', area: 120 },
        createdAt: randomDate()
    },

    ...Array.from({ length: 40 }, (_, i) => {
        const id = i + 11;

        const categories = ['auto', 'electronics', 'real_estate'];
        const category = categories[id % 3];

        if (category === 'auto') {
            return {
                id,
                category,
                title: `Авто ${id}`,
                description: id % 2 === 0 ? '' : 'Хорошее состояние',
                price: 5000 + id * 700,
                params: {
                    brand: maybe(['BMW', 'Audi', 'Toyota'][id % 3]),
                    model: maybe(`Model ${id}`),
                    yearOfManufacture: maybe(2005 + (id % 15)),
                    transmission: maybe(id % 2 === 0 ? 'automatic' : 'manual'),
                    mileage: maybe(50000 + id * 3000),
                    enginePower: maybe(500)
                },
                createdAt: randomDate()
            };
        }

        if (category === 'electronics') {
            return {
                id,
                category,
                title: `Гаджет ${id}`,
                description: id % 2 === 0 ? '' : 'Отличное состояние',
                price: 100 + id * 20,
                params: {
                    type: maybe(id % 2 === 0 ? 'phone' : 'laptop'),
                    brand: maybe(['Apple', 'Samsung', 'Xiaomi'][id % 3]),
                    model: maybe(`Model ${id}`),
                    condition: maybe(id % 2 === 0 ? 'new' : 'used'),
                    color: maybe(['чёрный', 'белый', 'серый'][id % 3])
                },
                createdAt: randomDate()
            };
        }

        return {
            id,
            category,
            title: `Недвижимость ${id}`,
            description: id % 2 === 0 ? '' : 'Хороший вариант',
            price: 30000 + id * 5000,
            params: {
                type: maybe(['flat', 'house'][id % 2]),
                address: maybe(`Город ${id}`),
                area: maybe(30 + id),
                floor: maybe(id % 10)
            },
            createdAt: randomDate()
        };
    })
];

module.exports = { items };