let patientsListDB = [
    {
        photo : "face1",
        name : "Herman Beck",
        subscriptionDate : "22/04/2015",
    },
    {
        photo : "face2",
        name : "Sheyla Malck",
        subscriptionDate : "18/04/2005",
    },
    {
        photo : "face3",
        name : "Albert Malck",
        subscriptionDate : "29/04/2021",
    },
];

const myDB = localStorage;

function getDbData(){
    let dbData = [];
    try{
        dbData = JSON.parse(localStorage.getItem('patients'));
    }catch(e){}
    return dbData;
}

function setDbData(patientsList){
    localStorage.setItem('patients', JSON.stringify(patientsList));
    localStorage.setItem("activedDefaultData", true);
}

function setDefaultData(){
    if(!localStorage.getItem("activedDefaultData")){
        localStorage.setItem("activedDefaultData", true);
        setDbData(patientsListDB);
    }  
}

export { getDbData, setDbData , setDefaultData};