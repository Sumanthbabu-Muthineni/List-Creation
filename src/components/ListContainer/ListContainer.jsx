import React from 'react';
import styled from 'styled-components';
import ListItem from '../ListItem/ListItem';


const Container = styled.div`
  margin: 10px 0;
  padding:10px;
`;

const Title = styled.h3`
  margin-bottom: 12px;
  font-size: 1rem;
  color: #333;
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px; 
`;


const ListContainer = ({ listNumber, items = [], onSelect, selected, onMoveToNewList, isCreatingList }) => {
  const itemsToRender = Array.isArray(items) ? items : [];
  
  console.log(`List ${listNumber} received items:`, items);
  console.log(`List ${listNumber} rendering items:`, itemsToRender);
  
  return (
    <Container>
      <CheckboxLabel>
        <input
          type="checkbox"
          checked={selected.includes(listNumber)}
          onChange={() => onSelect(listNumber)}
        />
        <Title>List {listNumber}</Title>
      </CheckboxLabel>
      
      {itemsToRender.length > 0 ? (
        itemsToRender.map((item) => (
          <Card key={item.id}>
            <ListItem
              item={item}
              listNumber={listNumber}
              onSelect={onMoveToNewList}
              isSelected={selected.includes(item.id)}
              isCreatingList={isCreatingList}
            />
          </Card>
        ))
      ) : (
        <Card>No items in this list</Card>
      )}
    </Container>
  );
};

export default ListContainer;
