import { getList } from "./service/storage.js";
import {
    addCategory,
    addExpenseDOM,
    addOptionCategory,
} from "./modules/domManipulation.js";
import {
    handleEditClose,
    handleAddClose,
    handleEditSubmit,
    handlAddFormShow,
    handleSubmitExpense,
    handleSubmitFilter,
} from "./modules/listeners.js";
import { barChar, lineChart } from "./modules/chartManipulation.js";
import { initDB, setDbInstance } from "./service/storageIndexDB.js";
(async ()=>{
    const db=await initDB()
    setDbInstance(db)
    let expenses=getList('expenses')
    const slicedExpenses = expenses.slice(0,3)
    addCategory();
    addOptionCategory();
    addExpenseDOM(slicedExpenses);

    barChar();
    lineChart();

    const form = document.querySelector(".form-container__form");
    form.addEventListener("submit", handleSubmitExpense);

    const filterForm = document.querySelector(".expense-container__form ");
    filterForm.addEventListener("submit", handleSubmitFilter);

    const showAddForm = document.querySelector(".btn__add-expense");
    showAddForm.addEventListener("click",handlAddFormShow)

    const editForm = document.getElementById("main-form-pop");
    editForm.addEventListener("submit", handleEditSubmit);

    const closeEditBtn = document.querySelector(".edit-close");
    closeEditBtn.addEventListener("click", handleEditClose);

    const closeAddBtn = document.querySelector(".add-close");
    closeAddBtn.addEventListener("click", handleAddClose);
})()
