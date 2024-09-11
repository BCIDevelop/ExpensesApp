import { getList } from "../service/storage.js";
import { addExpenseDOM, addOptionCategory } from "./domManipulation.js";
import sanitizeInput from "../utils/sanitize.js";
import validateData from "../utils/validateData.js";
import Tracker from "../class/Tracker.js";
import filterByDate from "../utils/filterByDate.js";
import {
    barChar,
    getBarChart,
    getLineChart,
    lineChart,
} from "./chartManipulation.js";
const form = document.querySelector(".form-container__form");
const textArea = document.querySelector(".form__text");
const inputs = document.querySelectorAll(".form input");
const select = document.querySelector(".form__select");
const expenseList = document.querySelector(".expense-container__list");
export const handleSubmitExpense =async function (e) {
    e.preventDefault();
    /*Nos aseguramos que no esten vacios  */
    if (
        textArea === "" ||
        inputs[0].value === "" ||
        inputs[1].value === "" ||
        inputs[2].value === "" ||
        select.value === ""
    )
        return;
    const expenseObj = {};
    expenseObj.amount = Number(sanitizeInput(inputs[0].value));
    expenseObj.title = sanitizeInput(inputs[1].value);
    expenseObj.date = inputs[2].value.split("-").reverse().join("-");
    expenseObj.category = select.value;
    expenseObj.description = textArea.value;
    /* Validamos */
    if(!validateData(expenseObj)) return
    const expenses= getList('expenses')
    const tracker = new Tracker(expenses)
    try {
        await tracker.addExpense(expenseObj)
    } catch (error) {
        console.log(error)
        return
    }
    
    expenseList.innerHTML=""
    addExpenseDOM(tracker.expenses)
    form.reset()
    const myBarChart = getBarChart()
    const myLineChart = getLineChart()
    myBarChart.destroy()
    myLineChart.destroy()
    barChar()
    lineChart()
}
export const handleFilterClicked=function(e){
    const expenses = getList('expenses')
    const categoriesFilter = document.querySelectorAll('.list-category__item')
    let filtered
    categoriesFilter.forEach(element=>{
        if(element === e.target){
            if(e.target.classList.contains('list-category__item--active')) {  
                e.target.classList.remove('list-category__item--active')                 
                filtered = expenses
            }
            else {
                e.target.classList.add('list-category__item--active')
                filtered =expenses.filter(element => element.category.name ===e.target.textContent )
            }
        } else element.classList.remove("list-category__item--active");
    });
    expenseList.innerHTML = "";
    addExpenseDOM(filtered);
};

export const handleSubmitFilter = function (e) {
    e.preventDefault();
    const categoriesFilter = document.querySelectorAll(".list-category__item");
    let categoryFilter;
    categoriesFilter.forEach((element) => {
        if (element.classList.contains("list-category__item--active"))
            categoryFilter = element.textContent;
        return;
    });
    const startDate = new Date(document.querySelector(".start").value);
    const endDate = new Date(document.querySelector(".end").value);

    const filtered = filterByDate(startDate, endDate, categoryFilter);
    expenseList.innerHTML = "";
    addExpenseDOM(filtered);
};

export const handleDeleteClick = async function (e){
    const expenses = getList('expenses')
    const tracker = new Tracker(expenses)
    try {
        await tracker.removeExpense(e.target.parentElement.parentElement.getAttribute('data-id'))
    } catch (error) {
        console.log(error)
        return
    }
    expenseList.innerHTML=""
    addExpenseDOM(tracker.expenses)
    const myBarChart = getBarChart()
    const myLineChart = getLineChart()
    myBarChart.destroy()
    myLineChart.destroy()
    barChar()
    lineChart()
}

export const handleEditClick = function(e){
    const expenses = getList('expenses')
    const tracker = new Tracker(expenses)
    const findExpense = tracker.findExpense(e.target.parentElement.parentElement.getAttribute('data-id'))
    const popup = document.querySelector(".form-edit")
    popup.style.display = 'flex'
    popup.setAttribute('data-id',findExpense.id)
    const textAreaPop = document.querySelector('.form-pop__text')
    const inputsPop= document.querySelectorAll('.form-pop input')
    const selectPop = document.querySelector('.form-pop__select')
    addOptionCategory(selectPop)
    textAreaPop.value = findExpense.description
    inputsPop[0].value = findExpense.amount
    inputsPop[1].value = findExpense.title
    inputsPop[2].value = findExpense.date.split("-").reverse().join('-')
    selectPop.value = findExpense.category.name
}

export const handleEditSubmit=async function(e){
    e.preventDefault()
    const expenses = getList('expenses')
    const tracker = new Tracker(expenses)
    const textAreaPop = document.querySelector('.form-pop__text')
    const inputsPop= document.querySelectorAll('.form-pop input')
    const selectPop = document.querySelector('.form-pop__select')
    const expenseObj = {}
    expenseObj.amount = Number(sanitizeInput(inputsPop[0].value))
    expenseObj.title = sanitizeInput(inputsPop[1].value)
    expenseObj.date = inputsPop[2].value.split("-").reverse().join('-')
    expenseObj.category = selectPop.value
    expenseObj.description = textAreaPop.value
    const popup = document.querySelector(".form-edit")
    try {
        await tracker.updateExpense(popup.getAttribute('data-id'),expenseObj)
    } catch (error) {
        console.log(error)
        return
    }
    expenseList.innerHTML=""
    addExpenseDOM(tracker.expenses)
    popup.style.display = 'none'
    const myBarChart = getBarChart()
    const myLineChart = getLineChart()
    myBarChart.destroy()
    myLineChart.destroy()
    barChar()
    lineChart()
}

export const handleEditClose = function (e) {
    const popup = document.querySelector(".form-edit");
    popup.style.display = "none";
};
export const handleAddClose = function (e) {
    const popup = document.querySelector(".form-add");
    popup.style.display = "none";
};
export const handlAddFormShow = function (e) {
    const popup = document.querySelector(".form-add");
    popup.style.display = "flex";
};
