import { Button } from "react-bootstrap";
import { MdCancel } from "react-icons/md";

const AddMapDocumentModal = ({
  handleHeadingChange,
  handleModalClose,
  handleUpload,
  handleFileChange,
  title,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-rgba-black-50 backdrop-blur-5 flex justify-center items-center z-999">
      <div className="border border-gray-400 p-4 bg-white md:w-[400px] w-full">
        <div className="cursor-pointer flex justify-end w-full">
          <MdCancel onClick={handleModalClose} className="w-6 h-6" />
        </div>
        <p className="font-bold text-xl text-center mt-4 mb-6">{title}</p>{" "}
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
            onClick={handleUpload}
            variant="success"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMapDocumentModal;
