export const translateParameters = (parameter: string) => {
    switch (parameter) {
        case "description":
            return 'описание'
        case 'type':
            return 'тип'
        case 'brand':
            return 'бренд'
        case 'model':
            return 'модель'
        case 'condition':
            return 'состояние'
        case 'color':
            return 'цвет'
        case 'phone':
            return 'телефон'
        case 'new':
            return 'новый'
        case 'used':
            return 'б/у'
        case 'yearOfManufacture':
            return 'год выпуска'
        case 'transmission':
            return 'коробка'
        case 'mileage':
            return 'пробег'
        case 'address':
            return 'адрес'
        case 'flat':
            return 'квартира'
        case 'house':
            return 'дома'
        case 'room':
            return 'комната'
        case 'manual':
            return 'механика'
        case 'automatic':
            return 'автомат'
        case 'area':
            return 'площадь'
        case 'floor':
            return 'этаж'
        default:
            return parameter
    }
}