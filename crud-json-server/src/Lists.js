import React from "react";

const Lists = ({ alldata, onDelete, onEdit }) => {
  return (
    <div className="lists">
      <h3>Items List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th> {/* Add a column for actions */}
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(index)} // Trigger onEdit when clicked
                  className="btn btn-warning btn-sm"
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(index)} // Trigger onDelete when clicked
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
