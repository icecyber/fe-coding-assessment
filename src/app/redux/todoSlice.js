import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API = '/api/todos';

// Fetch Todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API);
  return response.data;
});

// Add Todo
export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
  const response = await axios.post(API, { title });
  return response.data;
});

// Update Todo
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }) => {
    const response = await axios.put(API, { id, ...updates });
    return response.data;
  }
);

// Delete Todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(API, { data: { id } });
  return id;
});

// Todo Slice
const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
