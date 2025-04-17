import { registerUserRequest, loginUserRequest } from "@/common/lib/EndPoint";
import { UserType } from "@/common/types/user";
import API from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type loginUserProps = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  "loginUser/Data",
  async (formData: loginUserProps) => {
    try {
      const response = await API.post(loginUserRequest, formData);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("error in login user");
      }
    }
  }
);
type registerUserProps = {
  email: string;
  password: string;
  avatar: File | null;
};

export const registerUser = createAsyncThunk(
  "registerUser/Data",
  async (formData: registerUserProps) => {
    try {
      const response = await API.post(registerUserRequest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) return;

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("error in register user");
      }
    }
  }
);

type initialStateProps = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  error: string | null;
};

const initialState: initialStateProps = {
  isAuthenticated: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    isAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "failled to Register user";
      })
      //login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // console.log("action", action.payload.data);
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("action at error", action);
        state.isLoading = false;
        state.user = null;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = action.error.message || "failled to login user";
      });
  },
});

export const { isAuthenticated, setUser } = authSlice.actions;

const authReduser = authSlice.reducer;

export default authReduser;
