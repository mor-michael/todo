import {createSlice} from '@reduxjs/toolkit'

export enum Page {
  Dashboard,
  Statistics,
  Settings,
  Notifications
}

const initialState = {
  page: Page.Dashboard,
  pivotDate: Date.now(),
  selectedDate: Date.now(),
  popupToggle: false,
  menuToggle: false
}

export const nav = createSlice({
  name: "nav",
  initialState,
  reducers: {
    switchPage: (state, action) => {
      state.page = action.payload.page
    },
    goBack: (state, action) => {
      state.pivotDate -= 1209600000
    },
    goForward: (state, action) => {
      state.pivotDate += 1209600000
    },
    changeSelectedDate: (state, action) => {
      state.selectedDate = action.payload.selectedDate
    },
    togglePopup: (state, action) => {
      state.popupToggle = !state.popupToggle
    },
    toggleMenu: (state, action) => {
      state.menuToggle = !state.menuToggle
    }
  }
})

export const {switchPage, goBack, goForward, changeSelectedDate, togglePopup, toggleMenu} = nav.actions
export default nav.reducer