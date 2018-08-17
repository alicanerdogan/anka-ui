interface IPositionVector {
  height: number;
  topPosition: number;
}

interface ISerializedCache {
  dimensions: IPositionVector[];
  totalHeight: number;
}

export class ListHeightCache<T> {
  private cacheMap: { [key: string]: LinkedListNode<IPositionVector> };
  private startOfList: LinkedListNode<IPositionVector> | null;
  private totalHeight: number;
  private keyFn: (item: T) => string | number;
  private onChangeSubscribers: Array<(() => void)>;

  constructor(items: T[], keyFn: (item: T) => string, defaultHeight: number) {
    this.cacheMap = {};
    this.onChangeSubscribers = [];
    this.totalHeight = defaultHeight * items.length;
    this.keyFn = keyFn;

    this.startOfList = new LinkedListNode({
      height: defaultHeight,
      topPosition: 0
    });
    this.cacheMap[this.keyFn(items[0])] = this.startOfList;

    let node = this.startOfList;

    for (let i = 1; i < items.length; i++) {
      node.next = new LinkedListNode({
        height: defaultHeight,
        topPosition: node.value.topPosition + defaultHeight
      });
      this.cacheMap[this.keyFn(items[i])] = node.next;
      node = node.next;
    }
  }

  public subscribeOnChange(subscriber: () => void) {
    this.onChangeSubscribers.push(subscriber);
  }

  public unsubscribeOnChange(subscriber: () => void) {
    this.onChangeSubscribers = this.onChangeSubscribers.filter(
      fn => fn !== subscriber
    );
  }

  public serialize(): ISerializedCache {
    return {
      dimensions: Object.keys(this.cacheMap).map(k => this.cacheMap[k].value),
      totalHeight: this.getTotalHeight()
    };
  }

  public getTotalHeight(): number {
    return this.totalHeight;
  }

  public getHeight(item: T): number {
    const node = this.cacheMap[this.keyFn(item)];
    return node.value.height;
  }

  public getTopPosition(item: T): number {
    const node = this.cacheMap[this.keyFn(item)];
    return node.value.topPosition;
  }

  public setHeight(item: T, height: number): void {
    const node = this.cacheMap[this.keyFn(item)];
    const heightDiff = height - (node ? node.value.height : 0);
    if (heightDiff === 0) {
      return;
    }
    node.value.height = height;
    this.totalHeight += heightDiff;
    let nextNode = node.next;
    while (nextNode !== null) {
      nextNode.value.topPosition += heightDiff;
      nextNode = nextNode.next;
    }

    this.notifyOnChangeSubscribers();
  }

  public findTopPositionIndex(topPosition: number): number {
    let i = 0;
    let node = this.startOfList;
    while (node && node.value.topPosition <= topPosition) {
      node = node.next;
      i += 1;
    }
    return i === 0 ? 0 : i - 1;
  }

  public getItemIndexByPosition(position: number): number | null {
    let node = this.startOfList;
    let index = 0;
    while (node && node.value.topPosition < position) {
      index += 1;
      node = node.next;
    }
    if (!node) {
      return null;
    }
    if (node.value.topPosition !== position) {
      index -= 1;
    }
    return index;
  }

  public getItemVectorByPosition(position: number): IPositionVector | null {
    const targetIndex = this.getItemIndexByPosition(position);
    if (targetIndex === null) {
      return null;
    }
    let node = this.startOfList;
    let index = 0;
    while (node && index !== targetIndex) {
      index += 1;
      node = node.next;
    }
    return node ? node.value : null;
  }

  public updateItems(items: T[], defaultHeight: number) {
    let previousNode: LinkedListNode<IPositionVector> | null = null;
    let startNode: LinkedListNode<IPositionVector> | null = null;

    items.forEach(item => {
      let node: LinkedListNode<IPositionVector> | null = this.cacheMap[
        this.keyFn(item)
      ];

      if (!node) {
        const topPosition =
          previousNode === null
            ? 0
            : previousNode.value.topPosition + previousNode.value.height;
        node = new LinkedListNode({
          height: defaultHeight,
          topPosition
        });
        this.cacheMap[this.keyFn(item)] = node;
      }

      if (!previousNode) {
        startNode = node;
      } else {
        previousNode.next = node;
      }

      previousNode = node;
    });

    this.startOfList = startNode;

    this.recalculateTopPositions();
  }

  public prependItems(items: T[], defaultHeight: number) {
    this.totalHeight += defaultHeight * items.length;

    const startOfList = new LinkedListNode({
      height: defaultHeight,
      topPosition: 0
    });
    this.cacheMap[this.keyFn(items[0])] = startOfList;

    let node = startOfList;
    for (let i = 1; i < items.length; i++) {
      node.next = new LinkedListNode({
        height: defaultHeight,
        topPosition: node.value.topPosition + defaultHeight
      });
      this.cacheMap[this.keyFn(items[i])] = node.next;
      node = node.next;
    }

    const lastNode = node;

    const heightDiff = node.value.topPosition;
    node = this.startOfList as LinkedListNode<IPositionVector>;
    while (node !== null) {
      node.value.topPosition += heightDiff;
      node = node.next as LinkedListNode<IPositionVector>;
    }

    lastNode.next = this.startOfList;
    this.startOfList = startOfList;

    this.notifyOnChangeSubscribers();
  }

  private notifyOnChangeSubscribers() {
    this.onChangeSubscribers.forEach(fn => fn && fn());
  }

  private recalculateTopPositions() {
    let prevNode = this.startOfList as LinkedListNode<IPositionVector>;
    let node = prevNode.next;

    while (node) {
      node.value.topPosition =
        prevNode.value.height + prevNode.value.topPosition;
      prevNode = node;
      node = node.next;
    }

    this.totalHeight = prevNode.value.topPosition + prevNode.value.height;
  }
}

// tslint:disable-next-line:max-classes-per-file
class LinkedListNode<T> {
  public next: LinkedListNode<T> | null;
  public value: T;
  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}
