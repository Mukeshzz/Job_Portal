
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const navigate = useNavigate();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span>Latest & Top</span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs?.length <= 0 ? (
          <span>No Jobs available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => (
              <LatestJobCards
                onClick={() => navigate(`/description/${job._id}`)}
                key={job._id}
                job={job}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
