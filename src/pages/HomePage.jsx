import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../redux/slices/listSlice';
import Loader from '../components/Loader/Loader';
import ErrorView from '../components/ErrorView/ErrorView';
import ListContainer from '../components/ListContainer/ListContainer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  text-align: left;
  color: #343a40;
  margin-bottom: 20px;
`;

const Frame = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #F2F7FC;
`;

const ScrollableListContainer = styled.div`  width: 50%;
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;
`;

const CreateListButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { lists = [], status, error } = useSelector((state) => state.list);
  const [selectedLists, setSelectedLists] = useState([]);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const handleListSelection = (listId) => {
    setSelectedLists((prev) =>
      prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]
    );
  };

  const handleCreateList = () => {
    if (selectedLists.length !== 2) {
      alert('You should select exactly 2 lists to create a new list');
      return;
    }
   
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <ErrorView error={error} />;

  const list1 = lists.filter((list) => list.list_number === 1);
  const list2 = lists.filter((list) => list.list_number === 2);

  return (
    <Container>
      <Title>List Creation</Title>
      <CreateListButton onClick={handleCreateList}>Create a new list</CreateListButton>
      <Frame>
        <ScrollableListContainer>
          <ListContainer
            listNumber={1}
            items={list1}
            onSelect={handleListSelection}
            selected={selectedLists}
          />
        </ScrollableListContainer>
        <ScrollableListContainer>
          <ListContainer
            listNumber={2}
            items={list2}
            onSelect={handleListSelection}
            selected={selectedLists}
          />
        </ScrollableListContainer>
      </Frame>
    </Container>
  );
};

export default HomePage;
