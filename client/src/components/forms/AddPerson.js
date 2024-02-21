import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
// import Input from "antd/es/input/Input";
import {Button, Form, Input} from "antd"
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";

const AddPerson = ( ) => {
    const [id,setId] = useState(uuidv4())
    const [form] = Form.useForm();    
    const [, forceUpdate] = useState();

    const [addPerson] = useMutation(ADD_PERSON)
    useEffect(() => {
        forceUpdate({})
    },[])

    const onFinish = values => {
        const {firstName, lastName} = values
        const newPerson = {
            id: id,
            firstName: firstName,
            lastName: lastName
        }
       
        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, {data: { addPerson }}) => {
                const data = cache.readQuery({query: GET_PEOPLE})
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, newPerson]
                    }
                })
                setId(uuidv4())
            }
        })
       
    }

    return(
        <div style={{ display: 'flex',flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ marginBottom: '10px' }}>
                <h3>Add Person</h3>
            </div>
            <Form name='add-person-form' layout='inline' size="large" style={{marginBottom : '40px'}} form={form}
            onFinish={onFinish}>
                <Form.Item
                label="First Name" 
                name='firstName'
                rules={[{required:true, message:"Please Enter First Name"}]}
                >
                    <Input placeholder="First Name"/>
                </Form.Item>
                <Form.Item
                label="Last Name" 
                name='lastName'
                rules={[{required:true, message:"Please Enter Last Name"}]}
                >
                    <Input placeholder="Last Name"/>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) || form.getFieldsError().filter(({errors}) => errors.length).length
                            }
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPerson;