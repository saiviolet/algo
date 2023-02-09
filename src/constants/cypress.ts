export const TEST_INPUT = '[data-test="input"]';
export const TEST_BUTTON ='[data-test="button"]';
export const TEST_ADD_BUTTON ='[data-test="buttonAdd"]';
export const TEST_DELETE_BUTTON ='[data-test="buttonDelete"]';
export const TEST_CLEAR_BUTTON ='[data-test="buttonClear"]';
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