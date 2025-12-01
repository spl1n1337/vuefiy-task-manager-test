import { useFetch } from '#app'

export const useTasks = () => {
    const baseURL = useRuntimeConfig().public.apiBase + '/tasks'

      const getTasks = async (params = {}) => {
        try {
            const data = await $fetch(baseURL, {
                method: 'GET',
                params,
            });
            return data;
        } catch (error) {
            console.error('Error fetching tasks:', error)
            throw error;
        }
    }

    const createTask = async (payload) => {
        const { data, error } = await useFetch(baseURL, {
            method: 'POST',
            body: payload
        })
        if (error.value) throw error.value
        return data.value
    }

    const updateTask = async (id, payload) => {
        const { data, error } = await useFetch(`${baseURL}/${id}`, {
            method: 'PUT',
            body: payload
        })
        if (error.value) throw error.value
        return data.value
    }

    const deleteTask = async (id) => {
        const { data, error } = await useFetch(`${baseURL}/${id}`, {
            method: 'DELETE'
        })
        if (error.value) throw error.value
        return data.value
    }

    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask
    }
}
