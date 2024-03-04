import { useState } from "react";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import {
  clearFilter,
  filterBySearch,
  sortJobs,
} from "../redux/slices/JobSlice";
import { useDispatch } from "react-redux";

import { useDebounce } from "@uidotdev/usehooks";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const debouncedText = useDebounce(text, 500);

  console.log(debouncedText);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(filterBySearch({ text, name: "company" }));
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [text]);

  return (
    <section className="filter-sec">
      <h4>Filter Form</h4>
      <form>
        <div>
          <label>Search by Company Name</label>
          <input
            onChange={(e) =>
              dispatch(
                filterBySearch({ name: "company", text: e.target.value })
              )
            }
            type="text"
          />
        </div>

        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden value="Select"></option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden value="Select"></option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden value="Select"></option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilter())}
            type="reset"
            className="submit-btn"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
