import './App.css';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPerson';
import People from './components/lists/People';
import AddCar from './components/forms/AddCar';
import ViewDetails from './components/details/ViewDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => {
    return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="App">
              <Title />
              <AddPerson />
              <AddCar />
              <People />
            </div>
          } />
          <Route path="/people/:id" element={<ViewDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
