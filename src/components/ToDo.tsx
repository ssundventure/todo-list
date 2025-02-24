import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoriesSelector, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const ListItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 24px;
  font-weight: bolder;
  margin-right: 5px;
`;

const Button = styled.button`
  background-color: #9c88ff;
  color: #fff;
  border-radius: 50px;
  border: none;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 2px;
  &:hover {
    background-color: #8c78ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesSelector);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <ListItem>
      <Label>- {text}</Label>
      <div>
        {categories.map((availableCategory) =>
          category !== availableCategory ? (
            <Button
              key={availableCategory}
              name={availableCategory}
              onClick={onClick}
            >
              {availableCategory}
            </Button>
          ) : null
        )}
      </div>
    </ListItem>
  );
}

export default ToDo;
