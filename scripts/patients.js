import { getAllPatients, addPatient, updatePatient , deletePatient} from "./services-patients.js";

const patientsList = document.querySelector("div.container-scroller div.container-fluid.page-body-wrapper div.main-panel div.content-wrapper tbody");
const bootstrapModals = {
    editModal : new bootstrap.Modal(document.getElementById('editModal'), {}),
    addModal : new bootstrap.Modal(document.getElementById('addModal'), {})
}
const editModal = document.querySelector("#editModal");
const addModal = document.querySelector("#addModal");
const addPatientFormButton = addModal.querySelector("button.add-patient-btn");
const addButton = document.body.querySelector("button#add-patient");
const saveChangesEditModalButton = editModal.querySelector("button.change-patient-btn");

addButton.addEventListener('click',()=>{
    bootstrapModals.addModal.show();
});

addPatientFormButton.addEventListener("click", ()=>{
    addPatient(...getModalFieldsValues(addModal));
    clearAndUpdatePatientsList();
    bootstrapModals.addModal.hide()
});

saveChangesEditModalButton.addEventListener("click",()=>{
    const editModalFieldsValues = onClickEditModalSaveChangesButton();
    updatePatient(...editModalFieldsValues);
    clearAndUpdatePatientsList();
    closeModal(editModal);
})

function getModalFieldsValues(modal){
    const addModalElements = modal.querySelectorAll("input.form-control");
    const addModalFields = [];
    addModalElements.forEach((modalElement)=>{
        addModalFields.push(modalElement.value);
    })
    return addModalFields;
}

function createPatientElement(photo, name, subscriptionDate, patientId){
    const tr = document.createElement("tr");
    tr.setAttribute("patient-id", patientId);
    const trDataElement = `<td class="py-1">
    <img src="../../images/faces/${photo}.jpg" alt="Imagem de ${name}"/>
    </td>
    <td class="patient-name">
    ${name}
    </td>
    <td>
    ${subscriptionDate}
    </td>
    <td class="edit-btn buttons">
    <i title="Editar" style="font-size: 18px;" class="ti-pencil-alt"></i>
    </td>
    <td class="remove-btn buttons">
    <i title="Remover" style="font-size: 18px;" class="ti-trash"></i>
    </td>
    </td>`;
    tr.innerHTML = trDataElement;

    const editButton = tr.querySelector("td.edit-btn i");
    editButton.addEventListener('click',()=>{
        const editModalFields = editModal.querySelectorAll("input.form-control");
        editModal.setAttribute("patient-id", patientId);
        const fatherElement = editButton.closest("tr");
        const elementData = fatherElement.querySelectorAll("td");
        const justElementImageName = elementData[0].querySelector("img").getAttribute("src").split("/faces/")[1].split(".jpg")[0];
        editModalFields[0].value = justElementImageName;
        for (let index = 1; index < editModalFields.length; index++) {
            editModalFields[index].value = elementData[index].innerText;
        }
        bootstrapModals.editModal.show();
    });

    const deleteButton = tr.querySelector("td.remove-btn i");
    deleteButton.addEventListener('click',()=>{
        const fatherElement = editButton.closest("tr");
        const patientName = fatherElement.querySelector("td.patient-name").innerText;
        const toDelete= confirm(`Quer Mesmo Deletar o Paciente ${patientName}?`);
        if(toDelete){
            deletePatient(patientId);
            clearAndUpdatePatientsList();
        }
    })
    return tr;
}

function onClickEditModalSaveChangesButton(){
    const editModalFieldsValues = getModalFieldsValues(editModal);
    const patientId = editModal.getAttribute("patient-id");
    editModalFieldsValues.push(patientId);
    return editModalFieldsValues;
} 

function closeModal(modal){
    if(modal.getAttribute("patient-id")){ modal.removeAttribute("patient-id") }
    bootstrapModals[modal.id].hide();
}

let patientId = -1;
function addAllPacients(){
    getAllPatients().forEach((patient)=>{
        patientId++;
        const closeButtons = document.body.querySelectorAll(".close-btn");
        const trElement = createPatientElement(patient.photo, patient.name, patient.subscriptionDate, patientId);
    
        closeButtons.forEach((button)=>{
            button.addEventListener("click",()=>{
                const modalToClose = button.closest(".modal");
                closeModal(modalToClose);
            });
        })
    
        patientsList.appendChild(trElement);
    });   
}

function clearPatientsList(){
    patientsList.innerHTML = "";
}

function clearAndUpdatePatientsList(){
    patientId = -1;
    clearPatientsList();
    addAllPacients();
}

addAllPacients();