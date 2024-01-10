import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { z, object, string } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [points, setPoints] = useState([]); // Dodajemy stan komponentu dla punktów

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const pointsCopy = [...points]; // Skopiuj aktualne punkty
    const [movedItem] = pointsCopy.splice(source.index, 1);
    pointsCopy.splice(destination.index, 0, movedItem);
    setPoints(pointsCopy); // Zaktualizuj stan komponentu React
    setValue("points", pointsCopy); // Zaktualizuj stan "points" w formularzu
  };

  const handleAddPoint = () => {
    if (newPoint.trim() !== "") {
      const pointsCopy = [...points]; // Skopiuj aktualne punkty
      pointsCopy.push(newPoint);
      setPoints(pointsCopy); // Zaktualizuj stan komponentu React
      setValue("points", pointsCopy); // Zaktualizuj stan "points" w formularzu
      setNewPoint("");
    }
  };

  const handleRemovePoint = (indexToRemove) => {
    const pointsCopy = [...points]; // Skopiuj aktualne punkty
    pointsCopy.splice(indexToRemove, 1);
    setPoints(pointsCopy); // Zaktualizuj stan komponentu React
    setValue("points", pointsCopy); // Zaktualizuj stan "points" w formularzu
  };

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
        {errors.title && (
          <p className="error-text label">Tytuł jest wymagany.</p>
        )}
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
          <Droppable droppableId="points">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {points.map((point, index) => (
                  <Draggable
                    key={`point-${index}`} // Unikalny klucz na podstawie indeksu
                    draggableId={`point-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Controller
                          name={`points[${index}]`}
                          control={control}
                          defaultValue={point}
                          render={({ field }) => (
                            <div className="d-flex">
                              <Form.Control
                                {...field}
                                type="text"
                                className="mr-2"
                              />
                              <Button
                                variant="danger"
                                onClick={() => handleRemovePoint(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-2">
          <Form.Control
            type="text"
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            placeholder="New point..."
          />
          <Button
            variant="primary"
            className="mt-2"
            onClick={handleAddPoint}
          >
            Add Point
          </Button>
        </div>
      </Form.Group>
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default FormProduct;
