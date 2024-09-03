var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { u } from "./jsxRuntime.module.js";
import { b, m, B, h, y, k } from "./Modal.js";
import { j as jalaaliJs } from "./index.js";
import { F as FullModal } from "./FullModal.js";
function Activity({ activity, index }) {
  return /* @__PURE__ */ u("div", { className: "col-span-12 grid grid-cols-12", children: [
    /* @__PURE__ */ u("div", { className: "col-span-1", children: index + 1 }),
    /* @__PURE__ */ u("div", { className: "col-span-2", children: activity.start_time }),
    /* @__PURE__ */ u("div", { className: "col-span-2", children: activity.end_time })
  ] }, index);
}
class ClockPicker extends b {
  constructor(props) {
    super(props);
    __publicField(this, "initDatepicker", () => {
      $(this.timepickerRef.current).clockTimePicker();
    });
    this.timepickerRef = m();
  }
  componentDidMount() {
    this.initDatepicker();
  }
  render() {
    return /* @__PURE__ */ u(
      "input",
      {
        name: this.props.name,
        className: "w-full border border-gray-200",
        type: "text",
        ref: this.timepickerRef
      }
    );
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
function showJalali(date) {
  if (date) {
    const [y2, m2, d] = date.split("-");
    const j = jalaaliJs.toJalaali(parseInt(y2), parseInt(m2), parseInt(d));
    return `${j.jy}/${j.jm}/${j.jd}`;
  }
  return "";
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
  const [report, setReport] = h({
    contract: "",
    contractor: "",
    coil_tubing: "",
    date: ""
  });
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
      /* @__PURE__ */ u("div", { className: "grid gap-4 w-full", children: /* @__PURE__ */ u("form", { onSubmit: handleActivitySubmit, className: "grid gap-4 w-full grid-cols-12 p-2", children: [
        /* @__PURE__ */ u("div", { className: "col-span-2", children: [
          /* @__PURE__ */ u(
            "label",
            {
              htmlFor: "start_time",
              className: "block text-sm font-medium text-gray-700",
              children: "Start Time"
            }
          ),
          /* @__PURE__ */ u(ClockPicker, { name: "start_time" })
        ] }),
        /* @__PURE__ */ u("div", { className: "col-span-2", children: [
          /* @__PURE__ */ u(
            "label",
            {
              htmlFor: "end_time",
              className: "block text-sm font-medium text-gray-700",
              children: "End Time"
            }
          ),
          /* @__PURE__ */ u(ClockPicker, { name: "end_time" })
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            type: "submit",
            className: "rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 col-span-2",
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
  const handleContractChangeDates = (e) => {
    const [y2, m2, d] = e.target.value.split("/");
    const gregorianDate = jalaaliJs.toGregorian(parseInt(y2), parseInt(m2), parseInt(d));
    const date = `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`;
    setReport({ ...report, [e.target.name]: date });
  };
  return /* @__PURE__ */ u("div", { className: "grid grid-cols-12", children: [
    /* @__PURE__ */ u(
      FullModal,
      {
        showModal,
        setShowModal,
        errors: null,
        children: modalContent
      }
    ),
    /* @__PURE__ */ u("div", { className: "p-2 col-span-12 border border-gray-800 bg-white grid grid-cols-12", children: [
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "date:" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          name: "date",
          "data-jdp": true,
          value: showJalali(report.date) || "",
          onChange: handleContractChangeDates
        }
      ) }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "p/e company:" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "field" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "well no:" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "rig no:" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" })
    ] }),
    /* @__PURE__ */ u("div", { className: "p-2 col-span-12 border border-gray-800 bg-white grid grid-cols-12", children: [
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "unit no:" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: report.coil_tubing.name || "" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "contract no" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: report.contract.number || "" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "status" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "p/e supervisor" }),
      /* @__PURE__ */ u("div", { className: "col-span-2 uppercase px-1", children: "@TODO" })
    ] }),
    /* @__PURE__ */ u("div", { className: "p-2 col-span-12 border border-gray-800 bg-white grid grid-cols-12", children: [
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "days on location" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "coil od/len" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "m/daily running" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "@TODO" }),
      /* @__PURE__ */ u("div", { className: "col-span-1 uppercase px-1", children: "m/total" }),
      /* @__PURE__ */ u("div", { className: "col-span-2 uppercase px-1", children: "@TODO" })
    ] }),
    /* @__PURE__ */ u("div", { className: "col-span-12 md:col-span-8 border border-gray-800 bg-white grid grid-cols-12", children: [
      activities.length > 0 && /* @__PURE__ */ u(k, { children: [
        /* @__PURE__ */ u("div", { className: "col-span-12 grid grid-cols-12", children: [
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
