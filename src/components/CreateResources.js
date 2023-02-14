import Header from "./Header";
import CreateUser from "./CreateUser";
import CreateBook from "./CreateBook";
import "./CreateResources.style.css";

const CreateResources = () => {
  return (
    <div>
      <Header />
      <div className="resources">
        <CreateUser />
        <CreateBook />
      </div>
    </div>
  );
};

export default CreateResources;
