import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { z, object, string } from "zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faTimes,
  faFileImport,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from "react-select/creatable";
import keywordOptions from "../utils/keywords";

const schema = object({
  title: string().min(1).max(100),
  description: string().min(1).max(500).optional(),
});

const defaultValues = {
  title: "",
  description: "",
  keywords: [],
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <Form.Group>
        <Form.Label className="label">Title:</Form.Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Control className="input" {...field} type="text" />
          )}
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
                            <FontAwesomeIcon icon={faGrip} className="bars" />
                          </div>
                          <Controller
                            name={`points[${index}]`}
                            control={control}
                            value={point}
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                type="text"
                                className="input"
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
                            onClick={() => handleRemovePoint(index)}
                            className="remove"
                          >
                            <FontAwesomeIcon icon={faTimes} />
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
        <div className="mt-2 d-flex">
          <Button variant="primary" onClick={handleAddPoint} className="add">
            <FontAwesomeIcon icon={faPlus} className="add__icon" />
          </Button>
          <Form.Control
            className="input"
            type="text"
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label className="label">Keywords:</Form.Label>
        <Controller
          name="keywords"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isMulti
              onChange={(value) => field.onChange(value)}
              options={keywordOptions}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "transparent",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "black",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? "rgba(255, 255, 255, 0.3)"
                    : "transparent",
                }),
              }}
            />
          )}
        />
      </Form.Group>
      <Button className="w-100 mt-5 send" type="submit">
        <FontAwesomeIcon icon={faFileImport} className="send__icon" /> Send
      </Button>
    </Form>
  );
};

export default FormProduct;
