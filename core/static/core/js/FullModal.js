import { u } from "./jsxRuntime.module.js";
import { A, k } from "./Modal.js";
function FullModal({ showModal, setShowModal, errors, children }) {
  const modal = A();
  const modalBody = A();
  function handleClick(event) {
    if (event.target == modal.current) {
      setShowModal(false);
    }
  }
  return /* @__PURE__ */ u(k, { children: [
    " ",
    showModal ? /* @__PURE__ */ u(
      "div",
      {
        dir: "rtl",
        className: "fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-md",
        ref: modal,
        onClick: handleClick,
        children: /* @__PURE__ */ u(
          "div",
          {
            className: "w-11/12 flex flex-col bg-white rounded-md modal-body justify-center items-center",
            ref: modalBody,
            style: { minHeight: "50vh" },
            children: [
              errors && /* @__PURE__ */ u("h1", { className: "text-red-500 text-center py-3 mb-2 bg-white", children: errors }),
              children
            ]
          }
        )
      }
    ) : /* @__PURE__ */ u(k, {})
  ] });
}
export {
  FullModal as F
};
