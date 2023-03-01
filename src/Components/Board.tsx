import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  padding: 2px 5px;
  display: flex;
`;

const Input = styled.input`
  padding: 2px 5px;
  flex: 1;
  border-radius: 5px;
  margin: 0 auto;
  box-sizing: border-box;
  display: block;
`;

const BoardMenu = styled.button`
  margin-left: auto;
`;

const BoardEditForm = styled.form`
  display: flex;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const [showToggle, setToggle] = useState(false);
  const [editing, setEditing] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onClickToggle = () => {
    setToggle((prev) => !prev);
  };
  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };
  const removeBoard = (
    event: React.MouseEvent<HTMLButtonElement>,
    boardId: string
  ) => {
    setToDos((allBoards) => {
      const { [boardId]: _, ...rest } = allBoards;
      return { ...rest };
    });
  };
  const clickEditBoard = (
    event: React.MouseEvent<HTMLButtonElement>,
    boardId: string
  ) => {
    setEditing((prev) => !prev);
  };
  return (
    <Wrapper>
      {editing ? (
        <BoardEditForm>
          <input placeholder={boardId} />
          <BoardMenu onClick={toggleEdit}>Cancel</BoardMenu>
        </BoardEditForm>
      ) : (
        <Title>{boardId}</Title>
      )}
      <button onClick={onClickToggle}>⋯</button>
      {showToggle ? (
        <>
          <button
            onClick={(event) => {
              clickEditBoard(event, boardId);
            }}
          >
            🛠️
          </button>
          <button
            onClick={(event) => {
              removeBoard(event, boardId);
            }}
          >
            🗑️
          </button>
        </>
      ) : null}
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
