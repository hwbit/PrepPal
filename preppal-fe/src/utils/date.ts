export function dateToString(dateObject: Date) {
    const dateString = dateObject.toDateString();
    return dateString.substring(dateString.indexOf(" ") + 1);
}
