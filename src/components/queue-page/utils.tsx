import {circles, wait} from "../../utils/utils";
import {IQueuePage, TQueueAnimation} from "../../types/components";
import {ElementStates} from "../../types/element-states";

const queueLength = 6;
export const initialCircles = circles(queueLength);
export const initialState:IQueuePage = {
  inputValue: '',
  buttonLoaders: {
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  },
  buttonBlocks: {
    addBtn: true,
    deleteBtn: false,
    clearBtn: false,
  },
  circles: JSON.parse(JSON.stringify(initialCircles)),
};

export const queueAnimation:TQueueAnimation = async (queue, updateState, state, type) => {
  const queueArr = queue.getArray();
  const queueTail = queue.getTail() - 1;
  const queueHead = queue.getHead();
  const queueArrLength = queueArr.length - 1;
  const queueSize = queue.getSize();
  if(type === 'add') {
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueArrLength) {
          circle.state = ElementStates.Changing;
        };
        if(index === queueTail) circle.tail = 'tail';
        if(index === queueHead) circle.head = 'head';
        return circle;
      }),
      buttonBlocks: {...state.buttonBlocks, addBtn: false, deleteBtn: true, clearBtn: true},
      buttonLoaders: {...state.buttonLoaders, addBtn: true},
    });
    await wait(1000);
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueTail) circle.tail = 'tail';
        if(index === queueHead) circle.head = 'head';
        return circle;
      }),
      buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: false},
      buttonLoaders: {...state.buttonLoaders, addBtn: false},
    });
  }
  if(type === 'delete') {
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueHead) {
          circle.state = ElementStates.Changing;
          circle.head = 'head';
        };
        if(index === queueTail) circle.tail = 'tail';
        return circle;
      }),
      buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: true},
      buttonLoaders: {...state.buttonLoaders, deleteBtn: true},
    });
    await wait(1000);
    updateState({inputValue: '',
      circles: state.circles.map((circle, index) => {
        circle.letter = queueArr[index];
        circle.tail = '';
        circle.head = '';
        circle.state = ElementStates.Default;
        if(index === queueTail) circle.tail = 'tail';
        if(index === queueHead) circle.head = 'head';
        return circle;
      }),
      buttonBlocks: {...state.buttonBlocks, addBtn: false, deleteBtn: false, clearBtn: false},
      buttonLoaders: {...state.buttonLoaders, deleteBtn: false},
    });
  }
}