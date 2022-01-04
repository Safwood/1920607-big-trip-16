import AbstractView from 'view/abstract-view';

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    return;
  }

  component.element.remove();
  component.removeElement();
};

export const removeElement = (array, element) => {
  if (element === null) {
    return;
  }

  return array.filter((item) => item.id !== element.id);
};
