import { B, u, h, y, k } from "./hooks.module.js";
import { F as FullModal } from "./FullModal.js";
function Contract({ contract }) {
  return /* @__PURE__ */ u("div", { className: "w-full p-4", children: /* @__PURE__ */ u("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300", children: [
    /* @__PURE__ */ u("h2", { className: "text-2xl font-bold bg-gray-200 p-3", children: contract.name }),
    /* @__PURE__ */ u("div", { className: "flex flex-row w-full lg:p-6 sm:p-3 flex-wrap", children: [
      /* @__PURE__ */ u("div", { className: "w-full md:w-1/2 lg:flex-1", children: [
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "پیمانکار:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: contract.contractor })
        ] }),
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "نوع قرارداد:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: contract.contract_type })
        ] }),
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "تاریخ شروع:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: new Intl.DateTimeFormat("fa-IR").format(new Date(contract.start_date)) })
        ] }),
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "تاریخ پایان:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: new Intl.DateTimeFormat("fa-IR").format(new Date(contract.end_date)) })
        ] })
      ] }),
      /* @__PURE__ */ u("div", { className: "w-full md:w-1/2 lg:flex-1", children: [
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "ارزش کل:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: contract.total_value })
        ] }),
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "ارزش کل (یورو):" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: contract.total_value_euro })
        ] }),
        /* @__PURE__ */ u("p", { className: "mb-2", children: [
          /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "تاریخ به‌روزرسانی:" }),
          " ",
          /* @__PURE__ */ u("span", { className: "text-gray-600", children: new Intl.DateTimeFormat("fa-IR").format(new Date(contract.updated)) })
        ] })
      ] }),
      contract.coils && contract.coils.length > 0 ? /* @__PURE__ */ u("div", { className: "w-full md:w-full lg:w-1/3", children: /* @__PURE__ */ u("div", { className: "bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg shadow-inner", children: [
        /* @__PURE__ */ u("h3", { className: "text-xl font-semibold mb-3 text-indigo-700", children: "دستگاه های ذیل قرارداد" }),
        /* @__PURE__ */ u("ul", { className: "space-y-2", children: contract.coils.map((coil, index) => /* @__PURE__ */ u("li", { className: "bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-300  hover:-translate-y-1", children: [
          /* @__PURE__ */ u("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ u("span", { className: "text-indigo-600 font-medium", children: coil.name }),
            /* @__PURE__ */ u("span", { className: "bg-indigo-200 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full", children: [
              "سال واردات : ",
              coil.year_of_import
            ] })
          ] }),
          /* @__PURE__ */ u("div", { className: "mt-2 text-sm text-gray-600", children: [
            /* @__PURE__ */ u("p", { children: [
              "تناژ: ",
              coil.tonnage,
              " تن"
            ] }),
            /* @__PURE__ */ u("p", { children: [
              "طول: ",
              coil.length_of_reel,
              " متر"
            ] })
          ] })
        ] }, index)) })
      ] }) }) : /* @__PURE__ */ u(k, {})
    ] })
  ] }) }, contract.id);
}
const ContractorDetails = () => {
  const [showModal, setShowModal] = h(false);
  h(false);
  const [data, setData] = h(null);
  const [contracts, setContracts] = h([]);
  const [modalContent, setModalContent] = h(null);
  const [devices, setDevices] = h([]);
  const [jobs, setJobs] = h([]);
  const [categories, setCategories] = h([]);
  const [deviceUsage, setDeviceUsage] = h([]);
  y(() => {
    fetchData();
    fetchDevices();
    fetchJobs();
    fetchCategories();
  }, []);
  const fetchData = async () => {
    const url = document.getElementById("url").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    setData(fetchedData);
    setContracts(fetchedData.contracts);
  };
  const fetchDevices = async () => {
    const url = document.getElementById("devices").getAttribute("href");
    const response = await fetch(url);
    const fetchedData = await response.json();
    console.log(fetchedData);
    setDevices(fetchedData);
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
  function addReport() {
    const url = document.getElementById("add-report").getAttribute("href");
    window.location = url;
    const deviceUsageArray = [];
    for (const device of devices) {
      deviceUsageArray.push({
        id: device.id,
        name: device.name,
        selected: false,
        subcontractor: null
      });
    }
    setDeviceUsage(deviceUsageArray);
    const md = /* @__PURE__ */ u(k, { children: /* @__PURE__ */ u("div", { className: "flex flex-row w-full flex-wrap p-3 lg:p-6", dir: "rtl", children: [
      /* @__PURE__ */ u("div", { className: "w-full lg:w-8/12", children: "hi" }),
      /* @__PURE__ */ u("div", { className: "w-full lg:w-4/12", children: "bye" })
    ] }) });
    setModalContent(md);
    setShowModal(true);
  }
  if (!data) {
    return /* @__PURE__ */ u("div", { className: "flex h-screen justify-center items-center", children: /* @__PURE__ */ u("h1", { className: "text-4xl", children: "در حال دریافت اطلاعات" }) });
  }
  return /* @__PURE__ */ u("div", { className: "flex flex-col justify-center items-center", dir: "rtl", children: [
    /* @__PURE__ */ u(FullModal, { showModal, setShowModal, errors: null, children: modalContent }),
    /* @__PURE__ */ u("div", { className: "fixed bottom-8 right-8 z-50", children: /* @__PURE__ */ u(
      "button",
      {
        className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110",
        onClick: () => addReport(),
        title: "ثبت گزارش",
        children: /* @__PURE__ */ u("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 inline-block", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ u("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) })
      }
    ) }),
    /* @__PURE__ */ u("div", { className: "md:w-full lg:w-3/4", children: [
      /* @__PURE__ */ u("div", { className: "w-full p-4", children: /* @__PURE__ */ u("div", { className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300", children: [
        /* @__PURE__ */ u("h2", { className: "text-2xl font-bold mb-4 bg-gray-200 p-3", children: "اطلاعات پیمانکار" }),
        /* @__PURE__ */ u("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-6", children: /* @__PURE__ */ u("div", { children: [
          /* @__PURE__ */ u("p", { className: "mb-2", children: [
            /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "نام شرکت:" }),
            " ",
            /* @__PURE__ */ u("span", { className: "text-gray-600", children: data.company_name })
          ] }),
          /* @__PURE__ */ u("p", { className: "mb-2", children: [
            /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "شخص رابط:" }),
            " ",
            /* @__PURE__ */ u("span", { className: "text-gray-600", children: data.contact_person })
          ] }),
          /* @__PURE__ */ u("p", { className: "mb-2", children: [
            /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "ایمیل:" }),
            " ",
            /* @__PURE__ */ u("span", { className: "text-gray-600", children: data.email })
          ] }),
          /* @__PURE__ */ u("p", { className: "mb-2", children: [
            /* @__PURE__ */ u("span", { className: "font-bold text-gray-700", children: "تلفن:" }),
            " ",
            /* @__PURE__ */ u("span", { className: "text-gray-600", children: data.phone })
          ] })
        ] }) })
      ] }) }),
      contracts ? /* @__PURE__ */ u(k, { children: [
        /* @__PURE__ */ u("div", { className: "w-full p-4", children: /* @__PURE__ */ u("h1", { className: "bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-3xl", children: "اطلاعات قرادادها" }) }),
        contracts.map((contract) => /* @__PURE__ */ u(Contract, { contract }))
      ] }) : /* @__PURE__ */ u(k, {})
    ] })
  ] });
};
B(/* @__PURE__ */ u(ContractorDetails, {}), document.getElementById("app"));
