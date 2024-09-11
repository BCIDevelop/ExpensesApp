const expenseList = document.querySelector(".expense-container__list");
import Category from "../class/Category.js";
import {
    handleDeleteClick,
    handleEditClick,
    handleFilterClicked,
} from "./listeners.js";
export const addExpenseDOM = function (expenses) {
    expenses.forEach((element) => {
        const listElement = document.createElement("li");
        listElement.classList.add("list__item");
        listElement.setAttribute("data-id", element.id);
        const header = document.createElement("h1");
        header.textContent = element.title;
        listElement.appendChild(header);
        const amount = document.createElement("h3");
        amount.textContent = `Amount: ${element.amount}`;
        listElement.appendChild(amount);
        const paragraph = document.createElement("p");
        paragraph.textContent = element.description;
        listElement.appendChild(paragraph);
        const date = document.createElement("p");
        date.textContent = element.date;
        listElement.appendChild(date);
        const divElement = document.createElement("div");
        divElement.style.display = "flex";
        divElement.style.gap = "20px";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.addEventListener("click", handleDeleteClick);
        divElement.appendChild(deleteBtn);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn-edit");
        editButton.addEventListener("click", handleEditClick);
        divElement.appendChild(editButton);
        listElement.appendChild(divElement);
        expenseList.appendChild(listElement);
    });
};

export const addCategory = function (
    categoryList = document.querySelector(".expense-container__category")
) {
    const categories = Category.listCatgories();
    categories.forEach((element) => {
        const listElement = document.createElement("li");
        listElement.classList.add("list-category__item");
        listElement.textContent = element;
        listElement.addEventListener("click", handleFilterClicked);
        categoryList.appendChild(listElement);
    });
};

export const addOptionCategory = function (
    select = document.querySelector(".form__select")
) {
    select.innerHTML = "";
    const categories = Category.listCatgories();
    categories.forEach((element) => {
        const option = document.createElement("option");
        option.setAttribute("value", element);
        option.textContent = element;
        select.appendChild(option);
    });
};
