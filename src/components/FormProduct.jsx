import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { z, object, string } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const schema = object({
  title: string().min(1).max(100),
  description: string().min(1).max(500).optional(),
  keywords: string().min(1).max(100).optional(),
});

const defaultValues = {
  title: "",
  description: "",
  keywords: "",
  points: [],
};

const FormProduct = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
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

  const [newPoint, setNewPoint] = useState("");
  const [points, setPoints] = useState({ list: [], counter: 0 });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const pointsCopy = [...points.list];
    const [movedItem] = pointsCopy.splice(source.index, 1);
    pointsCopy.splice(destination.index, 0, movedItem);
    setPoints({ list: pointsCopy, counter: points.counter + 1 });
    setValue("points", pointsCopy);
  };

  const handleAddPoint = () => {
    if (newPoint.trim() !== "") {
      const pointsCopy = [...points.list];
      pointsCopy.push(newPoint);
      setPoints({ list: pointsCopy, counter: points.counter + 1 });
      setValue("points", pointsCopy);
      setNewPoint("");
    }
  };

  const handleRemovePoint = (indexToRemove) => {
    const pointsCopy = [...points.list];
    pointsCopy.splice(indexToRemove, 1);
    setPoints({ list: pointsCopy, counter: points.counter + 1 });
    setValue("points", pointsCopy);
  };

  useEffect(() => {
    // Tutaj możesz dodać dowolny kod, który chcesz wykonać po zmianie kolejności elementów.
  }, [points.counter]);

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
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
        {errors.title && <p className="error-text label">Title is required</p>}
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
        <Form.Label className="label">Keywords:</Form.Label>
        <Controller
          name="keywords"
          control={control}
          render={({ field }) => <Form.Control {...field} type="text" />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="label">Bullets:</Form.Label>
        <DragDropContext onDragEnd={onDragEnd}>
          {points.list.map((point, index) => (
            <Droppable
              key={`droppable-${index}`}
              droppableId={`droppable-${index}`}
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable
                    key={`draggable-${point}`}
                    draggableId={`draggable-${point}`}
                    index={index}
                  >
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="d-flex">
                          <div
                            className="drag-handle"
                            {...provided.dragHandleProps}
                          >
                            <FontAwesomeIcon icon={faBars} />
                          </div>
                          <Controller
                            name={`points[${index}]`}
                            control={control}
                            value={point}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                className="mr-2"
                                onChange={(e) => {
                                  field.onChange(e);
                                  const updatedPoints = [...points.list];
                                  updatedPoints[index] = e.target.value;
                                  setPoints({
                                    list: updatedPoints,
                                    counter: points.counter + 1,
                                  });
                                  setValue("points", updatedPoints);
                                }}
                              />
                            )}
                          />
                          <Button
                            variant="danger"
                            onClick={() => handleRemovePoint(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        <div className="mt-2">
          <Form.Control
            type="text"
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            placeholder="New point..."
          />
          <Button variant="primary" className="mt-2" onClick={handleAddPoint}>
            Add Point
          </Button>
        </div>
      </Form.Group>
      <Button className="w-100 mt-3" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default FormProduct;
