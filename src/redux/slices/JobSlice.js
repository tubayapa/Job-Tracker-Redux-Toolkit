import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  mainJobs: [],
  isLoading: false,
  error: null,
};
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setJobs: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },

    deleteJob: (state, action) => {
      // find job will be deleted acoording its id
      const index = state.jobs.findIndex((i) => i.id === action.payload);

      // remove from splice
      state.jobs.splice(index, 1);
    },

    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();

      state.jobs = state.mainJobs.filter((i) =>
        i[action.payload.name].toLowerCase().includes(query)
      );
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs = state.jobs.sort((a, b) =>
            a.company.localCompare(b.company)
          );
          break;
        case "z-a":
          state.jobs.sort((a, b) => b.company.localCompare(a.company));
          break;
        case "Newest":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));

          break;
        case "Oldest":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    },

    clearFilter: (state, action) => {
      state.jobs = state.mainJobs;
    },
  },
});

export default jobSlice.reducer;

export const {
  setLoading,
  setError,
  setJobs,
  deleteJob,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilter,
} = jobSlice.actions;
