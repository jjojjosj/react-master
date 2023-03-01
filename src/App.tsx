import { useRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./Components/Board";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

interface IBoardName {
  boardId: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [addingBoard, setToggle] = useState(false);
  const { register, setValue, handleSubmit } = useForm<IBoardName>();

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  const addBoard = ({ boardId }: IBoardName) => {
    if (boardId in toDos) return;
    setToDos((allBoards) => {
      const newEmptyBoard: IToDoState = { [boardId]: [] };
      return {
        ...allBoards,
        ...newEmptyBoard,
      };
    });
    setToggle((prev) => !prev);
    setValue("boardId", "");
  };
  const onClickAddBoard = () => {
    setToggle((prev) => !prev);
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Trello Clone</title>
      </Helmet>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          {addingBoard ? (
            <form onSubmit={handleSubmit(addBoard)}>
              <input
                {...register("boardId", { required: true })}
                type="text"
                placeholder="Enter new board name"
              />
            </form>
          ) : (
            <button onClick={onClickAddBoard}>➕</button>
          )}
        </Boards>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
