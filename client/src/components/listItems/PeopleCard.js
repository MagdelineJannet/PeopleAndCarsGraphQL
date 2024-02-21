import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined} from "@ant-design/icons";
import PeopleAndCar from "../lists/PeopleAndCar";
import { Link } from 'react-router-dom';

const PeopleCard = props => {
    const [editMode,setEditMode] = useState(false)
    const styles = getStyles()
    const {id,firstName,lastName} = props

    const handleButtonClick =() =>{
        setEditMode(!editMode)
    }
    return(
        <div>
            {editMode ? (
                <UpdatePerson id={id}
                firstName={firstName}
                lastName={lastName}
                onButtonClick={handleButtonClick}
                /> 
            ) : (
                
                <Card style={styles.card} actions={[
                <EditOutlined key='edit' onClick={handleButtonClick}/>,
                <RemovePerson id={id} />]}>
                    <b>{firstName} {lastName}</b>
                    <br/><br/>
                    <PeopleAndCar personId ={id}/>  <br/>                 
                    <Link to={`/people/${id}`}>Learn More</Link>
                </Card>
            )}
        </div>
    )

}
const getStyles = () =>({
    card:{
        width: '1000px'
    }
})
export default PeopleCard;