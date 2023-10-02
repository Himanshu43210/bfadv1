import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-overlays";
import HomeCard from "./../customComponents/HomeCard";
const ReusablePopup = ({
  onHide,
  children,
  onSave,
  onEdit,
  onYes,
  onNo,
  onApprove,
  onRemove,
  onCancel,
  onClose,
  onHomePreview,
  onDetailPreview,
  onSearchResultPreview,
  className,
}) => {
  return (
    <Modal
      show={true}
      onHide={onHide}
      className={"custom-modal" + " " + className}
    >
      <div id="check" className="modal-content">
        <div className="modal-header">
          <Button className="close-button" variant="none" onClick={onHide}>
            <AiOutlineClose size={20} />
          </Button>
        </div>
        <div className="modal-body">
          <div className="modal_data">
            {children}
          </div>
          <div className="modal_controls">
            {onEdit && (
              <Button variant="primary" onClick={onEdit} className="modal_btn edit_btn">
                Edit
              </Button>
            )}
            {onSave && (
              <Button variant="primary" onClick={onSave} className="modal_btn save_btn">
                Save
              </Button>
            )}
            {onYes && (
              <Button variant="secondary" onClick={onYes} className="modal_btn yes_btn">
                Yes
              </Button>
            )}
            {onCancel && (
              <Button variant="secondary" onClick={onCancel} className="modal_btn cancel_btn">
                Cancel
              </Button>
            )}
            {onClose && (
              <Button variant="secondary" onClick={onClose} className="modal_btn close_btn">
                Close
              </Button>
            )}
            {onApprove && (
              <Button variant="secondary" onClick={onApprove} className="modal_btn approve_btn">
                Approve
              </Button>
            )}
            {onRemove && (
              <Button variant="secondary" onClick={onRemove} className="modal_btn reject_btn">
                Reject
              </Button>
            )}
            {onNo && (
              <Button variant="secondary" onClick={onNo} className="modal_btn no_btn">
                No
              </Button>
            )}
            {onHomePreview && (
              <Button variant="secondary" onClick={onHomePreview} className="modal_btn home_preview_btn">
                Home
              </Button>
            )}
            {onDetailPreview && (
              <Button variant="secondary" onClick={onDetailPreview} className="modal_btn preview_btn">
                Card Details
              </Button>
            )}
            {onSearchResultPreview && (
              <Button variant="secondary" onClick={onSearchResultPreview} className="modal_btn search_btn">
                Search
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReusablePopup;
