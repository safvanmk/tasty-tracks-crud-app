import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action
export const createRecipe = createAsyncThunk("createRecipe", async (data, {rejectWithValue}) => {

  const response = await fetch("https://655feac783aba11d99cff893.mockapi.io/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    
  })

  try {
    const result = await response.json();
    return result;
    
  } catch (error) {
    return rejectWithValue(error)
  }
});

// read action
export const showRecipe = createAsyncThunk("showRecipe", async (args, {rejectWithValue}) => {

  const response = await fetch("https://655feac783aba11d99cff893.mockapi.io/recipes");

  try {
    const result = await response.json();
    console.log(result);
    return result;
    
  } catch (error) {
    return rejectWithValue(error)
  }
});

// delete action
export const deleteRecipe = createAsyncThunk("deleteRecipe", async (id, {rejectWithValue}) => {

  const response = await fetch(`https://655feac783aba11d99cff893.mockapi.io/recipes/${id}`,
  {method:"DELETE"}
  );

  try {
    const result = await response.json();
    console.log(result);
    return result;
    
  } catch (error) {
    return rejectWithValue(error)
  }
});

// update action
export const updateRecipe = createAsyncThunk("updateRecipe", async (data, {rejectWithValue}) => {

  console.log("updated data", data);

  const response = await fetch(`https://655feac783aba11d99cff893.mockapi.io/recipes/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    
  })

  try {
    const result = await response.json();
    return result;
    
  } catch (error) {
    return rejectWithValue(error)
  }
});

 export const reciepDetail = createSlice({
  name: "reciepDetail",
  initialState: {
    recipes: [],
    loading: false,
    error: null,
    searchData: []
  },
  reducers:{
    searchRecipe: (state, action) => {
      state.searchData = action.payload
    }
  },
  extraReducers: {
    [createRecipe.pending]: (state) => {
      state.loading = true;
    },
    [createRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes.push(action.payload)
    },
    [createRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message
    },

    [showRecipe.pending]: (state) => {
      state.loading = true;
    },
    [showRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    },
    [showRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },

    [deleteRecipe.pending]: (state) => {
      state.loading = true;
    },
    [deleteRecipe.fulfilled]: (state, action) => {
      state.loading = false;

      const {id} = action.payload
      if (id) {
        state.recipes = state.recipes.filter((item) => item.id !== id)
        alert(`Recipe deleted successfully`)
      }

      console.log("delete action", action.payload);
    },
    [deleteRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },

    [updateRecipe.pending]: (state) => {
      state.loading = true;
    },
    [updateRecipe.fulfilled]: (state, action) => {
      state.loading = false;
      state.recipes = state.recipes.map((item) => 
        item.id === action.payload.id ? action.payload : item
      );
    },
    [updateRecipe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message
    },

  },

})

export default reciepDetail.reducer
export const {searchRecipe} = reciepDetail.actions;