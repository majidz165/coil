import { u } from "./jsxRuntime.module.js";
import { B, h, y } from "./Modal.js";
import { F as FullModal } from "./FullModal.js";
function Device({ device, subcontractors, handleSubcontractorChange, handleSelectedChange }) {
  return /* @__PURE__ */ u("div", { className: "flex flex-row w-full bg-slate-100 border border-slate-300 px-2", children: [
    /* @__PURE__ */ u("div", { className: "w-1/3", children: device.name }),
    /* @__PURE__ */ u("div", { className: "w-1/3 px-2", children: /* @__PURE__ */ u("select", { className: "w-full bg-white", value: device.selected, onChange: (e) => handleSelectedChange(device.id, e.target.value), children: [
      /* @__PURE__ */ u("option", { value: "0", children: "No" }),
      /* @__PURE__ */ u("option", { value: "1", children: "yes" })
    ] }) }),
    /* @__PURE__ */ u("div", { className: "w-1/3", children: /* @__PURE__ */ u("select", { className: "w-full bg-white", value: device.subcontractor, onChange: (e) => handleSubcontractorChange(device.id, e.target.value), children: [
      /* @__PURE__ */ u("option", { value: "", children: "---" }),
      subcontractors.map((subcontractor) => /* @__PURE__ */ u("option", { value: subcontractor.id, children: subcontractor.name }))
    ] }) })
  ] }, device.id);
}
const AddReport = () => {
  const [showModal, setShowModal] = h(false);
  h(false);
  h(null);
  h([]);
  const [modalContent, setModalContent] = h(null);
  const [devices, setDevices] = h([]);
  const [jobs, setJobs] = h([]);
  const [categories, setCategories] = h([]);
  const [deviceUsage, setDeviceUsage] = h([]);
  const [subcontractors, setSubcontractors] = h([]);
  y(() => {
    fetchDevices();
    fetchJobs();
    fetchCategories();
    fetchSubcontractors();
  }, []);
  const handleSubcontractorChange = (deviceId, subcontractorId) => {
    setDeviceUsage(
      (prevDeviceUsage) => prevDeviceUsage.map(
        (device) => device.id === deviceId ? { ...device, subcontractor: subcontractorId } : device
      )
    );
  };
  const handleSelectedChange = (deviceId, selected) => {
    setDeviceUsage(
      (prevDeviceUsage) => prevDeviceUsage.map(
        (device) => device.id === deviceId ? { ...device, selected } : device
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
        subcontractor: null
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
  return /* @__PURE__ */ u("div", { className: "flex flex-row bg-white p-3 lg:p-6 rounded-md", dir: "rtl", children: [
    /* @__PURE__ */ u(FullModal, { showModal, setShowModal, errors: null, children: modalContent }),
    /* @__PURE__ */ u("div", { className: "md:w-full lg:w-3/4", children: "hi" }),
    /* @__PURE__ */ u("div", { className: "md:w-full lg:w-1/4 space-y-1", children: [
      /* @__PURE__ */ u("div", { className: "flex flex-row w-full bg-slate-200 p-2", children: [
        /* @__PURE__ */ u("div", { className: "w-1/3", children: "نام" }),
        /* @__PURE__ */ u("div", { className: "w-1/3", children: "موجود" }),
        /* @__PURE__ */ u("div", { className: "w-1/3", children: "پیمانکار" })
      ] }),
      deviceUsage.map((device) => /* @__PURE__ */ u(
        Device,
        {
          device,
          subcontractors,
          handleSubcontractorChange,
          handleSelectedChange
        }
      ))
    ] })
  ] });
};
B(/* @__PURE__ */ u(AddReport, {}), document.getElementById("app"));
