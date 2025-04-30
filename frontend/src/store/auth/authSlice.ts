import {
  registerUserRequest,
  loginUserRequest,
  getUserRequest,
  logoutUserRequest,
  loginWithGoogleRequest,
} from "@/common/lib/EndPoint";
import {
  initialStateProps,
  loginUserProps,
  registerUserProps,
} from "@/common/types/authSlice";
import API from "@/config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "loginUser/Data",
  async (formData: loginUserProps, { rejectWithValue }) => {
    try {
      const response = await API.post(loginUserRequest, formData);

      // handle empty response
      if (!response.data.success) {
        return rejectWithValue("Invalid credentials");
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("error in Login user");
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser/Data",
  async (formData: registerUserProps, { rejectWithValue }) => {
    try {
      const response = await API.post(registerUserRequest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        return rejectWithValue("user already exists");
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("error in Register user");
      }
    }
  }
);

export const checkAuth = createAsyncThunk("checkAuth/data", async () => {
  try {
    const response = await API.get(getUserRequest, {
      headers: {
        "Cache-Control":
          "no-store , no-cache , must-revalidate , proxy-revalidate",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error((error as string) || "Error getting");
  }
});

export const logoutUser = createAsyncThunk("logoutUser/data", async () => {
  try {
    await API.get(logoutUserRequest);
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Authentication failed");
  }
});

interface AuthResult {
  code?: string;
}

export const loginWithGoogleUser = createAsyncThunk(
  "google/user",

  async (authResult: AuthResult) => {
    try {
      const response = await API.get(
        loginWithGoogleRequest(authResult.code as string)
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("failed to login with google");
      }
    }
  }
);

const initialState: initialStateProps = {
  isAuthenticated: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  error: null,
  publicAccessWithLimit: JSON.parse(
    localStorage.getItem("publicAccessWithLimit") || "0"
  ),
  activiePage: "shortner",
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
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setPublicAccessWithLimit: (state) => {
      state.publicAccessWithLimit = state.publicAccessWithLimit + 1;

      localStorage.setItem(
        "publicAccessWithLimit",
        JSON.stringify(state.publicAccessWithLimit)
      );
    },
    setActivePage: (state, action) => {
      state.activiePage = action.payload;
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
        localStorage.removeItem("publicAccessWithLimit");
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("action at error", action);
        state.isLoading = false;
        state.user = null;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = action.error.message || "failled to login user";
      })
      //check auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      //logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "failled to logout user";
      })
      .addCase(loginWithGoogleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // console.log("action", action.payload.data);
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.removeItem("publicAccessWithLimit");
      })
      .addCase(loginWithGoogleUser.rejected, (state, action) => {
        console.log("action at error", action);
        state.isLoading = false;
        state.user = null;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.error = action.error.message || "failled to login user";
      });
  },
});

export const {
  setAuthenticated,
  setUser,
  setPublicAccessWithLimit,
  setActivePage,
} = authSlice.actions;

const authReduser = authSlice.reducer;

export default authReduser;
