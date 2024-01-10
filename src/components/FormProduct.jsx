import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const FormProduct = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label className='label'>Title:</Form.Label>
        <Controller
        
          name="title"
          control={control}
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='label'>Description:</Form.Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Form.Control {...field} as="textarea" />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='label'>Bullets:</Form.Label>
        <Controller
          name="points"
          control={control}
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='label'>Keywords:</Form.Label>
        <Controller
          name="keywords"
          control={control}
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
      </Form.Group>
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default FormProduct;
