import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SnackBar from "./SnackBar";

const EditMapDocumentModal = ({
  fetchData,
  handleModalClose,
  title,
  category,
  id,
}) => {
  const [heading, setHeading] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [snackbar, setSnackbar] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };
  const snackbarClose = (status) => {
    setSnackbar({
      open: false,
      message: "",
    });
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("file", selectedFile);
      formData.append("id", id);
      formData.append("category", category);
      const apiUrl = "https://bfservices.trainright.fit/api/content/update";
      const response = await axios.put(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      // setSnackbar({
      //   open: true,
      //   message: edit ? "Edited Successfully." : "Saved Successfully.",
      //   status: 0,
      // });
      toast.success("Data edited successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error editing:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-rgba-black-50 backdrop-blur-5 flex justify-center items-center z-999">
      <div className="border border-gray-400 p-4 bg-white md:w-[400px] w-full">
        <div className="cursor-pointer flex justify-end w-full">
          <RxCross2
            onClick={handleModalClose}
            className="w-6 h-6 hover:bg-black hover:text-white rounded-full"
          />
        </div>
        <p className="font-bold text-xl text-center mb-6">{title}</p>{" "}
        <input
          type="text"
          onChange={handleHeadingChange}
          className="w-full m-1 px-1 border-b-2 border-black"
          placeholder="Enter heading..."
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full m-1 px-1 my-4"
        />
        <div className=" flex justify-center mt-6">
          <Button
            className={`ol_open_btn signin_btn`}
            onClick={handleEdit}
            variant="success"
          >
            Submit
          </Button>
        </div>
      </div>
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
      {/* <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      /> */}
    </div>
  );
};

export default EditMapDocumentModal;
