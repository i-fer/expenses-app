import React, { useContext, useState } from "react"
import {v4 as uuiV4} from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [expenses, setExpense] = useLocalStorage("expenses",[])

    function getBudgetExpenses (budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    
    function  addExpense (description, amount, budgetId){
        setExpense(prevExpenses => {
            return [...prevExpenses, {id: uuiV4(), description, amount, budgetId}]
        })
    }

    function addBudget(name, max){
        setBudgets(prevBudgets => {
            return [...prevBudgets, {id: uuiV4(), name, max} ]
        })
        
    }

    function deleteBudget(id){
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    
    function deleteExpense(id){
        setExpense(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetsContext.Provider>
}