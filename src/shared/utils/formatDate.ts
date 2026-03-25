export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    const mskDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    const hours = mskDate.getUTCHours().toString().padStart(2, '0');
    const minutes = mskDate.getUTCMinutes().toString().padStart(2, '0');

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    return `${day} ${months[month - 1]} ${hours}:${minutes}`;
}