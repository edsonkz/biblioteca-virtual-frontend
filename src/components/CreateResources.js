import Header from "./Header";
import CreateUser from "./CreateUser";
import CreateBook from "./CreateBook";

const CreateResources = () => {
  return (
    <div>
      <Header />
      <div>
        <CreateUser />
        <CreateBook />
      </div>
    </div>
  );
};

export default CreateResources;
