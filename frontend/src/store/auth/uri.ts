import { uriShortPublicRequest } from "@/common/lib/EndPoint";
import API from "@/config/axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

interface UriState {
  longUrl: string;
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UriState = {
  longUrl: "",
  shortUrl: "",
  isLoading: false,
  error: null,
};

const uriSlice = createSlice({
  name: "uri",
  initialState,
  reducers: {
    setLongUrl(state, action: PayloadAction<string>) {
      state.longUrl = action.payload;
    },
    clearData(state) {
      state.longUrl = "";
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
      });
  },
});

export const { setLongUrl, clearData } = uriSlice.actions;
const uriReduser = uriSlice.reducer;
export default uriReduser;
