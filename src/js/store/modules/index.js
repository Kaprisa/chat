export default (name) => {
    const state = {
        [name.toLowerCase()]: [],
        [`loading${name}`]: false
    }

    
    const getters = {
        [name.toLowerCase()]: state => state[name.toLowerCase()],
        [`loading${name}`]: state => state[`loading${name}`]
    }
    
    const actions = {
        [`get${name}`]: ({ dispatch, commit }, id) => {
            commit(`setLoading${name}`, true)
            axios.get(`/api${name.replace(/([A-Z])/g, "/$1").toLowerCase()}${id ? `/${id}` : ''}`).then(res => {
                commit(`set${name}`, res.data)
                commit(`setLoading${name}`, false)
            }).catch(err => {
                commit(`setLoading${name}`, false)
            })
        },
    }
    
    const mutations = {
        [`set${name}`]: (state, items) => state[name.toLowerCase()] = items,
        [`setLoading${name}`]: (state, status) => state[`loading${name}`] = status,
    }

    return {
        state,
        getters,
        actions,
        mutations,
    }

}

