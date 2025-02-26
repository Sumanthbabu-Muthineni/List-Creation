import React from 'react';
import styled from 'styled-components';

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

  &:hover {
    background-color: #f1f1f1;
  }

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

const ListItem = ({ item, onSelect, isSelected }) => {
  return (
    <Item onClick={() => onSelect(item.id)} isSelected={isSelected}>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemDescription>{item.description}</ItemDescription>
      </ItemDetails>
    </Item>
  );
};

export default ListItem;
