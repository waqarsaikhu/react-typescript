import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";



export interface Users {
  id: number;
  name: string;
  number: string;
}

interface UserState {
  loading: any,
  users: any;
    error: any,
}

const initialState: UserState = {
   loading: false,
  users: [],
    error: "",
 
};
// const initialState = {
 
//   user: null, // Update from an array to a single object
 
// };

// Modified fetchUser async thunk to accept userId
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId: any) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData; // Return the user data directly as a single object
    } else {
      return null; // Return null if the document doesn't exist
    }
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.users = null;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
