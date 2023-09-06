import AdminUI from "../src/Components/MainAdmin/AdminUI";
import "./styles.css";

export const config = {
  endPoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
};

export default function App() {
  return (
    <div className="App">
      <AdminUI />
    </div>
  );
}
