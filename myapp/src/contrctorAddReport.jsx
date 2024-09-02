import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { toGregorian, toJalaali } from "jalaali-js";
import FullModal from "./FullModal.jsx";
import Activity from "./Activity.jsx";
import ClockPicker from "./clockPicker.jsx";
function Device({
  device,
  subcontractors,
  handleSubcontractorChange,
  handleSelectedChange,
}) {
  return (
    <div
      className="grid grid-cols-12 border border-gray-950 border-collapse bg-white"
      key={device.id}
    >
      <div
        className={`col-span-4 justify-center text-xs ${
          device.selected == "1" ? "border-l-4 border-l-green-500" : ""
        }`}
      >
        {device.name}
      </div>
      <div className="col-span-4 px-2 my-auto">
        <select
          className="w-full bg-white"
          value={device.selected}
          onChange={(e) => handleSelectedChange(device.id, e.target.value)}
        >
          <option value="0">No</option>
          <option value="1">yes</option>
        </select>
      </div>
      <div className="col-span-4 my-auto">
        <select
          className="w-full bg-white"
          value={device.subcontractor}
          onChange={(e) => handleSubcontractorChange(device.id, e.target.value)}
        >
          <option value="">---</option>
          {subcontractors.map((subcontractor) => (
            <option value={subcontractor.id}>{subcontractor.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

const AddReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  const [data, setData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [devices, setDevices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [subcontractors, setSubcontractors] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    fetchDevices();
    fetchJobs();
    fetchCategories();
    fetchSubcontractors();
  }, []);

  const handleSubcontractorChange = (deviceId, subcontractorId) => {
    setDeviceUsage((prevDeviceUsage) =>
      prevDeviceUsage.map((device) =>
        device.id === deviceId
          ? { ...device, subcontractor: subcontractorId }
          : device
      )
    );
  };
  const handleSelectedChange = (deviceId, selected) => {
    setDeviceUsage((prevDeviceUsage) =>
      prevDeviceUsage.map((device) =>
        device.id === deviceId
          ? { ...device, selected: parseInt(selected) }
          : device
      )
    );
  };

  const fetchDevices = async () => {
    const url = document.getElementById("devices").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    const deviceUsageArray = [];
    for (const device of fetchedData) {
      deviceUsageArray.push({
        id: device.id,
        name: device.name,
        selected: 0,
        subcontractor: null,
      });
    }
    setDeviceUsage(deviceUsageArray);
    setDevices(fetchedData);
  };
  const fetchSubcontractors = async () => {
    const url = document.getElementById("subcontractors").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    setSubcontractors(fetchedData);
  };
  const fetchJobs = async () => {
    const url = document.getElementById("jobs").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    setJobs(fetchedData);
  };
  const fetchCategories = async () => {
    const url = document.getElementById("categories").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    setCategories(fetchedData);
  };

  function handleSubmit() {
    const errors = [];
    deviceUsage.forEach((device) => {
      if (device.selected === 1 && !device.subcontractor) {
        errors.push(device.name);
      }
    });

    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      // You might want to set these errors in state and display them to the user
      setModalContent(
        <div>
          <h2 className={"text-red-800 text-4xl"}>
            Please correct these errors before submiting again
          </h2>
          <ul>
            {errors.map((error, index) => (
              <li className={"text-red-800 text-xl"} key={index}>
                Device <strong>{error}</strong> is selected but has no
                subcontractor assigned.
              </li>
            ))}
          </ul>
        </div>
      );
      setShowModal(true);
      return;
    }

    // If no errors, proceed with submission
  }

  const handleAddActivity = () => {
    setModalContent(
      <div className="grid gap-4">
        <form onSubmit={handleActivitySubmit} className="space-y-4">
          <div>
            <label
              htmlFor="start_time"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <ClockPicker />
          </div>
          <div>
            <label
              htmlFor="end_time"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="text"
              id="end_time"
              name="end_time"
              aria-label="Time"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Activity
          </button>
        </form>
      </div>
    );

    setShowModal(true);
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newActivity = {
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value,
    };
    setActivities([...activities, newActivity]);
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-12 gap-1">
      <FullModal
        showModal={showModal}
        setShowModal={setShowModal}
        errors={null}
      >
        {modalContent}
      </FullModal>
      <div className="col-span-12 md:col-span-8 border border-gray-800 bg-white grid grid-cols-12">
        {activities.length > 0 && (
          <>
            <div className="col-span-12 grid">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Start Time</div>
              <div className="col-span-2">End Time</div>
            </div>

            {activities.map((activity, index) => (
              <Activity activity={activity} index={index} />
            ))}
          </>
        )}
        <button
          className={"px-3 py-2 rounded-md bg-slate-600 text-white"}
          onClick={handleAddActivity}
        >
          Add Activity
        </button>
        <button
          className={`px-3 py-2 rounded-md bg-cyan-400`}
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
      <div className="col-span-12 gap-0 md:col-span-4 border border-gray-800 bg-white">
        <div className="grid grid-cols-12 bg-slate-300 text-center border border-gray-950 border-collapse">
          <div className="col-span-4 grid items-center">Device Name</div>
          <div className="col-span-4 grid items-center">Availibility</div>
          <div className="col-span-4 grid items-center">Provider</div>
        </div>
        {deviceUsage.map((device) => (
          <Device
            device={device}
            subcontractors={subcontractors}
            handleSubcontractorChange={handleSubcontractorChange}
            handleSelectedChange={handleSelectedChange}
          />
        ))}
      </div>
    </div>
  );
};
render(<AddReport />, document.getElementById("app"));
