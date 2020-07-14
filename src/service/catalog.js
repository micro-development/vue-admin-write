const baseUrl = '/write'
export const add = (data, opts) => {
    const projectUuid = data.project_uuid
    delete data.projectUuid
    return {
        method: 'post',
        url: `${baseUrl}/catalog/${projectUuid}`,
        data,
        opts
    }
}

export const detail = (data, opts) => {
    return {
        method: 'get',
        url: `${baseUrl}/catalog/${data.uuid}`,
        data: {},
        opts
    }
}

export const list = (data, opts) => {
    const projectUuid = data.projectUuid
    delete data.projectUuid
    return {
        method: 'get',
        url: `${baseUrl}/catalog/list/${projectUuid}`,
        data,
        opts
    }
}

export const update = (data, opts) => {
    const projectUuid = data.project_uuid
    const uuid = data.uuid
    delete data.projectUuid
    return {
        method: 'patch',
        url: `${baseUrl}/catalog/${uuid}/${projectUuid}`,
        data,
        opts
    }
}

export const remove = (data, opts) => {
    const projectUuid = data.project_uuid
    const uuid = data.p_uuid
    // delete data.projectUuid
    // delete data.p_uuid
    return {
        method: 'delete',
        url: `${baseUrl}/catalog/${uuid}/${projectUuid}`,
        data,
        opts
    }
}
