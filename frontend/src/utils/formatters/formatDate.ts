export function formatDate(date: string | Date) {
    if (typeof date === "string") {
        date = new Date(date);
    }

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date value");
    }

    const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    });

    return DATE_FORMATTER.format(date);
}