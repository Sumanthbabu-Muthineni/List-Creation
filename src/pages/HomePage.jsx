import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, moveItem } from '../redux/slices/listSlice';
import Loader from '../components/Loader/Loader';
import ErrorView from '../components/ErrorView/ErrorView';
import ListContainer from '../components/ListContainer/ListContainer';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: #343a40;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #F2F7FC;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }

  @media (min-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1200px) {
    height: 600px;
  }
`;

const ScrollableListContainer = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CreateListButton = styled.button`
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
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListItems, setNewListItems] = useState([]);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  // Debug the lists data
  useEffect(() => {
    console.log('Current lists from API:', lists);
    if (lists.length > 0) {
      console.log('First list structure:', JSON.stringify(lists[0], null, 2));
      console.log('List numbers available:', lists.map(list => list.list_number || list.id));
    }
  }, [lists]);

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
    setIsCreatingList(true);
    setNewListItems([]);
  };

  const handleMoveToNewList = (item, fromListId) => {
    console.log('Moving to new list:', { item, fromListId });
    dispatch(moveItem({ fromListId, toListId: 3, itemId: item.id }));
  };

  const handleMoveToOriginalList = (item, toListId) => {
    console.log('Moving to original list:', { item, toListId });
    dispatch(moveItem({ fromListId: 3, toListId, itemId: item.id }));
  };

  const handleCancel = () => {
    setIsCreatingList(false);
    setSelectedLists([]);
    setNewListItems([]);
  };

  const handleUpdate = () => {
    // When update is clicked, we keep the items in list3 where they are
    // This effectively saves the current state
    setIsCreatingList(false);
    setSelectedLists([]);
    setNewListItems([]);
    
    console.log('List updated successfully');
  };

  if (status === 'loading') return <Loader />;
  if (status === 'failed') return <ErrorView error={error} />;

  // Filter lists by list_number
  const list1 = lists.find(list => list.list_number === 1) || { id: 1, list_number: 1, items: [] };
  const list2 = lists.find(list => list.list_number === 2) || { id: 2, list_number: 2, items: [] };
  const list3 = lists.find(list => list.list_number === 3) || { id: 3, list_number: 3, items: [] };

  console.log('List 1 items:', list1.items);
  console.log('List 2 items:', list2.items);
  console.log('List 3 items:', list3.items);

  return (
    <>
      <CenteredContainer>
        <Title>{isCreatingList ? 'List Creation' : 'List Selection'}</Title>
        <ButtonContainer>
          {isCreatingList ? (
            <>
              <CreateListButton onClick={handleUpdate}>Update</CreateListButton>
              <CreateListButton onClick={handleCancel}>Cancel</CreateListButton>
            </>
          ) : (
            <CreateListButton onClick={handleCreateList}>Create a new list</CreateListButton>
          )}
        </ButtonContainer>
      </CenteredContainer>
      <Frame>
        <ScrollableListContainer>
          <ListContainer
            listNumber={1}
            items={list1.items}
            onSelect={handleListSelection}
            selected={selectedLists}
            onMoveToNewList={handleMoveToNewList}
            isCreatingList={isCreatingList}
          />
        </ScrollableListContainer>
        {isCreatingList && (
          <ScrollableListContainer>
            <ListContainer
              listNumber={3}
              items={list3.items}
              onSelect={handleMoveToOriginalList}
              selected={[]}
              isCreatingList={isCreatingList}
            />
          </ScrollableListContainer>
        )}
        <ScrollableListContainer>
          <ListContainer
            listNumber={2}
            items={list2.items}
            onSelect={handleListSelection}
            selected={selectedLists}
            onMoveToNewList={handleMoveToNewList}
            isCreatingList={isCreatingList}
          />
        </ScrollableListContainer>
      </Frame>
    </>
  );
};

export default HomePage;
