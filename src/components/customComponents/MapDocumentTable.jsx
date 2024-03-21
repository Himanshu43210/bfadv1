import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { IoDocument } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import EditMapDocumentModal from "./EditMapDocumentModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
      .then(
        () => fetchData(),
        toast.error("Data deleted!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
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
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                      <div className="bg-white border border-gray-500 rounded-xl">
                        <div className="cursor-pointer flex justify-end w-full p-2">
                          <RxCross2
                            onClick={handleDocumentClose}
                            className="w-6 h-6 hover:bg-black hover:text-white rounded-full"
                          />
                        </div>
                        <img
                          src={selectedFile}
                          alt="Modal Image"
                          className="md:w-[600px] py-10 px-4"
                        />
                      </div>
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
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </table>
  );
};

export default MapDocumentTable;
