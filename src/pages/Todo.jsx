import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setTodo, fetchTodos, editTodo, deleteTodoAsync } from '../app/todoSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Todo() {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todo);
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = async () => {
        if (name.trim()) {
            const newTodo = { id: Date.now(), name: name.trim() };
            dispatch(setTodo(newTodo));
            try {
                await axios.post('http://localhost:5000/todo', newTodo);
                setName('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleEditTodo = (id, currentName) => {
        setIsEditing(true);
        setEditingTodoId(id);
        setName(currentName);
    };

    const handleSaveEdit = async () => {
        if (name.trim() && editingTodoId !== null) {
            dispatch(editTodo(editingTodoId, name.trim()));
            setIsEditing(false);
            setEditingTodoId(null);
            try {
                await axios.put(`http://localhost:5000/todo/${editingTodoId}`, { name: name.trim() });
                setName('');
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        }
    };

    const handleDeleteTodo = (id) => {
        console.log(`Deleting todo with ID: ${id}`);
        dispatch(deleteTodoAsync(id));
    };

    return (
        <div className="flex justify-center items-center w-full min-h-[90vh]">
            <div className="flex flex-col w-[600px] h-[700px] bg-red-50">
                <div className="w-full h-12 flex justify-evenly items-center">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2"
                    />
                    {isEditing ? (
                        <button
                            onClick={handleSaveEdit}
                            className="w-[40px] h-12 flex justify-center items-center bg-green-100"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={handleAddTodo}
                            className="w-[40px] h-12 flex justify-center items-center bg-amber-100"
                        >
                            Add
                        </button>
                    )}
                </div>
                <div className="w-full h-full">
                    {/* Render list of todos */}
                    <div>
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full h-[40px] flex items-center justify-between">
                                <div className="w-[75%]">{todo.name}</div>
                                <div className="w-[25%] bg-orange-50 flex justify-evenly">
                                    <EditIcon
                                        onClick={() => handleEditTodo(todo.id, todo.name)}
                                        className="cursor-pointer text-blue-500"
                                    />
                                    <DeleteForeverIcon
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className="cursor-pointer text-blue-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
