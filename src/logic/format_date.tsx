function FormatDate(date: string) {
    const parsed = date.split('/');

    return parsed[2] + '/' + parsed[1] + '/' + parsed[0];
}

export default FormatDate;
