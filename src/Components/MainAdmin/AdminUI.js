import axios from "axios";
import ReactPaginate from "react-paginate";
import AdminTable from "../AdminTable/AdminTable";
import { config } from "../../App";
import "./AdminUI.css";
import SearchBar from "../UI/SearchBar";
import React, { useState, useEffect } from "react";

function AdminUI() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editedUserId, setEditedUserId] = useState(-1);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [pages, setPages] = useState(0);

  // >>>>>>>>>>>>>>>>>> pagination <<<<<<<<<<<<<<<<
  const userPerPage = 10;
  let pagesCount = pages * userPerPage;
  const totalPages = Math.ceil(data.length / userPerPage);

  const handleChange = ({ selected }) => {
    setPages(selected);
  };

  // >>>>>>>>>>>>>>>>> fetch_user_Data <<<<<<<<<<<<<<<<
  const fetchUserData = async () => {
    try {
      const res = await axios.get(config.endPoint);
      const resD = await res.data;
      setData(resD);
      return resD.data;
    } catch (e) {
      console.log(e);
      setData([]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // >>>>>>>>>>>>>>>>>>> Handle-Edit <<<<<<<<<<<<<<<<
  const handleEdit = (user) => {
    setEditedUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
  };

  // >>>>>>>>>>>>>>>>>>>> Handle_Update <<<<<<<<<<<<<<
  const handleUpdate = (user) => {
    let userId = data.findIndex((uId) => uId.id === user.id);
    let userE = [...data];
    userE[userId] = {
      id: userId,
      name: editName,
      email: editEmail,
      role: editRole
    };
    setData(userE);
    setEditedUserId(-1);
  };

  // >>>>>>>>>>>>>>>>>>>> Handle_Delete <<<<<<<<<<<<<<<<<
  const handleDelete = (user) => {
    setData(data.filter((userD) => userD.id !== user));
  };

  // >>>>>>>>>>>>>>>>>> Handle_Check <<<<<<<<<<<<<<<<<<<<
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let selUser = data.map((user, i) => {
        if (i >= pagesCount && i < pagesCount + userPerPage) {
          return { ...user, isChecked: checked };
        } else {
          return { ...user };
        }
      });
      setData(selUser);
    } else {
      let selUser = data.map((user) => {
        return user.name === name ? { ...user, isChecked: checked } : user;
      });
      setData(selUser);
    }
  };

  //  >>>>>>>>>>>>>>>>>>>> Handle_Del_Multiple <<<<<<<<<<<<<
  const handleDelMultiple = () => {
    let selectedUser = data.filter((user) => (!user.isChecked ? user : ""));
    setData(selectedUser);
  };

  // >>>>>>>>>>>>>>>>>>> HandleInput_fields <<<<<<<<<<<
  const handleInputName = (e) => {
    setEditName(e.target.value);
  };
  const handleInputEmail = (e) => {
    setEditEmail(e.target.value);
  };
  const handleInputRole = (e) => {
    setEditRole(e.target.value);
  };

  return (
    <div className="parent">
      {/* SearchBar component  */}
      <div>
        <SearchBar onChange={(e) => setSearchText(e.target.value)} />
      </div>

      <div>
        {/* Pass logic in AdminTable component */}
        <AdminTable
          data={data}
          handleCheck={handleCheck}
          searchText={searchText}
          editedUserId={editedUserId}
          handleUpdate={handleUpdate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          pagesCount={pagesCount}
          userPerPage={userPerPage}
          handleInputName={handleInputName}
          handleInputEmail={handleInputEmail}
          handleInputRole={handleInputRole}
          editName={editName}
          editEmail={editEmail}
          editRole={editRole}
        />
      </div>
      <div>
        {/* DeleteMultipal */}
        <button className="delMultiple" onClick={handleDelMultiple}>
          Delete selected
        </button>

        {/*  pagination  */}
        <ReactPaginate
          className="pagination"
          nextLabel={"Next"}
          previousLabel={"Prev"}
          pageCount={totalPages}
          onPageChange={handleChange}
        />
      </div>
    </div>
  );
}

export default AdminUI;
