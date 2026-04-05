const month = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];

export const dateConverter = (date: string) => {
    const newDate = new Date(date);
    return newDate.getDate().toString().padStart(2, '0') + ' '
    + month[newDate.getMonth()]
    + ' '
    + newDate.getFullYear()
    + ' ' +
    newDate.getHours().toString().padStart(2, '0') + ':' +
    newDate.getMinutes().toString().padStart(2, '0');
}