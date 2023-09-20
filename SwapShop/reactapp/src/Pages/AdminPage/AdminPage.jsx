import Cookies from "js-cookie";

const AdminPage = () => {
  const role = Cookies.get("Role");

  return <div>{role === "Admin" ? <div>Admin</div> : <> 404 error</>}</div>;
};

export default AdminPage;
