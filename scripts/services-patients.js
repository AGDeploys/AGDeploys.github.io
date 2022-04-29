import { getDbData, setDbData, setDefaultData } from "./patientsDb.js";
setDefaultData();

let patientsList = getDbData();

function addPatient(photoName, patientName, subscriptionDate){
    patientsList.push({
        photo : photoName,
        name : patientName,
        subscriptionDate : subscriptionDate,
    })
    setDbData(patientsList);
}

function getAllPatientsNames(){
    const patientsName = [];
    getAllPatients().forEach((patient)=>{
        patientsName.push(patient.name);
    });
    return patientsName;
}

function getAllPatients(){
    return patientsList;
}

function updatePatient(photoName, patientName, subscriptionDate, patientId){
    verifyDataAndUpdate("photo", patientId, photoName);
    verifyDataAndUpdate("name", patientId, patientName);
    verifyDataAndUpdate("subscriptionDate", patientId, subscriptionDate);
}

function deletePatient(patientId){
    const newArrayValuesLeft = patientsList.slice(0, patientId);
    const newArrayValuesRight = patientsList.slice(patientId+1,patientsList.length);
    const newArray = newArrayValuesLeft.concat(newArrayValuesRight);
    patientsList = newArray;
    setDbData(patientsList);
}

function verifyDataAndUpdate(dbFieldName, patientId, newFieldValue){
    if(patientsList[patientId][dbFieldName] !== newFieldValue){
        patientsList[patientId][dbFieldName] = newFieldValue;
        setDbData(patientsList);
    }
}

export { getAllPatients, addPatient, updatePatient , deletePatient, getAllPatientsNames};