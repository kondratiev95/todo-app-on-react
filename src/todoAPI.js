import { BASE_URL, ENDPOINTS } from "./apiConstants";

const postParams = (data) => {
    return {
        method: 'POST',
        headers: {
            'Content-type': 'text/plain',
        },
        body: JSON.stringify(data)
    }
}

export const getData = async () => {
    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch(error) {
        console.log('get-data:', error);
    }
}

export const addData = async (data) => {
    try {
        const response = await fetch(`${BASE_URL }${ENDPOINTS.addData}`, postParams(data));
        return await response.json();
    } catch(error) {
        console.log('add-data:', error);
    }
} 

export const deleteItem = async (data) => {
    try {
        const response = await fetch(`${BASE_URL }${ENDPOINTS.removeItem}`, postParams(data));
        return await response.json();
    } catch(error) {
        console.log('delete-item:',error);
    }
}

export const toggleItem = async (data) => {
    try {
        const response = await fetch(`${BASE_URL }${ENDPOINTS.toggleItem}`, postParams(data));
        return await response.json();
    } catch(error) {
        console.log('toggle-item:', error)
    }
}

export const toggleAll = async (data) => {
    try {  
        const response = await fetch(`${BASE_URL }${ENDPOINTS.toggleAll}`, postParams(data));
        return await response.json();
    } catch(error) {
        console.log('toggle-all:', error)
    }
}

export const deleteCompleted = async () => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.deleteCompleted}`, postParams(null));
        return await response.json();
    } catch(error) {
        console.log('delete-completed:', error);
    }
}

export const changeTodo = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.editTodo}`, postParams(data));
        return await response.json();
    } catch(error) {
        console.log('edit-todo:', error);
    }
}