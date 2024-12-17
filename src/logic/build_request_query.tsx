// eslint-disable-next-line
function BuildRequestQuery(path: string, filters?: any) {
    let query = path;

    if (!filters) {
        return query;
    }

    query += '?';

    for (const key in filters) {
        if (query != path + '?') {
            query += '&';
        }

        query += `${key}=${filters[key]}`;
    }

    return query;
}

export default BuildRequestQuery;
