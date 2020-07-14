const baseUrl = '/write'
export const add = (data, opts) => {
    const catalogtUuid = data.catalog_uuid
    delete data.catalogtUuid
    return {
        method: 'post',
        url: `${baseUrl}/doc/${catalogtUuid}`,
        data,
        opts
    }
}

export const detail = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/doc/${data.uuid}`,
        data: {},
        opts
    }
}

export const list = (data, opts) => {
    const catalogtUuid = data.catalog_uuid
    delete data.catalogtUuid
    return {
        method: 'get',
        url: `${baseUrl}/doc/list/${catalogtUuid}`,
        data,
        opts
    }
}

export const update = (data, opts) => {
    return {
        method: 'patch',
        url: `${baseUrl}/doc/${data.uuid}`,
        data,
        opts
    }
}

export const remove = (data, opts) => {
    return {
        method: 'delete',
        url: `${baseUrl}/doc/${data.uuid}`,
        data,
        opts
    }
}
