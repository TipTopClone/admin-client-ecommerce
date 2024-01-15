import { configureStore } from '@reduxjs/toolkit';
import adminUser from '../pages/profile/userSlice.js';

export default configureStore({
  reducer: {
    adminInfo: adminUser,
  },
});
