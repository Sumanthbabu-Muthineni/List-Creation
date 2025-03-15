import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { moveItem } from '../../redux/slices/listSlice';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  background-color: ${({ isSelected }) => (isSelected ? '#e0f7fa' : 'transparent')};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemName = styled.strong`
  font-size: 1.2rem;
  color: #333;
`;

const ItemDescription = styled.p`
  margin: 4px 0;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MoveButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
  padding: 4px 8px;
`;

const ListItem = ({ item, isSelected, isCreatingList, listNumber }) => {
  const dispatch = useDispatch();

  const handleMoveToNewList = () => {
    const fromListId = listNumber; // Current list number
    console.log(`Moving item ${item.id} from list ${fromListId} to new list 3`);
    dispatch(moveItem({ fromListId, toListId: 3, itemId: item.id })); // Move to new list
  };

  const handleMoveToList = (toListId) => {
    const fromListId = listNumber; // Current list number
    console.log(`Moving item ${item.id} from list ${fromListId} to list ${toListId}`);
    dispatch(moveItem({ fromListId, toListId, itemId: item.id }));
  };

  return (
    <Item isSelected={isSelected}>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemDescription>{item.description}</ItemDescription>
      </ItemDetails>
      {isCreatingList && (
        <ButtonContainer>
          {/* For List 1 items - move to List 3 */}
          {listNumber === 1 && (
            <MoveButton onClick={handleMoveToNewList}>→</MoveButton>
          )}
          
          {/* For List 2 items - move to List 3 */}
          {listNumber === 2 && (
            <MoveButton onClick={handleMoveToNewList}>←</MoveButton>
          )}
          
          {/* For List 3 items - move to List 1 or List 2 */}
          {listNumber === 3 && (
            <>
              <MoveButton onClick={() => handleMoveToList(1)}>←</MoveButton>
              <MoveButton onClick={() => handleMoveToList(2)}>→</MoveButton>
            </>
          )}
        </ButtonContainer>
      )}
    </Item>
  );
};

export default ListItem;
