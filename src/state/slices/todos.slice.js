import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getTodos} from "../../api/todos.api";

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const response = await fetch('http://localhost:7000/api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (response.ok) {
			const todo = await response.json();
			return { todo };
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/api/todos/${payload._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async(payload) => {
      const response = await fetch(`http://localhost:7000/api/todos/${payload._id}`, {
        method: "DELETE",
    });
    if (response.ok) {
      return {id: payload.id};
    }
  }
);

const todos_slice = createSlice({
  name: "todos",
  initialState: {
    todo: [],
    is_loading: false,
    error_msg: "",
  },
  reducers: {
    // not async reducers
    // addTodo: (state, action) => {
    //   const newTodo = {
    //     _id: Date.now(), // uniq
    //     title: action.payload.title,
    //     completed: false
    //   };
    //   state.todo.push(newTodo);
    // },
    // toogleComplete: (state,action) => {
    //   const index = state.todo.findIndex(item => item._id === action.payload._id);
    //   state.todo[index].completed = action.payload.completed;
    // },
    // deleteTodo: (state, action)=> {
    //   const index = state.todo.findIndex(item => item._id === action.payload._id);
    //   state.todo.splice(index,1);
    // },

    // --------------- fetch getTodos -------------------
    fetch_started: (state) => {
      state.is_loading = true;
    },
    fetch_failed: (state, action) => {
      state.error_msg = action.payload;
      state.is_loading = false;
    },
    data_ready(state, action) {
      state.todo = action.payload;
      state.is_loading = false;
      state.error_msg = "";
    },
  },
  extraReducers: {
    // --------------- other Async -----------------------
    [addTodoAsync.fulfilled]: (state, action) => {
      state.todo.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled] : (state, action) => {
      console.log(action.payload);
      const index = state.todo.findIndex(item => item._id === action.payload.todo._id);
      console.log(index);
      state.todo[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const index = state.todo.findIndex(item => item._id === action.payload._id);
      console.log(index);
      state.todo.splice(index,1);
    }
  }
});

export default todos_slice.reducer;
export const {addTodo, toogleComplete, deleteTodo} = todos_slice.actions;

// -------------- API getTodos ---------------
const { fetch_started, fetch_failed, data_ready } = todos_slice.actions;
export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch(fetch_started());
    const data = await getTodos();
    if (!data) throw new Error("Quote data came back with no results");
    dispatch(data_ready(data));
  } catch (err) {
    dispatch(fetch_failed("The quotes data is unavailable at the moment"));
  }
};




