export function dateToString(dateObject: Date) {
    let dateString = dateObject.toDateString();
    return dateString.substring(dateString.indexOf(" ") + 1);
}