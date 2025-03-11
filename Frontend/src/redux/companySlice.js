import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
  },
  reducers: {
    setSingleCompamy: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    }
  }
});

export const { setSingleCompamy, setCompanies } = companySlice.actions;
export default companySlice.reducer;
