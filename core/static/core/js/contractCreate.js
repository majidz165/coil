import { u } from "./jsxRuntime.module.js";
import { A, k, B, h, y } from "./Modal.js";
import { j as jalaaliJs } from "./index.js";
function Modal({ showModal, setShowModal, errors, children }) {
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
            className: "w-10/12 flex flex-col bg-white rounded-md modal-body justify-center items-center",
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
const CreateContractWithCoilTubings = () => {
  const [showModal, setShowModal] = h(false);
  const [errors, setErrors] = h(false);
  const [contract, setContract] = h({
    name: "",
    contractor: "",
    contract_type: "",
    start_date: "",
    end_date: "",
    total_value: "",
    total_value_euro: ""
  });
  const [coilTubings, setCoilTubings] = h([]);
  const [availableCoilTubings, setAvailableCoilTubings] = h([]);
  const [contractors, setContractors] = h([]);
  const [contractTypes, setContractTypes] = h([]);
  const [selectedCoil, setSelectedCoil] = h(null);
  const [coils, setCoils] = h([]);
  const [modalContent, setModalContent] = h(null);
  y(() => {
    fetchAvailableCoilTubings();
    fetchContractors();
    fetchContractTypes();
  }, []);
  const fetchAvailableCoilTubings = async () => {
    const response = await fetch("/api/coil-tubings/");
    const data = await response.json();
    setAvailableCoilTubings(data);
  };
  const fetchContractors = async () => {
    const response = await fetch("/api/contractors/");
    const data = await response.json();
    setContractors(data);
  };
  const fetchContractTypes = async () => {
    const response = await fetch("/api/contract-types/");
    const data = await response.json();
    setContractTypes(data);
  };
  const handleContractChange = (e) => {
    setContract({ ...contract, [e.target.name]: e.target.value });
  };
  const handleContractChangeDates = (e) => {
    const [y2, m, d] = e.target.value.split("/");
    const gregorianDate = jalaaliJs.toGregorian(parseInt(y2), parseInt(m), parseInt(d));
    const date = `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`;
    setContract({ ...contract, [e.target.name]: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contractData = {
      ...contract,
      coil_tubings: coilTubings
    };
    let csrf = getCookie("csrftoken");
    try {
      const response = await fetch("/api/create/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf
        },
        body: JSON.stringify(contractData)
      });
      if (response.ok) {
        response.json().then((data) => {
          window.location.href = data.url;
        });
      } else {
        alert("Error creating contract");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function showJalali(date) {
    if (date) {
      console.log(date);
      const [y2, m, d] = date.split("-");
      const j = jalaaliJs.toJalaali(parseInt(y2), parseInt(m), parseInt(d));
      return `${j.jy}/${j.jm}/${j.jd}`;
    }
    return "";
  }
  function handleSelectCoil(e) {
    const coilId = parseInt(e.target.value);
    const coil = availableCoilTubings.find((coil2) => coil2.id === coilId);
    setCoilTubings([
      ...coilTubings,
      { coil_tubing: coilId }
    ]);
    setShowModal(false);
    setCoils([...coils, coil]);
  }
  function handleAddCoil() {
    const modalBody = /* @__PURE__ */ u(k, { children: /* @__PURE__ */ u("div", { children: [
      /* @__PURE__ */ u("label", { htmlFor: "coil", children: "انتخاب کویل:" }),
      /* @__PURE__ */ u(
        "select",
        {
          id: "coil",
          name: "coil",
          value: selectedCoil || "",
          onChange: handleSelectCoil,
          required: true,
          className: "w-full px-3 py-2 border rounded-lg",
          children: [
            /* @__PURE__ */ u("option", { value: "", children: "یک کویل انتخاب کنید" }),
            availableCoilTubings.map((coil) => /* @__PURE__ */ u("option", { value: coil.id, children: coil.name }, coil.id))
          ]
        }
      )
    ] }) });
    setModalContent(modalBody);
    setShowModal(true);
  }
  const handleDeleteCoil = (index) => {
    const updatedCoils = coils.filter((_, i) => _.id !== index);
    const updatedCoilTubings = coilTubings.filter((_, i) => _.coil_tubing !== index);
    setCoils(updatedCoils);
    setCoilTubings(updatedCoilTubings);
  };
  return /* @__PURE__ */ u("div", { className: "flex flex-col items-center justify-center", children: /* @__PURE__ */ u(
    "div",
    {
      className: "bg-white flex rounded-md flex-col p-3 items-center justify-center w-full md:w-3/4",
      dir: "rtl",
      children: [
        /* @__PURE__ */ u("h1", { className: "text-2xl text-center", children: "ایجاد قرارداد" }),
        /* @__PURE__ */ u(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex w-full flex-col space-y-2",
            children: [
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "contract_name", children: "عنوان قرارداد:" }),
                /* @__PURE__ */ u(
                  "input",
                  {
                    type: "text",
                    id: "contract_name",
                    name: "name",
                    value: contract.name || "",
                    onChange: handleContractChange,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg"
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "contractor", children: "پیمانکار:" }),
                /* @__PURE__ */ u(
                  "select",
                  {
                    id: "contractor",
                    name: "contractor",
                    value: contract.contractor || "",
                    onChange: handleContractChange,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg",
                    children: [
                      /* @__PURE__ */ u("option", { value: "", children: "یک پیمانکار انتخاب کنید" }),
                      contractors.map((contractor) => /* @__PURE__ */ u("option", { value: contractor.id, children: contractor.company_name }, contractor.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "contract_type", children: "نوع قرارداد:" }),
                /* @__PURE__ */ u(
                  "select",
                  {
                    id: "contract_type",
                    name: "contract_type",
                    value: contract.contract_type || "",
                    onChange: handleContractChange,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg",
                    children: [
                      /* @__PURE__ */ u("option", { value: "", children: "یک نوع قرارداد انتخاب کنید" }),
                      contractTypes.map((type) => /* @__PURE__ */ u("option", { value: type.id, children: type.name }, type.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "start_date", children: "تاریخ شروع:" }),
                /* @__PURE__ */ u(
                  "input",
                  {
                    id: "start_date",
                    name: "start_date",
                    value: showJalali(contract.start_date) || "",
                    onChange: handleContractChangeDates,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg",
                    "data-jdp": true
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "end_date", children: "تاریخ پایان:" }),
                /* @__PURE__ */ u(
                  "input",
                  {
                    id: "end_date",
                    name: "end_date",
                    value: showJalali(contract.end_date) || "",
                    onChange: handleContractChangeDates,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg",
                    "data-jdp": true
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "total_value", children: "ارزش کل:" }),
                /* @__PURE__ */ u(
                  "input",
                  {
                    id: "total_value",
                    name: "total_value",
                    type: "number",
                    value: contract.total_value || "",
                    onChange: handleContractChange,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg"
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { children: [
                /* @__PURE__ */ u("label", { htmlFor: "total_value_euro", children: "ارزش کل (یورو):" }),
                /* @__PURE__ */ u(
                  "input",
                  {
                    id: "total_value_euro",
                    name: "total_value_euro",
                    type: "number",
                    value: contract.total_value_euro || "",
                    onChange: handleContractChange,
                    required: true,
                    className: "w-full px-3 py-2 border rounded-lg"
                  }
                )
              ] }),
              /* @__PURE__ */ u(Modal, { showModal, setShowModal, errors, children: modalContent }),
              /* @__PURE__ */ u("div", { className: "mt-4", children: [
                /* @__PURE__ */ u("h3", { className: "text-lg font-semibold mb-2", children: "دستگاه‌های انتخاب شده:" }),
                coils && coils.length > 0 ? /* @__PURE__ */ u("ul", { className: "space-y-2", children: coils.map((coil, index) => /* @__PURE__ */ u("li", { className: "flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm", children: [
                  /* @__PURE__ */ u("span", { className: "text-gray-800 font-medium", children: coil.name }),
                  /* @__PURE__ */ u(
                    "button",
                    {
                      onClick: () => handleDeleteCoil(coil.id),
                      className: "text-red-500 hover:text-red-700 focus:outline-none",
                      children: /* @__PURE__ */ u("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ u("path", { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" }) })
                    }
                  )
                ] }, index)) }) : /* @__PURE__ */ u(k, {})
              ] }),
              /* @__PURE__ */ u(
                "button",
                {
                  type: "button",
                  onClick: handleAddCoil,
                  className: "inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 focus:outline-none",
                  children: "اضافه کردن دستگاه به قرارداد"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  className: "inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none",
                  type: "submit",
                  children: "ثبت"
                }
              )
            ]
          }
        )
      ]
    }
  ) });
};
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
B(/* @__PURE__ */ u(CreateContractWithCoilTubings, {}), document.getElementById("app"));
