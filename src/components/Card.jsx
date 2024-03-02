import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/JobSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const colors = {
    Approved: "darkgreen",
    Pending: "orange",
    Declined: "red",
    Cancelled: "darkred",
  };

  const handleDelete = (event) => {
    if (confirm("Are you sure you want to delete?")) {
      // get api request
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        // in this way it will be deleted just from store but it will continue appear ui

        // if it succeeded delete from store
        .then(() => {
          dispatch(deleteJob(job.id));
          toast.success("Job deleted", { autoClose: 500 });
        })

        .catch((err) => toast.error("We are sorry, something went wrong"));
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>

        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>

        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>

        <div className="field">
          <MdOutlineDateRange />
          <p>{job.date}</p>
        </div>

        <div className="status">
          <p style={{ background: colors[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
