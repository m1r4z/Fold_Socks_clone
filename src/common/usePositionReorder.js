import { useState, useRef } from 'react';
import { clamp, distance } from '@popmotion/popcorn';
import move from './move';

export const findIndex = (i, yOffset, positions) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset = distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};

export function usePositionReorder(initialState) {
  console.log('!!');
  const [order, setOrder] = useState(initialState);

  const positions = useRef([]).current;
  const updatePosition = (i, offset) => {
    positions[i] = offset;
  };

  const updateOrder = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setOrder(move(order, i, targetIndex));
  };

  return [order, updatePosition, updateOrder];
}

const buffer = 30;
