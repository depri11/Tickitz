function response(res, status, result = '', meta = '') {
    let desc = ''

    switch (status) {
    case 200:
        desc = 'OK'
        break
    case 201:
        desc = 'Created'
        break
    case 202:
        desc = 'Accepted'
        break
    case 400:
        desc = 'Bad Request'
        break
    case 401:
        desc = 'Unauthorized'
        break
    case 403:
        desc = 'Forbidden'
        break
    case 404:
        desc = 'Not Found'
        break
    case 409:
        desc = 'Conflict'
        break
    case 500:
        desc = 'Internal Server Error'
        break
    case 502:
        desc = 'Bad Gateway'
        break
    case 503:
        desc = 'Service Unavailable'
        break
    case 504:
        desc = 'Gateway Timeout'
        break
    }

    const isObject = (data) => {
        return !!data && data.constructor === Object
    }

    const results = {
        status: status,
        description: desc,
        result: isObject(result) ? [result] : result,
    }

    if (meta) {
        results.meta = meta
    }

    res.status(status).json(results)
}

module.exports = response
