import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { List } from "antd"
import PeopleCard from "../listItems/PeopleCard";
import AddCar from "../forms/AddCar";

const People = () => {
    const styles = getStyles()

    const {loading,error,data} = useQuery(GET_PEOPLE)

    if(loading) return 'Loading...'
    if(error) return `Error! ${error.message}`

   

return (
    <div>
         {data.people.length > 0 && <AddCar />} 
         {data.people.length > 0 && <h3 style={styles.heading}>Records</h3>}        
        <List grid={{gutter:20, column:1}} style={styles.list}>
            {data.people.map(({id, firstName, lastName}) => (
                <List.Item key={id}>
                    <PeopleCard
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    />
                </List.Item>
            ))}
        </List>
    </div>
)

}
const getStyles = () =>({
    list:{
        display: 'flex',
        justifyContent: 'center'
    },
    heading: {
        textAlign: 'center' // Center align the heading
    }
})
export default People;