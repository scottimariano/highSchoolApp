import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/user/CreateButtons.module.css"

export default function CreateButtons({ handleReset, handleCreate }) {
  return (
    <div className={Styles.createButtons}>
        <button onClick={() => handleReset()}>
            <FontAwesomeIcon style={{fontSize:"20px"}} icon={faRotateLeft} />
        </button>
        <button onClick={() => handleCreate()}>
            <FontAwesomeIcon style={{fontSize:"20px"}} icon={faFloppyDisk} />
        </button>
    </div>
  );
}
