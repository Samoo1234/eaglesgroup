import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const currentCompany = JSON.parse(localStorage.getItem('currentCompany'));

const initialState = {
  user: user || null,
  token: token || null,
  currentCompany: currentCompany || null,
  isAuthenticated: !!token,
  isLoading: false,
  error: null
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Get user data
        const userResponse = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });
        
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        
        return {
          token: response.data.token,
          user: userResponse.data
        };
      }
    } catch (error) {
      const message = 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Get user data
        const userResponse = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${response.data.token}`
          }
        });
        
        localStorage.setItem('user', JSON.stringify(userResponse.data));
        
        return {
          token: response.data.token,
          user: userResponse.data
        };
      }
    } catch (error) {
      const message = 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('currentCompany');
});

// Get current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }
      
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      const message = 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      
      // If token is invalid, logout
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('currentCompany');
      }
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }
      
      const response = await axios.put('/api/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      const message = 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }
      
      const response = await axios.put('/api/auth/change-password', passwordData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      const message = 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
      localStorage.setItem('currentCompany', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        
        // Set current company if user has companies
        if (action.payload.user.companies && action.payload.user.companies.length > 0) {
          state.currentCompany = action.payload.user.companies[0];
          localStorage.setItem('currentCompany', JSON.stringify(action.payload.user.companies[0]));
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.currentCompany = null;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        
        // Set current company if user has companies
        if (action.payload.user.companies && action.payload.user.companies.length > 0) {
          state.currentCompany = action.payload.user.companies[0];
          localStorage.setItem('currentCompany', JSON.stringify(action.payload.user.companies[0]));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.currentCompany = null;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.currentCompany = null;
      })
      
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        
        // Set current company if not already set and user has companies
        if (!state.currentCompany && action.payload.companies && action.payload.companies.length > 0) {
          state.currentCompany = action.payload.companies[0];
          localStorage.setItem('currentCompany', JSON.stringify(action.payload.companies[0]));
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.currentCompany = null;
      })
      
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { reset, setCurrentCompany } = authSlice.actions;
export default authSlice.reducer;
