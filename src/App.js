import './App.css';
import Container from 'react-bootstrap/Container'
import {Button, Stack} from 'react-bootstrap'
import BudgetCards from './components/BudgetCards';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import {useBudgets} from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpensetModal, setShowAddExpenseModal] = useState(false)
  const [addExpensetModalBudgetId, setExpensetModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setExpensetModalBudgetId(budgetId)
  }

  return (
  <>
  <Container className='my-4'>
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'>Budgets</h1>
      <Button variant='primary' onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px 1fr))",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >



      {budgets.map((budget, index) => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return (
        <BudgetCards 
        key={budget.id}
        name={budget.name}        
        amount={amount} 
        max={budget.max}
        onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
        />  
      )}
      )}          
      
    </div>
  </Container>
  <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
  <AddExpenseModal 
  show={showAddExpensetModal}
  defaultBudgetId = {addExpensetModalBudgetId} 
  handleClose={() => setShowAddExpenseModal(false)}
  />
  </>
  )
}

export default App;
