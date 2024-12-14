import React, { useState } from "react";
// import "./BannerToast.css"; // Import CSS for styling

const BannerToast = ({ message, type, onClose }) => {
    return (
        <div className={`banner-toast banner-toast-${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={onClose}>
                ✖
            </button>
        </div>
    );
};

export default BannerToast;
