import { getAllConsults } from "./services-consults.js";
import { getAllPatientsNames } from "./services-patients.js"

const consultsList = document.querySelector("div.card-body table.table tbody");
const bootstrapModals = {
    editModal : new bootstrap.Modal(document.getElementById('editModal'), {}),
    addModal : new bootstrap.Modal(document.getElementById('addModal'), {})
}
const editModal = document.querySelector("#editModal");
const addModal = document.querySelector("#addModal");
const addPatientFormButton = addModal.querySelector("button.add-consult-btn");
const addButton = document.body.querySelector("button#add-consult");
const saveChangesEditModalButton = editModal.querySelector("button.change-consult-btn");
let patientsNames = getAllPatientsNames();


function createConsult(consultNumber, patient, status, date, time, patientId){
    const tr = document.createElement("tr");
        const trData = `<tr>
            <td>${consultNumber}</td>
            <td>${patient}</td>
            <td><label class="badge badge-danger">${status}</label></td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="edit-btn buttons">
            <i title="Editar" style="font-size: 18px;" class="ti-pencil-alt"></i>
            </td>
            <td class="remove-btn buttons">
            <i title="Remover" style="font-size: 18px;" class="ti-trash"></i>
            </td>
        </tr>
        `;
        tr.innerHTML = trData;

        const editButton = tr.querySelector("td.edit-btn i");
        editButton.addEventListener('click',()=>{
            const editModalFields = editModal.querySelectorAll("input.form-control");
            const selectPatientName = document.createElement("select");
            const editPatientName = editModal.querySelector("div#edit-patient-name");
            selectPatientName.title = "Selecione o Paciente";
            selectPatientName.id = "edit-patientName";
            console.log(editPatientName);
            patientsNames.forEach((patientName, index)=>{
                const patientNameOption = `
                <option data-tokens="${index}">${patientName}</option>
                `;
                selectPatientName.innerHTML += (patientNameOption);
            })
            editPatientName.appendChild(selectPatientName);
            
            console.log(selectPatientName);
            editModal.setAttribute("consult-id", patientId);
            /*const fatherElement = editButton.closest("tr");
            const elementData = fatherElement.querySelectorAll("td");
            for (let index = 1; index < editModalFields.length; index++) {
                editModalFields[index].value = elementData[index].innerText;
            }*/
            bootstrapModals.editModal.show();
        });
    
        const deleteButton = tr.querySelector("td.remove-btn i");
        deleteButton.addEventListener('click',()=>{
            const fatherElement = editButton.closest("tr");
            const patientName = fatherElement.querySelector("td.consult-name").innerText;
            const toDelete= confirm(`Quer Mesmo Deletar o Paciente ${patientName}?`);
            if(toDelete){
                //deletePatient(patientId);
                //clearAndUpdatePatientsList();
            }
        })

        return tr;
}

let patientId = -1;
function addAllPacients(){
    patientId++;
    getAllConsults().forEach((consultData)=>{
        const consult = createConsult(consultData.consultNumber, consultData.patient, consultData.status, consultData.date, consultData.time, patientId);
        consultsList.appendChild(consult);
    });
}

addAllPacients();