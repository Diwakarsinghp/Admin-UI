import React from "react";
import UpdateBtn from "../UI/UpdateBtn";
import { AiFillEdit } from "react-icons/ai";
import DeleteButton from "../UI/DeleteButton";
import "./AdminTable.css";

const AdminTable = ({
  data,
  handleCheck,
  searchText,
  editedUserId,
  handleUpdate,
  handleDelete,
  pagesCount,
  handleEdit,
  userPerPage,
  handleInputName,
  handleInputEmail,
  handleInputRole,
  editName,
  editEmail,
  editRole
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkBox"
                name="selectAll"
                checked={data
                  .slice(pagesCount, pagesCount + userPerPage)
                  .every((user) => user?.isChecked)}
                onChange={handleCheck}
              />
            </th>
            {/* <th>id</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            //  >>>>>>>>>>>> for_user_search <<<<<<<<<<<<<<
            data
              .filter((val) => {
                if (searchText === "") {
                  return val;
                } else {
                  return (
                    val.name.includes(searchText) ||
                    val.email.includes(searchText) ||
                    val.role.includes(searchText)
                  );
                }
              })
              // >>>>>>>>>>>>>> For counting page <<<<<<<<<<<<<<
              .slice(pagesCount, pagesCount + userPerPage)

              //  >>>>>>>>>>>> edited_user <<<<<<<<<<<<<<
              .map((user, i) => {
                if (user.id === editedUserId) {
                  return (
                    <tr key={i}>
                      <td>
                        <input type="checkbox" className="checkBox" />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="inputName"
                          placeholder={user.name}
                          value={editName || ""}
                          onChange={handleInputName}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="inputEmail"
                          placeholder={user.email}
                          value={editEmail || ""}
                          onChange={handleInputEmail}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="inputRole"
                          placeholder={user.role}
                          value={editRole || ""}
                          onChange={handleInputRole}
                        />
                      </td>
                      <td>
                        <UpdateBtn onClick={() => handleUpdate(user)} />
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i} className={user.isChecked ? "selected" : ""}>
                      <td>
                        <input
                          type="checkbox"
                          className="checkBox"
                          name={user.name}
                          id={user.id}
                          onChange={handleCheck}
                          checked={user.isChecked || false}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => {
                            handleEdit(user)
                          }}
                        >
                          <AiFillEdit />
                        </button>
                        <DeleteButton onClick={() => handleDelete(user.id)} />
                      </td>
                    </tr>
                  );
                }
              })
          }
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
