var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { u, b, A, B, h, y, k } from "./hooks.module.js";
import { F as FullModal } from "./FullModal.js";
function Activity({ activity, index }) {
  return /* @__PURE__ */ u("div", { className: "col-span-12 grid", children: [
    /* @__PURE__ */ u("div", { className: "col-span-1", children: "#" }),
    /* @__PURE__ */ u("div", { className: "col-span-2", children: "Start Time" }),
    /* @__PURE__ */ u("div", { className: "col-span-2", children: "End Time" })
  ] }, index);
}
class ClockPicker extends b {
  constructor(props) {
    super(props);
    __publicField(this, "handleChange", (e) => {
    });
    __publicField(this, "initDatepicker", () => {
      console.log(this.timepickerRef.current);
    });
    this.timepickerRef = A(null);
  }
  componentDidMount() {
    this.initDatepicker();
  }
  render() {
    return /* @__PURE__ */ u("div", { class: "clock-picker", children: /* @__PURE__ */ u(
      "input",
      {
        className: "timepicker",
        type: "text",
        ref: this.timepickerRef,
        onBlur: this.handleChange
      }
    ) });
  }
}
function Device({
  device,
  subcontractors,
  handleSubcontractorChange,
  handleSelectedChange
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: "grid grid-cols-12 border border-gray-950 border-collapse bg-white",
      children: [
        /* @__PURE__ */ u(
          "div",
          {
            className: `col-span-4 justify-center text-xs ${device.selected == "1" ? "border-l-4 border-l-green-500" : ""}`,
            children: device.name
          }
        ),
        /* @__PURE__ */ u("div", { className: "col-span-4 px-2 my-auto", children: /* @__PURE__ */ u(
          "select",
          {
            className: "w-full bg-white",
            value: device.selected,
            onChange: (e) => handleSelectedChange(device.id, e.target.value),
            children: [
              /* @__PURE__ */ u("option", { value: "0", children: "No" }),
              /* @__PURE__ */ u("option", { value: "1", children: "yes" })
            ]
          }
        ) }),
        /* @__PURE__ */ u("div", { className: "col-span-4 my-auto", children: /* @__PURE__ */ u(
          "select",
          {
            className: "w-full bg-white",
            value: device.subcontractor,
            onChange: (e) => handleSubcontractorChange(device.id, e.target.value),
            children: [
              /* @__PURE__ */ u("option", { value: "", children: "---" }),
              subcontractors.map((subcontractor) => /* @__PURE__ */ u("option", { value: subcontractor.id, children: subcontractor.name }))
            ]
          }
        ) })
      ]
    },
    device.id
  );
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
  const [activities, setActivities] = h([]);
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
        (device) => device.id === deviceId ? { ...device, selected: parseInt(selected) } : device
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
  function handleSubmit() {
    const errors2 = [];
    deviceUsage.forEach((device) => {
      if (device.selected === 1 && !device.subcontractor) {
        errors2.push(device.name);
      }
    });
    if (errors2.length > 0) {
      console.error("Validation errors:", errors2);
      setModalContent(
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ u("h2", { className: "text-red-800 text-4xl", children: "Please correct these errors before submiting again" }),
          /* @__PURE__ */ u("ul", { children: errors2.map((error, index) => /* @__PURE__ */ u("li", { className: "text-red-800 text-xl", children: [
            "Device ",
            /* @__PURE__ */ u("strong", { children: error }),
            " is selected but has no subcontractor assigned."
          ] }, index)) })
        ] })
      );
      setShowModal(true);
      return;
    }
  }
  const handleAddActivity = () => {
    setModalContent(
      /* @__PURE__ */ u("div", { className: "grid gap-4", children: /* @__PURE__ */ u("form", { onSubmit: handleActivitySubmit, className: "space-y-4", children: [
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ u(
            "label",
            {
              htmlFor: "start_time",
              className: "block text-sm font-medium text-gray-700",
              children: "Start Time"
            }
          ),
          /* @__PURE__ */ u(ClockPicker, {})
        ] }),
        /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ u(
            "label",
            {
              htmlFor: "end_time",
              className: "block text-sm font-medium text-gray-700",
              children: "End Time"
            }
          ),
          /* @__PURE__ */ u(
            "input",
            {
              type: "text",
              id: "end_time",
              name: "end_time",
              "aria-label": "Time",
              required: true,
              className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            }
          )
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            type: "submit",
            className: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Add Activity"
          }
        )
      ] }) })
    );
    setShowModal(true);
  };
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newActivity = {
      start_time: e.target.start_time.value,
      end_time: e.target.end_time.value
    };
    setActivities([...activities, newActivity]);
    setShowModal(false);
  };
  return /* @__PURE__ */ u("div", { className: "grid grid-cols-12 gap-1", children: [
    /* @__PURE__ */ u(
      FullModal,
      {
        showModal,
        setShowModal,
        errors: null,
        children: modalContent
      }
    ),
    /* @__PURE__ */ u("div", { className: "col-span-12 md:col-span-8 border border-gray-800 bg-white grid grid-cols-12", children: [
      activities.length > 0 && /* @__PURE__ */ u(k, { children: [
        /* @__PURE__ */ u("div", { className: "col-span-12 grid", children: [
          /* @__PURE__ */ u("div", { className: "col-span-1", children: "#" }),
          /* @__PURE__ */ u("div", { className: "col-span-2", children: "Start Time" }),
          /* @__PURE__ */ u("div", { className: "col-span-2", children: "End Time" })
        ] }),
        activities.map((activity, index) => /* @__PURE__ */ u(Activity, { activity, index }))
      ] }),
      /* @__PURE__ */ u(
        "button",
        {
          className: "px-3 py-2 rounded-md bg-slate-600 text-white",
          onClick: handleAddActivity,
          children: "Add Activity"
        }
      ),
      /* @__PURE__ */ u(
        "button",
        {
          className: `px-3 py-2 rounded-md bg-cyan-400`,
          onClick: handleSubmit,
          children: "submit"
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { className: "col-span-12 gap-0 md:col-span-4 border border-gray-800 bg-white", children: [
      /* @__PURE__ */ u("div", { className: "grid grid-cols-12 bg-slate-300 text-center border border-gray-950 border-collapse", children: [
        /* @__PURE__ */ u("div", { className: "col-span-4 grid items-center", children: "Device Name" }),
        /* @__PURE__ */ u("div", { className: "col-span-4 grid items-center", children: "Availibility" }),
        /* @__PURE__ */ u("div", { className: "col-span-4 grid items-center", children: "Provider" })
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
