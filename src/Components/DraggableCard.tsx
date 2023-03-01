import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const EditButton = styled.div`
  margin-left: auto;
`;

const DeleteButton = styled.div``;

const Form = styled.form`
  display: inline-block;
  border-radius: 5px;
  padding: 1px 0px;
`;

const Input = styled.input`
  box-sizing: border-box;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

interface IForm {
  toDo: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const [editing, setEdit] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId].filter((toDo) => toDo.id !== toDoId)],
      };
    });
  };
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const editToDo = {
      id: toDoId,
      text: toDo,
    };
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[boardId]];
      boardCopy[index] = editToDo;
      return {
        ...allBoards,
        [boardId]: boardCopy,
      };
    });
    setValue("toDo", "");
    setEdit((prev) => false);
  };
  const onEdit = () => {
    setEdit((prev) => true);
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
          {editing ? (
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`${toDoText}`}
              />
            </Form>
          ) : (
            toDoText
          )}
          <EditButton>
            <button onClick={onEdit}>🛠️</button>
          </EditButton>
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
