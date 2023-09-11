import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { Modal } from "react-overlays";
const ReusablePopup = ({
  onHide,
  children,
  onSave,
  onYes,
  onNo,
  onCancel,
  onClose,
  onHomePreview,
  onDetailPreview,
  onSearchResultPreview,
}) => {
  return (
    <Modal show={true} onHide={onHide} className="custom-modal">
      <div className="modal-content">
        <div className="modal-header">
          <Button className="close-button" variant="none" onClick={onHide}>
            <AiOutlineClose size={20} />
          </Button>
        </div>
        <div className="modal-body">
          {children}
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          )}
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onClose && (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
          {onYes && (
            <Button variant="secondary" onClick={onYes}>
              Yes
            </Button>
          )}
          {onNo && (
            <Button variant="secondary" onClick={onNo}>
              No
            </Button>
          )}
          {onHomePreview && (
            <Button variant="secondary" onClick={onHomePreview}>
              Home
            </Button>
          )}
          {onDetailPreview && (
            <Button variant="secondary" onClick={onDetailPreview}>
              Detail
            </Button>
          )}
          {onSearchResultPreview && (
            <Button variant="secondary" onClick={onSearchResultPreview}>
              searchResult
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReusablePopup;
