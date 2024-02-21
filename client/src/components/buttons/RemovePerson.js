import {DeleteOutlined} from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries'
import filter from 'lodash.filter';
const RemovePerson = ({id}) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson } }) {
            try {
                const peopleData = cache.readQuery({ query: GET_PEOPLE });
                if (!peopleData) return;

                const updatedPeople = filter(peopleData.people, person => person.id !== id);
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        people: updatedPeople
                    }
                });
            } catch (error) {
                console.error('Error updating cache:', error);
            }
        }
    });
    
    const handleButtonClick = () => {
        let result = window.confirm("Are you sure you want to delete this person?")
        if (result)
        {
            removePerson({
                variables: {
                    id
                }
            })

        }
    }
    return <DeleteOutlined key='delete' style={{color: 'red'}} onClick={handleButtonClick}/>
}

export default RemovePerson;