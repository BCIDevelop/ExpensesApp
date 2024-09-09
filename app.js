import { getList } from "./service/storage.js";
import { addCategory, addExpenseDOM ,addOptionCategory} from "./modules/domManipulation.js";
import { handleEditClose, handleEditSubmit, handleSubmitExpense,handleSubmitFilter } from "./modules/listeners.js";
import { barChar, lineChart } from "./modules/chartManipulation.js";




let expenses=getList('expenses')
const slicedExpenses = expenses.slice(0,3)


addCategory()
addOptionCategory()
addExpenseDOM(slicedExpenses)

barChar()
lineChart()

const form = document.querySelector('.form-container__form')
form.addEventListener('submit',handleSubmitExpense)

const filterForm = document.querySelector('.expense-container__form ')
filterForm.addEventListener('submit',handleSubmitFilter)

const editForm = document.querySelector('.pop-up__form')
editForm.addEventListener('submit',handleEditSubmit)

const closeBtn = document.querySelector('.pop-up__close')
closeBtn.addEventListener('click',handleEditClose)