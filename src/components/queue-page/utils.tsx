import {circles, wait} from "../../utils/utils";
import {IQueue, IQueuePage, TQueueAnimation} from "../../types/components";
import {ElementStates} from "../../types/element-states";
export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private size = -1;
  enqueue(item: T): void {
    this.container[this.tail++] = item;
    this.size++;
    if(this.size > 6 || this.head >=6) {
      throw new Error('Мест в очереди больше нет');
    }
  };

  dequeue(): void {
    if(this.size < 0) {
      throw new Error('Удалять нечего ');
    }
    this.size--;
    // this.container.shift();
    if (this.tail === this.head) this.tail = 0;
    delete this.container[this.head++];
    if(this.size < 0) {
      this.head = this.head-1;
      this.tail = this.tail-1;
    }
  };

  clear(): void{
    this.container = [];
  };

  getArray():T[] {
    return this.container;
  }
  getTail():number {
    return this.tail;
  }
  getHead(): number {
    return this.head;
  }
  getSize(): number {
    return this.size;
  }

};

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

export const queueAnimation:TQueueAnimation = async (queue, updateState, type, state) => {
  const queueArr = queue.getArray();
  const queueTail = queue.getTail() - 1;
  const queueHead = queue.getHead();
  const queueArrLength = queueArr.length - 1;
  const queueSize = queue.getSize();

  switch (type) {
    case 'add':
      updateState({inputValue: '',
        circles: state!.circles.map((circle, index) => {
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
        buttonBlocks: {...state!.buttonBlocks, addBtn: false, deleteBtn: true, clearBtn: true},
        buttonLoaders: {...state!.buttonLoaders, addBtn: true},
      });
      await wait(1000);
      updateState({inputValue: '',
        circles: state!.circles.map((circle, index) => {
          circle.letter = queueArr[index];
          circle.tail = '';
          circle.head = '';
          circle.state = ElementStates.Default;
          if(index === queueTail) circle.tail = 'tail';
          if(index === queueHead) circle.head = 'head';
          return circle;
        }),
        buttonBlocks: {...state!.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: false},
        buttonLoaders: {...state!.buttonLoaders, addBtn: false},
      });
      break;
    case 'delete':
      updateState({inputValue: '',
        circles: state!.circles.map((circle, index) => {
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
        buttonBlocks: {...state!.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: true},
        buttonLoaders: {...state!.buttonLoaders, deleteBtn: true},
      });
      await wait(1000);
      updateState({inputValue: '',
        circles: state!.circles.map((circle, index) => {
          circle.letter = queueArr[index];
          circle.tail = '';
          circle.head = '';
          circle.state = ElementStates.Default;
          if(index === queueTail) circle.tail = 'tail';
          if(index === queueHead) circle.head = 'head';
          return circle;
        }),
        buttonBlocks: {...state!.buttonBlocks, addBtn: false, deleteBtn: false, clearBtn: false},
        buttonLoaders: {...state!.buttonLoaders, deleteBtn: false},
      });
      break;
    case 'clear':
      updateState({circles: initialCircles });
      break;
    default:
      alert( "LOL" );
  }
}