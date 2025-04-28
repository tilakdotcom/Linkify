import {
  uriDataRequest,
  uriDeleteRequest,
  uriShortPublicRequest,
  uriShortUserRequest,
  uriUpdateRequest,
  uriUpdateStatusRequest,
  uriUserRedirectRequest,
} from "@/common/lib/EndPoint";
import { ShortLink } from "@/common/types/user";
import API from "@/config/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// new short create
export const shortenUrl = createAsyncThunk(
  "uri/shortenUrl",
  async (longUrl: string, thunkAPI) => {
    try {
      const response = await API.post(uriShortPublicRequest, { longUrl });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error shortening URL");
      }
    }
  }
);
// new short create for user
export const shortenUrlForUser = createAsyncThunk(
  "uri/shortenUrlForUser",
  async (longUrl: string, thunkAPI) => {
    try {
      const response = await API.post(uriShortUserRequest, { longUrl });
      return response.data?.data?.shortLink;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error shortening URL");
      }
    }
  }
);

// get short url data
export const getShortUrls = createAsyncThunk(
  "uri/getShortUrls",
  async (page: string, thunkAPI) => {
    try {
      console.log("url bhai", uriDataRequest(page));
      const response = await API.get(uriDataRequest(page));
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("error in getting urls");
      }
    }
  }
);

// get short url data for user
export const getShortUrl = createAsyncThunk(
  "uri/getShortUrl",
  async (url: string, thunkAPI) => {
    try {
      const response = await API.get(uriUserRedirectRequest(url));
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error fetching short URL data");
      }
    }
  }
);

// delete short by id
export const deleteShortUrl = createAsyncThunk(
  "uri/deleteShortUrl",
  async (uri: string, thunkAPI) => {
    try {
      const response = await API.delete(uriDeleteRequest(uri));
      return response.data.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error deleting short URL");
      }
    }
  }
);

// update short by id
export const updateShortUrl = createAsyncThunk(
  "uri/updateShortUrl",
  async (data: { uri: string; longUrl: string }, thunkAPI) => {
    try {
      const response = await API.put(uriUpdateRequest(data.uri), {
        longLink: data.longUrl,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error updating short URL");
      }
    }
  }
);

//update short status by short
export const updateShortStatus = createAsyncThunk(
  "uri/updateShortStatus",
  async (data: { uri: string; status: boolean }, thunkAPI) => {
    try {
      const response = await API.post(uriUpdateStatusRequest(data.uri), {
        isActive: data.status,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("Error updating short URL");
      }
    }
  }
);

interface UriState {
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
  userUrls: ShortLink[];
  currentPage: number;
}

const initialState: UriState = {
  shortUrl: "",
  isLoading: false,
  error: null,
  userUrls: [],
  currentPage: 1,
};

const uriSlice = createSlice({
  name: "uri",
  initialState,
  reducers: {
    setShortUrl(state, action: PayloadAction<string>) {
      state.shortUrl = action.payload;
    },
    clearData(state) {
      state.shortUrl = "";
      state.error = null;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getShortUrls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShortUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userUrls = action.payload.data.shortLink;
      })
      .addCase(getShortUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(shortenUrlForUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(shortenUrlForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(shortenUrlForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getShortUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getShortUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shortUrl = action.payload;
      })
      .addCase(getShortUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteShortUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteShortUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userUrls = state.userUrls.filter(
          (url) => url.id !== action.payload.id
        );
      })
      .addCase(deleteShortUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateShortUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateShortUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUrl = action.payload.data.shortLink;
        const index = state.userUrls.findIndex(
          (url) => url.id === updatedUrl.id
        );
        if (index !== -1) {
          state.userUrls[index] = updatedUrl;
        }
      })
      .addCase(updateShortUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateShortStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateShortStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUrl = action.payload.data;
        const index = state.userUrls.findIndex(
          (url) => url.shortLink === updatedUrl.shortLink
        );
        if (index !== -1) {
          state.userUrls[index] = updatedUrl;
        }
      })
      .addCase(updateShortStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData, setShortUrl, setCurrentPage } = uriSlice.actions;
const uriReduser = uriSlice.reducer;
export default uriReduser;
