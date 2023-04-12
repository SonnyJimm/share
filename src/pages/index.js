import MainTaskPage from "./mainTaskPage";

const PageHandler = ({ currentPage }) => {
  switch (currentPage) {
    case 0:
      return <MainTaskPage />;
    default:
      return <div>Error on handling page</div>;
  }
};
export default PageHandler;
