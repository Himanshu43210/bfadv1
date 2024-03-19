import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoDocument } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCancel, MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import EditMapDocumentModal from "./EditMapDocumentModal";

function ViewMapDocumentModal({ onClose, imageUrl }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <img
        src={imageUrl}
        alt="Modal Image"
        className="rounded-xl md:w-[600px] p-4"
      />
    </div>
  );
}

const MapDocumentTable = ({
  data,
  handleDocumentOpen,
  handleDocumentClose,
  documentOpen,
  category,
  fetchData,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [selectedID, setSeletedID] = useState("");
  const [selectedFile, setSeletedFile] = useState("");

  const handleEditModalOpen = (id) => {
    setEditModal(true);
    setSeletedID(id);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
  };
  const handleDelete = (id) => {
    axios
      .delete(
        "https://bfservices.trainright.fit/api/content/deleteById?id=" + id
      )
      .then(() => fetchData())
      .catch((err) => console.log(err, "Can't delete data!"));
  };

  function formatDate(inputDate) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  return (
    <table className="mt-[20px] w-[100%] mb-[40px]">
      <thead>
        <tr>
          <th className="border border-b-[#ddd] p-[8px] bg-[#004E55] text-white">
            Category
          </th>
          <th className="border border-gray-300 p-2 text-left bg-[#004E55] text-white">
            Heading
          </th>
          <th className="border border-gray-300 p-2 text-left bg-[#004E55] text-white">
            Document
          </th>
          <th className="border border-gray-300 p-2 text-left bg-[#004E55] text-white">
            Created At
          </th>
          <th className="border border-gray-300 p-2 text-left bg-[#004E55] text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map(
          (item) =>
            item.category === category && (
              <tr key={item._id} style={{ backgroundColor: "white" }}>
                <td className="border border-gray-300 p-2 text-left">
                  {item.category}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.heading}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {item.category === "map" ? (
                    <FaLocationDot
                      onClick={() => {
                        handleDocumentOpen();
                        setSeletedFile(item.file);
                      }}
                      className="w-[20px] h-[20px] text-teal-900 cursor-pointer"
                    />
                  ) : (
                    <IoDocument
                      onClick={() => {
                        handleDocumentOpen();
                        setSeletedFile(item.file);
                      }}
                      className="w-[20px] h-[20px] text-teal-900 cursor-pointer"
                    />
                  )}

                  {documentOpen === true && (
                    <div
                      onClick={handleDocumentClose}
                      className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                    >
                      <img
                        src={selectedFile}
                        alt="Modal Image"
                        className="rounded-xl md:w-[600px] p-4"
                      />
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  {formatDate(item.createdAt)}
                </td>
                <td className="border border-gray-300 p-2 text-left">
                  <div className="flex items-center gap-4">
                    <Button
                      className="row_action_btn edit_btn ListingEditbtn"
                      onClick={() => handleEditModalOpen(item?._id)}
                      variant="success"
                    >
                      <MdEdit size={20} />
                    </Button>
                    {editModal === true && (
                      <EditMapDocumentModal
                        handleModalClose={handleEditModalClose}
                        title={`Edit ${category}`}
                        category={category}
                        id={selectedID}
                        fetchData={fetchData}
                      />
                    )}
                    <Button
                      className="row_action_btn delete_btn ListingDeletebtn"
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaRegTrashAlt size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default MapDocumentTable;