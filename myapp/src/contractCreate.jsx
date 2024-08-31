import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import Modal from "./Modal.jsx";
import { toGregorian, toJalaali } from "jalaali-js";
const CreateContractWithCoilTubings = () => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [contract, setContract] = useState({
    name: "",
    contractor: "",
    contract_type: "",
    start_date: "",
    end_date: "",
    total_value: "",
    total_value_euro: "",
  });
  const [coilTubings, setCoilTubings] = useState([]);
  const [availableCoilTubings, setAvailableCoilTubings] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);
  const [selectedCoil, setSelectedCoil] = useState(null);
  const [coils, setCoils] = useState([]);

  const [modalContent, setModalContent] = useState(null);


  useEffect(() => {
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
    // const date = moment.from(e.target.value, 'fa', 'YYYY/MM/DD')
    setContract({ ...contract, [e.target.name]: e.target.value });
  };
  const handleContractChangeDates = (e) => {
    // const date = moment.from(e.target.value, 'fa', 'YYYY/MM/DD')
    const [y, m, d] = e.target.value.split("/")
    const gregorianDate = toGregorian(parseInt(y), parseInt(m), parseInt(d));
    // const date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
    const date = `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`;

    setContract({ ...contract, [e.target.name]: date });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const contractData = {
      ...contract,
      coil_tubings: coilTubings,
    };
    let csrf = getCookie("csrftoken");
    try {
      const response = await fetch("/api/create/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf,
        },
        body: JSON.stringify(contractData),
      });

      if (response.ok) {
        response.json().then(data => {
          window.location.href = data.url
        })
        // console.log();
        // Redirect to contracts list

        // window.location.href = response.url;

        // Reset form or redirect
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
      const [y, m, d] = date.split("-")
      const j = toJalaali(parseInt(y), parseInt(m), parseInt(d));
      return `${j.jy}/${j.jm}/${j.jd}`;
    }
    return ""
  }

  function handleSelectCoil(e) {
    const coilId = parseInt(e.target.value);
    const coil = availableCoilTubings.find((coil) => coil.id === coilId);
    setCoilTubings([
      ...coilTubings,
      { coil_tubing: coilId },
    ]);
    setShowModal(false)
    setCoils([...coils, coil])
  }

  function handleAddCoil() {
    const modalBody = (
      <>
        <div>
          <label htmlFor="coil">انتخاب کویل:</label>
          <select
            id="coil"
            name="coil"
            value={selectedCoil || ""}
            onChange={handleSelectCoil}
            required
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">یک کویل انتخاب کنید</option>
            {availableCoilTubings.map((coil) => (
              <option key={coil.id} value={coil.id}>
                {coil.name}
              </option>
            ))}
          </select>
        </div>


      </>
    )
    setModalContent(modalBody)
    setShowModal(true)
  }
  const handleDeleteCoil = (index) => {
    const updatedCoils = coils.filter((_, i) => _.id !== index);
    const updatedCoilTubings = coilTubings.filter((_, i) => _.coil_tubing !== index);
    setCoils(updatedCoils);
    setCoilTubings(updatedCoilTubings);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="bg-white flex rounded-md flex-col p-3 items-center justify-center w-full md:w-3/4"
        dir="rtl"
      >
        <h1 className="text-2xl text-center">ایجاد قرارداد</h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col space-y-2"
        >
          <div>
            <label htmlFor="contract_name">عنوان قرارداد:</label>
            <input
              type="text"
              id="contract_name"
              name="name"
              value={contract.name || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="contractor">پیمانکار:</label>
            <select
              id="contractor"
              name="contractor"
              value={contract.contractor || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">یک پیمانکار انتخاب کنید</option>
              {contractors.map((contractor) => (
                <option key={contractor.id} value={contractor.id}>
                  {contractor.company_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contract_type">نوع قرارداد:</label>
            <select
              id="contract_type"
              name="contract_type"
              value={contract.contract_type || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">یک نوع قرارداد انتخاب کنید</option>
              {contractTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start_date">تاریخ شروع:</label>
            <input
              id="start_date"
              name="start_date"
              value={showJalali(contract.start_date) || ""}
              onChange={handleContractChangeDates}
              required
              className="w-full px-3 py-2 border rounded-lg"
              data-jdp
            />
          </div>
          <div>
            <label htmlFor="end_date">تاریخ پایان:</label>
            <input
              id="end_date"
              name="end_date"
              value={showJalali(contract.end_date) || ""}
              onChange={handleContractChangeDates}
              required
              className="w-full px-3 py-2 border rounded-lg"
              data-jdp
            />
          </div>

          <div>
            <label htmlFor="total_value">ارزش کل:</label>
            <input
              id="total_value"
              name="total_value"
              type="number"
              value={contract.total_value || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="total_value_euro">ارزش کل (یورو):</label>
            <input
              id="total_value_euro"
              name="total_value_euro"
              type="number"
              value={contract.total_value_euro || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <Modal showModal={showModal} setShowModal={setShowModal} errors={errors} >
            {modalContent}
          </Modal>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">دستگاه‌های انتخاب شده:</h3>
            {coils && coils.length > 0 ? (
              <ul className="space-y-2">
                {coils.map((coil, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm">
                    <span className="text-gray-800 font-medium">{coil.name}</span>
                    <button

                      onClick={() => handleDeleteCoil(coil.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddCoil}
            className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 focus:outline-none"
          >
            اضافه کردن دستگاه به قرارداد
          </button>
          <button
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none"
            type="submit"
          >
            ثبت
          </button>
        </form>
      </div>
    </div >
  );
};
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
render(<CreateContractWithCoilTubings />, document.getElementById("app"));
