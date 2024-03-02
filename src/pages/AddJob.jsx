import axios from "axios";
import { statusOptions, typeOptions } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/JobSlice";

const AddJob = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // get inputs data formdata
    const formData = new FormData(e.target);

    // create object with form datas
    const newJobData = Object.fromEntries(formData);

    // add to date and id  to newJobData
    newJobData.id = uuidv4();
    newJobData.date = new Date().toLocaleDateString();

    // add data to api

    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("Job added", { autoClose: 500 });

        // add to  store

        dispatch(createJob(newJobData));

        // navigate to mainpage
        navigate("/");
      })

      .catch((err) =>
        toast.error("We are sorry, something went wrong", { autoClose: 500 })
      );

    // console.log(newJobData);
  };

  // remove same name job from array while searching
  const removeDuplicates = (key) => {
    // only "positon names"
    const arr = jobState?.jobs.map((job) => job[key]);

    // remove from array same name job keep only one

    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    return filtred;
  };

  // console.log(removeDuplicates("position"));

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input list="positions_list" type="text" required name="position" />

            <datalist id="positions_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Company</label>
            <input type="text" required name="company" list="company_list" />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Location</label>
            <input type="text" required name="location" list="location_list" />

            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Status</label>
            <select key={status.id} type="text" required name="status">
              <option value={""} hidden>
                Select
              </option>
              {statusOptions?.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select type="text" required name="type">
              <option value={""} hidden>
                Select
              </option>
              {typeOptions?.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
