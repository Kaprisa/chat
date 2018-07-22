export const wrap = async (f, ...args) => {
    try {
        const { data } = await f(...args)
        return [{
            visible: true,
            text: data && data.message ? data.message : 'Успех!',
            error: false
        }, data]
    } catch ({ response }) {
        return [{
            visible: true,
            text: response.data ? response.data : 'Ошибка сервера',
            error: true
        }]
    }
}
