import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { toGregorian, toJalaali } from "jalaali-js";
import FullModal from './FullModal.jsx'


function Device({ device, subcontractors, handleSubcontractorChange, handleSelectedChange }) {
    return (
        <div className="flex flex-row w-full bg-slate-100 border border-slate-300 px-2" key={device.id}>
            <div className="w-1/3">{device.name}</div>
            <div className="w-1/3 px-2">
                <select className="w-full bg-white" value={device.selected} onChange={(e) => handleSelectedChange(device.id, e.target.value)}>

                    <option value="0">No</option>
                    <option value="1">yes</option>

                </select>
            </div>
            <div className="w-1/3">
                <select className="w-full bg-white" value={device.subcontractor} onChange={(e) => handleSubcontractorChange(device.id, e.target.value)}>
                    <option value="">---</option>
                    {subcontractors.map((subcontractor) => <option value={subcontractor.id}>{subcontractor.name}</option>)}
                </select>
            </div>
        </div>
    )
}


const AddReport = () => {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState(false)
    const [data, setData] = useState(null);
    const [contracts, setContracts] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    const [devices, setDevices] = useState([])
    const [jobs, setJobs] = useState([])
    const [categories, setCategories] = useState([])
    const [deviceUsage, setDeviceUsage] = useState([])
    const [subcontractors, setSubcontractors] = useState([])
    useEffect(() => {
        fetchDevices()
        fetchJobs()
        fetchCategories()
        fetchSubcontractors()
    }, []);



    const handleSubcontractorChange = (deviceId, subcontractorId) => {
        setDeviceUsage(prevDeviceUsage =>
            prevDeviceUsage.map(device =>
                device.id === deviceId
                    ? { ...device, subcontractor: subcontractorId }
                    : device
            )
        );
    };
    const handleSelectedChange = (deviceId, selected) => {
        setDeviceUsage(prevDeviceUsage =>
            prevDeviceUsage.map(device =>
                device.id === deviceId
                    ? { ...device, selected: selected }
                    : device
            )
        );
    }

    const fetchDevices = async () => {
        const url = document.getElementById("devices").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        const deviceUsageArray = []
        for (const device of fetchedData) {
            deviceUsageArray.push({
                id: device.id,
                name: device.name,
                selected: 0,
                subcontractor: null
            })
        }
        setDeviceUsage(deviceUsageArray)
        setDevices(fetchedData);

    };
    const fetchSubcontractors = async () => {
        const url = document.getElementById("subcontractors").getAttribute("href")
        const response = await fetch(url);
        const fetchedData = await response.json();
        console.log(fetchedData);
        setSubcontractors(fetchedData);
    }
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


    return (
        <div className="flex flex-row bg-white p-3 lg:p-6 rounded-md" dir={"rtl"}>
            <FullModal showModal={showModal} setShowModal={setShowModal} errors={null} >
                {modalContent}
            </FullModal>
            <div className="md:w-full lg:w-3/4">
                hi
            </div>
            <div className="md:w-full lg:w-1/4 space-y-1">
                <div className="flex flex-row w-full bg-slate-200 p-2">
                    <div className="w-1/3">نام</div>
                    <div className="w-1/3">
                        موجود
                    </div>
                    <div className="w-1/3">پیمانکار</div>
                </div>
                {deviceUsage.map((device) => <Device
                    device={device}
                    subcontractors={subcontractors}
                    handleSubcontractorChange={handleSubcontractorChange}
                    handleSelectedChange={handleSelectedChange}
                />)}
            </div>
        </div >

    )
}
render(<AddReport />, document.getElementById("app"));
