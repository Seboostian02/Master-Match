import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import React from "react";

export default function Column({ list }) {
  return (
    <Droppable droppableId="col-1">
      {(provided) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "8px",
            backgroundColor: "lightblue",
            borderRadius: "4px",
            minHeight: "100px",
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {list.map((text, index) => (
            <Item key={text} text={text} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
