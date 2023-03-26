import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faRotateLeft, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/user/ActionButtons.module.css"

export default function ActionButtons({ editMode, onToggleEditMode, onEdit, onDelete, id }) {
  return (
    <div className={Styles.actionButtons}>
      {editMode ? (
        <>
          <button onClick={onToggleEditMode}>
            <FontAwesomeIcon style={{fontSize:"20px"}} icon={faRotateLeft} />
          </button>
          <button onClick={() => onEdit(id)}>
            <FontAwesomeIcon style={{fontSize:"20px"}} icon={faFloppyDisk} />
          </button>
        </>
      ) : (
        <>
          <button onClick={onToggleEditMode}>
            <FontAwesomeIcon style={{fontSize:"20px"}} icon={faPenToSquare} />
          </button>
          <button onClick={() => onDelete(id)}>
            <FontAwesomeIcon style={{fontSize:"20px", color:"red"}} icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
}
