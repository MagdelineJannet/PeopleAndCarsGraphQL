import {gql} from "@apollo/client"

// Queries for People
export const GET_PEOPLE = gql`
query {
    people{
        id
        firstName
        lastName
    }
}
`
export const ADD_PERSON = gql`
mutation AddPerson($id: String!, $firstName: String!, $lastName: String!)
{
addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
    firstName
    id
    lastName
  }
}
`
export const REMOVE_PERSON = gql`
mutation RemovePerson($id: String!)
{
removePeople(id: $id) {
    firstName
    id
    lastName
  }
}
`
export const UPDATE_PERSON = gql`
mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!)
{
updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
    firstName
    id
    lastName
  }
}
`
// Queries for Cars
export const GET_CARS = gql`
query {
    cars{
      id
      make
      model
      personId
      price
      year
    }
}
`
export const ADD_CAR = gql`
mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!)
{
  addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      make
      model
      personId
      price
      year
  }
}
`
export const UPDATE_CAR = gql`
mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!)
{
  updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      make
      model
      price
      year
  }
}
`
export const REMOVE_CAR = gql`
mutation RemoveCar($id: String!)
{
  removeCar(id: $id) {
      id
      make
      model
      personId
      price
      year
    }
}
`

export const GET_CARS_BY_PERSON_ID = gql`
  query GetCarsByPersonId($personId: String!) {
    carsByPersonId(personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query PersonWithCars($personId: String!) {
    personWithCars(id: $personId) {
      person {
        firstName
        id
        lastName
      }
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;