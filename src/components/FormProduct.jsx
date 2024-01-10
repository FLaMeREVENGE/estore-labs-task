import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { z, object, string } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const schema = object({
  title: string().min(1).max(100),
  description: string().min(1).max(500).optional(),
  points: string().min(1).max(500).optional(),
  keywords: string().min(1).max(100).optional(),
});

const defaultValues = {
  title: "",
  description: "",
  points: "",
  keywords: "",
};

const FormProduct = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    resolver: (data) => {
      try {
        schema.parse(data);
        return {
          values: data,
          errors: {},
        };
      } catch (err) {
        return {
          values: {},
          errors: err.formErrors.fieldErrors,
        };
      }
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label className="label">Title:</Form.Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Control {...field} type="text" />
          )}
        />
        {errors.title && <p className="error-text label">Tytuł jest wymagany.</p>}
      </Form.Group>
      <Form.Group>
        <Form.Label className="label">Description:</Form.Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow" 
              className="white-background-quill"
            />
          )}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="label">Bullets:</Form.Label>
        <Controller
          name="points"
          control={control}
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="label">Keywords:</Form.Label>
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
