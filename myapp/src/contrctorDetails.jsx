import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { toGregorian, toJalaali } from "jalaali-js";
import FullModal from './FullModal.jsx'
function Contract({ contract }) {
    return (<div key={contract.id} className="w-full p-4">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold bg-gray-200 p-3">{contract.name}</h2>
            <div className="flex flex-row w-full lg:p-6 sm:p-3 flex-wrap">
                <div className="w-full md:w-1/2 lg:flex-1">
                    <p className="mb-2"><span className="font-bold text-gray-700">پیمانکار:</span> <span className="text-gray-600">{contract.contractor}</span></p>
                    <p className="mb-2"><span className="font-bold text-gray-700">نوع قرارداد:</span> <span className="text-gray-600">{contract.contract_type}</span></p>
                    <p className="mb-2"><span className="font-bold text-gray-700">تاریخ شروع:</span> <span className="text-gray-600">{new Intl.DateTimeFormat("fa-IR").format(new Date(contract.start_date))}</span></p>
                    <p className="mb-2"><span className="font-bold text-gray-700">تاریخ پایان:</span> <span className="text-gray-600">{new Intl.DateTimeFormat("fa-IR").format(new Date(contract.end_date))}</span></p>
                </div>
                <div className="w-full md:w-1/2 lg:flex-1">
                    <p className="mb-2"><span className="font-bold text-gray-700">ارزش کل:</span> <span className="text-gray-600">{contract.total_value}</span></p>
                    <p className="mb-2"><span className="font-bold text-gray-700">ارزش کل (یورو):</span> <span className="text-gray-600">{contract.total_value_euro}</span></p>
                    <p className="mb-2"><span className="font-bold text-gray-700">تاریخ به‌روزرسانی:</span> <span className="text-gray-600">{new Intl.DateTimeFormat("fa-IR").format(new Date(contract.updated))}</span></p>
                </div>
                {
                    contract.coils && contract.coils.length > 0 ? (
                        <div className="w-full md:w-full lg:w-1/3">
                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg shadow-inner">
                                <h3 className="text-xl font-semibold mb-3 text-indigo-700">دستگاه های ذیل قرارداد</h3>
                                <ul className="space-y-2">
                                    {contract.coils.map((coil, index) => (
                                        <li key={index} className="bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-300  hover:-translate-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-indigo-600 font-medium">{coil.name}</span>
                                                <span className="bg-indigo-200 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">سال واردات : {coil.year_of_import}</span>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <p>تناژ: {coil.tonnage} تن</p>
                                                <p>طول: {coil.length_of_reel} متر</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    ) : (<></>)
                }

            </div>

        </div>

    </div >
    )
}

const ContractorDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(false)
    const [data, setData] = useState(null);
    const [contracts, setContracts] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [devices, setDevices] = useState([])
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([])
    const [deviceUsage, setDeviceUsage] = useState([])
    useEffect(() => {
        fetchData();
        fetchDevices()
        fetchJobs()
        fetchCategories()
    }, []);

    const fetchData = async () => {
        const url = document.getElementById("url").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setData(fetchedData);
        setContracts(fetchedData.contracts);
    };
    const fetchDevices = async () => {
        const url = document.getElementById("devices").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setDevices(fetchedData);
    };
    const fetchJobs = async () => {
        const url = document.getElementById("jobs").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setJobs(fetchedData);
    }
    const fetchCategories = async () => {
        const url = document.getElementById("categories").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setCategories(fetchedData);

    }
    function addReport() {

        const url = document.getElementById("add-report").getAttribute("href")
        window.location = url

        // create device usage array
        const deviceUsageArray = []
        for (const device of devices) {
            deviceUsageArray.push({
                id: device.id,
                name: device.name,
                selected: false,
                subcontractor: null
            })
        }
        setDeviceUsage(deviceUsageArray)
        const md = (
            <>
                <div className="flex flex-row w-full flex-wrap p-3 lg:p-6" dir={"rtl"}>
                    <div className="w-full lg:w-8/12">
                        hi
                    </div>
                    <div className="w-full lg:w-4/12">
                        bye
                    </div>
                </div>
            </>
        )
        setModalContent(md)
        setShowModal(true)

    }

















    if (!data) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-4xl">در حال دریافت اطلاعات</h1>
            </div>
        )
    }
    return (
        <div className="flex flex-col justify-center items-center" dir={"rtl"}>
            <FullModal showModal={showModal} setShowModal={setShowModal} errors={null} >
                {modalContent}
            </FullModal>
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => addReport()}
                    title={"ثبت گزارش"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>

                </button>
            </div>

            <div className="md:w-full lg:w-3/4">
                <div className="w-full p-4">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-3">اطلاعات پیمانکار</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                            <div>
                                <p className="mb-2"><span className="font-bold text-gray-700">نام شرکت:</span> <span className="text-gray-600">{data.company_name}</span></p>
                                <p className="mb-2"><span className="font-bold text-gray-700">شخص رابط:</span> <span className="text-gray-600">{data.contact_person}</span></p>
                                <p className="mb-2"><span className="font-bold text-gray-700">ایمیل:</span> <span className="text-gray-600">{data.email}</span></p>
                                <p className="mb-2"><span className="font-bold text-gray-700">تلفن:</span> <span className="text-gray-600">{data.phone}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {contracts ? (
                    <>
                        <div className="w-full p-4">
                            <h1 className="bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-3xl">اطلاعات قرادادها</h1>
                        </div>
                        {
                            contracts.map(contract => <Contract contract={contract} />)
                        }
                    </>
                ) : (<></>)}


            </div>

        </div >

    )
}
render(<ContractorDetails />, document.getElementById("app"));
