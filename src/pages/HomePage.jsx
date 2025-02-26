import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../redux/slices/listSlice';
import Loader from '../components/Loader/Loader';
import ErrorView from '../components/ErrorView/ErrorView';
import ListContainer from '../components/ListContainer/ListContainer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const CreateListButton = styled.button`
  display: block; 
  margin: 20px auto; 
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
    <div>
      <Title>List Creation</Title>
      <CreateListButton onClick={handleCreateList}>Create a new list</CreateListButton>
      <Container>
        <div style={{ width: '48%' }}>
          <ListContainer
            listNumber={1}
            items={list1}
            onSelect={handleListSelection}
            selected={selectedLists}
          />
        </div>
        <div style={{ width: '48%' }}>
          <ListContainer
            listNumber={2}
            items={list2}
            onSelect={handleListSelection}
            selected={selectedLists}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;