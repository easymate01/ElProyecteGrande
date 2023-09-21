import Cookies from "js-cookie";
import AdminDashboard from "../../Components/AdminDashboard/AdminDashboard";

const AdminPage = () => {
  const role = Cookies.get("Role");

  return <div>{role === "Admin" ? <AdminDashboard /> : <> 404 error</>}</div>;
};

export default AdminPage;
