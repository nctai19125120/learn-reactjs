import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userData: undefined,
  },
  reducers: {
    GoogleLogin: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export default loginSlice;
// const initState = {
//   userData: [],
// };

// const loginReducer = (state = initState, action) => {
//   switch (action.type) {
//     case "GoogleLogin":
//       return {
//         ...state,
//         userData: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default loginReducer;
