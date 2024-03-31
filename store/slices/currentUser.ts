import { User } from "@/gql/graphql";
import { createSlice } from "@reduxjs/toolkit";
type currentUserState = User;
const initialState: currentUserState = {
  email: "string",
  firstName: "",
  id: "",
  lastName: undefined,
  posts: undefined,
  profileImageURL: undefined,
  userName: undefined,
};
export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => (state= action.payload),
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
