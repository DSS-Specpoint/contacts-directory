import { useCallback, useReducer } from "react";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  intialValues: { [name: string]: { value: string; isValid: boolean } },
  initFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: intialValues,
    isValid: initFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: id,
        value,
        isValid,
      });
    },
    []
  );

  const setFormData = useCallback(
    (
      inputs: { [name: string]: { value: string; isValid: boolean } },
      isValid: boolean
    ) => {
      dispatch({
        type: "SET_DATA",
        inputs,
        isValid,
      });
    },
    []
  );

  return {formState, inputHandler, setFormData}
};
