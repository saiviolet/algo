export const TEST_INPUT = '[data-test="input"]';
export const TEST_BUTTON ='[data-test="button"]';
export const TEST_ADD_BUTTON ='[data-test="buttonAdd"]';
export const TEST_DELETE_BUTTON ='[data-test="buttonDelete"]';
export const TEST_CLEAR_BUTTON ='[data-test="buttonClear"]';
// кнопки для списка
export const ADD_TO_HEAD_BUTTON ='[data-test="buttonAddToHead"]';
export const ADD_TO_TAIL_BUTTON ='[data-test="buttonAddToTail"]';
export const ADD_BY_INDEX_BUTTON ='[data-test="buttonAddByIndex"]';
export const DELETE_FROM_HEAD_BUTTON ='[data-test="buttonDeleteFromHead"]';
export const DELETE_FROM_TAIL_BUTTON ='[data-test="buttonDeleteFromTail"]';
export const DELETE_BY_INDEX_BUTTON ='[data-test="buttonDeleteByIndex"]';
// INPUTS для списка
export const INPUT_INDEX = '[data-test="inputIndex"]';
export const INPUT_VALUE = '[data-test="inputValue"]';
export const TEST_CIRCLE = '[data-test="circle"]';
export enum TEST_BORDER_COLOR {
  Default = "4px solid rgb(0, 50, 255)",
  Changing = "4px solid rgb(210, 82, 225)",
  Modified = "4px solid rgb(127, 224, 81)",
};

export const TEST_STRING_ANIMATIONS = [
  [
    TEST_BORDER_COLOR.Default,
    TEST_BORDER_COLOR.Default,
    TEST_BORDER_COLOR.Default
  ],
  [
    TEST_BORDER_COLOR.Changing,
    TEST_BORDER_COLOR.Default,
    TEST_BORDER_COLOR.Changing
  ],
  [
    TEST_BORDER_COLOR.Modified,
    TEST_BORDER_COLOR.Default,
    TEST_BORDER_COLOR.Modified
  ],
  [
    TEST_BORDER_COLOR.Modified,
    TEST_BORDER_COLOR.Modified,
    TEST_BORDER_COLOR.Modified
  ],
]
export const TEST_STRING = '123';
export const TEST_STRING_ARRAY = ['1','2','3'];
export const TEST_REVERT_STRING_ARRAY = ['3','2','1'];

export const TEST_FIB_ARRAY = ['1','1','2','3','5'];
export const TEST_STACK_VALUES = ['1','2','3'];
export const TEST_QUEUE_VALUES = ['A','B','C','D'];