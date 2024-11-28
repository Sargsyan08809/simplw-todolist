import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [],  // Initially an empty array for todos
    },
    reducers: {
        setTodo: (state, action) => {
            state.todo.push(action.payload); // Add new todo
        },
        setTodos: (state, action) => {
            state.todo = action.payload; // Update the entire todo list
        },
        updateTodo: (state, action) => {
            const { id, name } = action.payload;
            const todoIndex = state.todo.findIndex(todo => todo.id === id);
            if (todoIndex !== -1) {
                state.todo[todoIndex].name = name; // Update the todo's name
            }
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(todo => todo.id !== action.payload);
        }
    },
});

export const { setTodo, setTodos, updateTodo, deleteTodo } = todoSlice.actions;

export const fetchTodos = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/todo'); // Fetch todos from db.json
        dispatch(setTodos(response.data)); // Dispatch the fetched todos to Redux store
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
};

export const editTodo = (id, name) => async (dispatch) => {
    try {
        // Send updated todo to the JSON server
        await axios.put(`http://localhost:5000/todo/${id}`, { name });

        // Dispatch to Redux to update the state
        dispatch(updateTodo({ id, name }));
    } catch (error) {
        console.error('Error updating todo:', error);
    }
};
export const deleteTodoAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/todo/${id}`); // DELETE request to json-server
        dispatch(deleteTodo(id)); // Dispatch the action to remove the todo from Redux
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};
export default todoSlice.reducer;
