import { useQuery } from "@apollo/client";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../graphql/queries";
import React,{useEffect} from "react";
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams(); // Use useParams hook to get route parameters

  const { loading, error, data,refetch } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id }, // Pass the personId variable
  });

  useEffect(() => {
    refetch();
  }, [id]); // refetch when id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { personWithCars } = data;
  const { person, cars } = personWithCars;

  const formatPrice = (price) => {
    return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatPrice(price),
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Link to="/"><Button type="primary">Go back home</Button></Link>
      </div>
      <h2 style={styles.header}>Person : {person.firstName} {person.lastName}</h2>
      <div style={styles.tableContainer}>
        <h3 style={styles.header}>Cars Owned</h3>
        <Table dataSource={cars} columns={columns} pagination={false}/>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  tableContainer: {
    marginBottom: '20px',
  },
};

export default ViewDetails;
