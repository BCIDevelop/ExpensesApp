

export function addExpenses(key, expenses) {
    
    localStorage.setItem(key, JSON.stringify(expenses));
}


export function getList(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}