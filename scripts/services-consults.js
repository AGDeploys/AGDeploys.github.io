import consultsDB from "./consultsDB.js";

let consultsList = consultsDB;

function getAllConsults(){
    return consultsList;
}

export { getAllConsults }