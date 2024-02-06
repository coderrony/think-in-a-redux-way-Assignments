import Layout from "../components/Layout";
import JobActions from "./job_page/JobActions";
import JobBoard from "./job_page/JobBoard";

function Home() {
  return (
    <Layout>
      <JobActions />
      <JobBoard />
    </Layout>
  );
}

export default Home;
