import {DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../graphql/queries'
import filter from 'lodash.filter';
const RemoveCar = ({id,personId,refetch}) => {
       const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
            try {
                const carData = cache.readQuery({ query: GET_CARS });
                if (!carData) return;

                const updatedCar = filter(carData.cars, car => car.id !== id);
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        cars: updatedCar,
                        __typename: 'Cars'
                    }
                })                                                
            } catch (error) {
                console.error('Error updating cache:', error);
            }
        }
    });
    
    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this car?")
        if (result)
        {
            removeCar({
                variables: {
                    id
                }
            }).then(()=> {
                refetch();
            })

        }
    }
    return <DeleteOutlined key='delete' style={{color: 'red'}} onClick={handleButtonClick}/>
}

export default RemoveCar;