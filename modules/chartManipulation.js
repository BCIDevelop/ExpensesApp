import Tracker from "../class/Tracker.js";
import Category from "../class/Category.js";
import filterByDate from "../utils/filterByDate.js";
import orderByDate from "../utils/orderByDate.js";
import { getList } from "../service/storage.js";

let myBarChart
let myLineChart


export function getBarChart() {
    return myBarChart;
}

export function getLineChart() {
    return myLineChart;
}

export const barChar=function(){
    const categories=Category.listCatgories()
    const ctx = document.getElementById('myChart');
    let expenses=getList('expenses')
    const tracker =  new Tracker(expenses)
    const data =[]
    categories.forEach(element=>{
        data.push(tracker.calculateTotal(element))    
    })
    myBarChart=new Chart(ctx, {
        type: 'bar',
        data: {
        labels: categories,
        datasets: [{
            label: 'Amount',
            data,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
    
}

export const lineChart=function(){
    let expenses=getList('expenses')
    const tracker =  new Tracker(expenses)
    const dataDate = []
    let labels = []
    expenses = orderByDate(expenses)
    expenses.forEach(element=>{
        const [dia,mes,año] = element.date.split('-')
        const expenseDate = new Date(`${mes}-${dia}-${año}`)
        const filteredExpensesByDate = filterByDate(new Date('12-10-1990'),expenseDate)
        dataDate.push(tracker.calculateTotal(null,filteredExpensesByDate))
        
        labels.push(element.date)
    })
    const ctxLine = document.getElementById('myLineChart');
    const settings = {
        labels,
        datasets: [{
        label: 'My First Dataset',
        data: dataDate,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
    }
    const config = {
    type: 'line',
    data: settings
    };
    myLineChart =new Chart(
        ctxLine,
        config
    );
    
}