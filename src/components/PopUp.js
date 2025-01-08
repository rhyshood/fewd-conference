import React, {useState} from "react";

const PopUp = ({ isOpen, onClose, children }) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    if (!isOpen) return null;

    const handleMouseDown = (event) => {
        if (event.target.className === "popup-main-container") {
         setIsMouseDown(true);
        }
    };
    
    const handleMouseUp = (event) => {
        if (isMouseDown) {
          onClose(); 
        }
        setIsMouseDown(false); 
    };

    return (
        <div
            class="popup-main-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 994,
            }}
        >
            <div
                class="popup-container"
                onClick={(event) => event.stopPropagation()}
                style={{
                    position: "fixed",
                    top: 188,
                    background: "white",
                    margin: "auto",
                    padding: "1%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black"
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PopUp;