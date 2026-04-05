
export const parseResponse = (prompt : string) => {

    const millionMatch = prompt.match(/(\d+(?:\.\d+)?)\s*млн/);
    if (millionMatch) {
        return parseFloat(millionMatch[1]) * 1000000;
    }

    const thousandMatch = prompt.match(/(\d+(?:\.\d+)?)\s*тыс/);
    if (thousandMatch) {
        return parseFloat(thousandMatch[1]) * 1000;
    }

    const numberMatch = prompt.match(/(\d+(?:\s?\d+)*(?:\.\d+)?)/);
    if (numberMatch) {
        return parseFloat(numberMatch[1].replace(/\s/g, ''));
    }

    return -1;
}