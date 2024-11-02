// src/hooks/use-flat-category-store.ts
import { nanoid } from "nanoid";
import { useCallback, useReducer } from "react";
var useFlatCategoryStore = () => {
  const [elements, dispatch] = useReducer(flatCategoryStoreReducer, /* @__PURE__ */ new Map());
  const addElement = useCallback((value, categories) => {
    const newId = nanoid();
    dispatch({
      type: "ADD_ELEMENT",
      value,
      id: newId,
      categories
    });
    return newId;
  }, []);
  const removeElement = useCallback((id) => {
    dispatch({ type: "REMOVE_ELEMENT", id });
  }, []);
  const allElements = useCallback(
    (categories) => {
      const categoriesSet = new Set(categories);
      const result = [];
      elements.forEach((element) => {
        if (setsHaveIntersection(categoriesSet, element.categories)) {
          result.push(element.value);
        }
      });
      return result;
    },
    [elements]
  );
  return { addElement, removeElement, allElements };
};
var use_flat_category_store_default = useFlatCategoryStore;
function flatCategoryStoreReducer(state, action) {
  switch (action.type) {
    case "ADD_ELEMENT": {
      const { value, id, categories } = action;
      const newElement = {
        id,
        value,
        categories: new Set(categories)
      };
      const newState = new Map(state);
      newState.set(id, newElement);
      return newState;
    }
    case "REMOVE_ELEMENT": {
      const newState = new Map(state);
      newState.delete(action.id);
      return newState;
    }
    default:
      return state;
  }
}
function setsHaveIntersection(setA, setB) {
  const [smallerSet, largerSet] = setA.size <= setB.size ? [setA, setB] : [setB, setA];
  for (let item of smallerSet) {
    if (largerSet.has(item)) {
      return true;
    }
  }
  return false;
}

export {
  use_flat_category_store_default
};
//# sourceMappingURL=chunk-YULKJPY3.mjs.map