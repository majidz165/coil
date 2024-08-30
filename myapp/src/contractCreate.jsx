import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";

const CreateContractWithCoilTubings = () => {
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

  // useEffect(() => {
  //   fetchAvailableCoilTubings();
  //   // fetchContractors();
  //   // fetchContractTypes();
  // }, []);

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

  const handleAddCoilTubing = () => {
    setCoilTubings([
      ...coilTubings,
      { coil_tubing: "", start_date: "", end_date: "" },
    ]);
  };

  const handleCoilTubingChange = (index, e) => {
    const updatedCoilTubings = [...coilTubings];
    updatedCoilTubings[index][e.target.name] = e.target.value;
    setCoilTubings(updatedCoilTubings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contractData = {
      ...contract,
      coil_tubings: coilTubings,
    };

    try {
      const response = await fetch("/api/contracts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (response.ok) {
        alert("Contract with coil tubings created successfully!");
        // Reset form or redirect
      } else {
        alert("Error creating contract");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              name="contract_name"
              value={contract.name || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
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
              type="date"
              id="start_date"
              name="start_date"
              value={contract.start_date || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="end_date">تاریخ پایان:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={contract.end_date || ""}
              onChange={handleContractChange}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none"
            type="submit"
          >
            ثبت
          </button>
        </form>
      </div>
    </div>
  );
};

render(<CreateContractWithCoilTubings />, document.getElementById("app"));
