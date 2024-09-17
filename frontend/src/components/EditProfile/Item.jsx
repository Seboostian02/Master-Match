import { Draggable } from "react-beautiful-dnd";

export default function Item({ text, index }) {
  return (
    <Draggable draggableId={`${text}-${index}`} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: '8px',
            marginBottom: '4px',
            backgroundColor: 'lightgrey',
            borderRadius: '4px',
            ...provided.draggableProps.style
          }}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
}
