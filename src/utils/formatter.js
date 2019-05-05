export const toDateShort = (dateInput) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput.toString());
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    return `${d < 10 ? `0${d}` : d}/${m < 10 ? `0${m}` : m}/${y < 10 ? `0${y}` : y}`;
}
