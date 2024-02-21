import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = props => {
    const [editMode,setEditMode] = useState(false)
    const styles = getStyles()
    const {id,make, model, personId, price, year,refetch} = props

    const handleButtonClick =() =>{
        setEditMode(!editMode)
    }
    // Function to format price as currency
    const formatPrice = (price) => {       
        return `-> $  ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    return(
        <div>
            {editMode ? (
                <UpdateCar id={id}
                make={make}
                model={model}
                personId={personId}
                price={price}
                year={year}
                onButtonClick={handleButtonClick}
                /> 
            ) : (
                <Card style={styles.card} actions={[
                <EditOutlined key='edit' onClick={handleButtonClick}/>,
                <RemoveCar id={id} refetch={refetch}/>]}>
                    {year} {make} {model} {formatPrice(price)}
                </Card>
            )}
        </div>
    )

}
const getStyles = () =>({
    card:{
        width: '950px',
        backgroundColor: "#f0f0f0", 
        margin: '10px'
    }
})
export default CarCard;