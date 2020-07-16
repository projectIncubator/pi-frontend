import { v4 as uuid } from 'uuid';

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const copy = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, {
    ...item,
    id: uuid(),
    content: { ...item.content }
  });
  return destClone;
};

export const checkUniqueness = (item, components) => {
  // return true to disable drag component
  if (item.unique) {
    const result = components.find((el) => el.type === item.type);
    return Boolean(result);
  }
  return false;
};
