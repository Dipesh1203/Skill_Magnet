import axios from "axios";
import styles from "../../App.module.css";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner/Banner";
import Skill from "../Skill/Skill";
import Projects from "../Projects/Projects";
import Contact from "../../components/Contact/Contact";

const Profile = () => {
  let [data, setData] = useState([]);
  let { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    axios.get(`/api/profile/${userId}`).then((res) => setData(res.data));
  }, []);
  console.log(data);
  return (
    <div className={styles.App}>
      {/* <h1>{data}</h1> */}
      {data && (
        <>
          <Banner data={data} />
          <Skill data={data.skills} />
          <Projects projectId={data.projects} />
          <Contact contact={data} />
        </>
      )}
    </div>
  );
};

export default Profile;
