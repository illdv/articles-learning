import React from 'react'
import ArticleList from './ArticleList'
import UserForm from './UserForm'
import Filters from './Filters'
import Counter from './Counter'
import 'react-select/dist/react-select.css'

const App = () =>
    <div>
        <Counter />
        <UserForm />
        <Filters />
        <ArticleList />
    </div>




export default App