
import { createElement, render } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";

export default function Modal({ showModal, setShowModal, errors, children }) {
    const modal = useRef();
    const modalBody = useRef();
    function handleClick(event) {
        if (event.target == modal.current) {
            setShowModal(false);
        }
    }
    return (
        <>
            {" "}
            {showModal ? (
                <div dir="rtl"
                    className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-md"
                    ref={modal}
                    onClick={handleClick}
                >
                    <div
                        className="w-10/12 flex flex-col bg-white rounded-md modal-body justify-center items-center"
                        ref={modalBody}
                        style={{ minHeight: "50vh" }}
                    >
                        {errors && (
                            <h1 className="text-red-500 text-center py-3 mb-2 bg-white">
                                {errors}
                            </h1>
                        )}
                        {children}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}