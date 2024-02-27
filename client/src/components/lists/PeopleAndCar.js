import { useQuery } from "@apollo/client";
import {GET_CARS_BY_PERSON_ID } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const PeopleAndCar = ({ personId }) => {
 
    const { loading, error, data, refetch } = useQuery(GET_CARS_BY_PERSON_ID, {
        variables: { personId },
      });
    
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`   

    return (
        <div>       
            {data.carsByPersonId.map(({id,make, model, personId, price, year}) => (               
                <CarCard refetch={refetch} key={id} id={id} make={make} model={model} personId={personId} price={price} year={year} />
            ))}       
        </div>
    );
}

export default PeopleAndCar;
