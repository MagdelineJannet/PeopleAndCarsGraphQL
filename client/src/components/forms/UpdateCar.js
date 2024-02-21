import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd"
import { useEffect,useState } from "react";
import { UPDATE_CAR } from "../../graphql/queries";

const UpdateCar =props => {
const {id, make, model, personId, price, year, onButtonClick} = props
const [form] = Form.useForm()
const [, forceUpdate] = useState();

const [updateCar] = useMutation(UPDATE_CAR)

useEffect(()=>{
    forceUpdate()
},[])

const onFinish = values => {
    const { make, model, personId, price, year} = values
    const updatedCar = {
        id: id,
        make: make,
        model: model,
        price: parseFloat(price),
        year: parseInt(year)
    }
    updateCar({
        variables: {
            id,
            make,
            model,
            price: parseFloat(price), // Convert price to float
            year: parseInt(year) // Convert year to integer
        }
    })
    props.onButtonClick()
}

return(
    <Form name='update-car-form'
    layout = "inline"
    form={form}
    onFinish={onFinish}
    initialValues={{
        make, model, personId, price, year
    }}
    >


<Form.Item
                // label="Year" 
                name='year'
                rules={[{required:true, message:"Please Enter Year"}]}
                >
                    <Input placeholder="Year"  style={{ width: '100px' }}/>
                </Form.Item>

                <Form.Item
                // label="Make" 
                name='make'
                rules={[{required:true, message:"Please Enter Make"}]}
                >
                    <Input placeholder="Make" style={{ width: '150px' }}/>
                </Form.Item>

                <Form.Item
                // label="Model" 
                name='model'
                rules={[{required:true, message:"Please Enter Model"}]}
                >
                    <Input placeholder="Model" style={{ width: '150px' }}/>
                </Form.Item>

                <Form.Item
                // label="Price" 
                name='price'
                rules={[{required:true, message:"Please Enter Price"}]}
                >
                    <Input addonBefore="$" style={{ width: '100px' }}/>
                </Form.Item>       

                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            // disabled={
                            //     (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            //     form.getFieldsError().filter(({errors}) => errors.length).length
                            // }
                        >
                            Update Car
                        </Button>
                    )}
                </Form.Item>
                <Button onClick={onButtonClick}>Cancel</Button>

    </Form>
)
}
export default UpdateCar