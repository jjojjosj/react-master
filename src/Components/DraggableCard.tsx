import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const DeleteButton = styled.div`
  display: flex;
  float: right;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId].filter((toDo) => toDo.id !== toDoId)],
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <DeleteButton>
            <button onClick={onRemove}>🗑️</button>
          </DeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

// React.memo는 react에게 prop이 변하지 않았다면,
// DraggableCard를 다시 렌더링하지 말라고 말하는 것
export default React.memo(DraggableCard);
