import {
  uriDataRequest,
  uriShortPublicRequest,
  uriShortUserRequest,
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
export const getShortUrls = createAsyncThunk("uri/getShortUrl", async () => {
  try {
    const response = await API.get(uriDataRequest);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return;
    } else {
      throw new Error("Error fetching short URL data");
    }
  }
});

interface UriState {
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
  userUrls: ShortLink[];
}

const initialState: UriState = {
  shortUrl: "",
  isLoading: false,
  error: null,
  userUrls: [],
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
      });
  },
});

export const { clearData, setShortUrl } = uriSlice.actions;
const uriReduser = uriSlice.reducer;
export default uriReduser;
