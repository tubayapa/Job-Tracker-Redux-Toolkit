import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = ({ getJobs }) => {
  // subscribe the store
  const jobState = useSelector((store) => store.jobReducer);

  return (
    <div className="list-page">
      <Filter />
      {
        // if loading is continue then show loader
        // if loading finish  and  there ise error show error
        // if loading finish and there is no error show cards
      }

      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
