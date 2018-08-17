// tslint:disable-next-line:no-submodule-imports
import throttle from "lodash-es/throttle";
import * as React from "react";
import Measure, { BoundingRect, ContentRect } from "react-measure";
import { ListHeightCache } from "./ListHeightCache";

if (document) {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(`
  .list {
    position: relative;
    overflow: auto;
    will-change: transform;
  }
  
  .list > .wrapper {
    overflow: hidden;
  }
  
  .list > .wrapper > .item {
    position: absolute;
    width: 100%;
  }
  
  .list > .measurer {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: -1;
  }
  
  .list > .measurer > .item {
    position: absolute;
    width: 100%;
  }  
  `)
  );
  document.head.appendChild(style);
}

export interface IRenderRange {
  firstVisibleItemIndex: number;
  lastVisibleItemIndex: number;
}

export interface IVirtualizedListProps<T> {
  items: T[];
  expectedItemHeight: number;
  height: number;
  renderItem: (item: T) => React.ReactNode;
  onRenderRangeChange?: (renderRange: IRenderRange) => void;
  keyFn: (item: T) => string;
}

interface IVirtualizedListState {
  scrollPosition: number;
  startIndex: number;
  measuredItems: { [key: string]: boolean };
}

interface IVirtualizedListSnapshot {
  scrollAdjustment: number;
  totalHeight: number;
}

const BATCH_LIMIT_SIZE = 1;
const BUFFER_SIZE = 5;

export class VirtualizedList<T> extends React.Component<
  IVirtualizedListProps<T>,
  IVirtualizedListState,
  IVirtualizedListSnapshot
> {
  private onScroll: (event: React.SyntheticEvent<Element>) => void;
  private cache: ListHeightCache<T>;
  private latestVisibleItemPosition: number;
  private latestVisibleItem: T;
  private listDiv: HTMLDivElement | null;
  private renderRange: IRenderRange;
  private wrapperDiv: HTMLDivElement | null;

  constructor(props: IVirtualizedListProps<T>) {
    super(props);

    const { items, keyFn, expectedItemHeight } = props;

    this.cache = new ListHeightCache(items, keyFn, expectedItemHeight);
    this.cache.subscribeOnChange(this.onHeightChange);
    this.latestVisibleItem = items[0];
    this.latestVisibleItemPosition = 0;

    this.state = {
      measuredItems: {},
      scrollPosition: 0,
      startIndex: 0
    };

    this.onScroll = (event: React.SyntheticEvent) =>
      throttle(this.onScrollPositionChange, 33)(event.target as HTMLDivElement);
  }

  public componentDidUpdate(
    prevProps: IVirtualizedListProps<T>,
    prevState: IVirtualizedListState,
    snapshot: IVirtualizedListSnapshot
  ) {
    if (
      this.wrapperDiv &&
      this.wrapperDiv.style.height !== `${snapshot.totalHeight}px`
    ) {
      this.wrapperDiv.style.height = `${snapshot.totalHeight}px`;
    }
    if (this.listDiv && snapshot.scrollAdjustment) {
      this.latestVisibleItemPosition += snapshot.scrollAdjustment;
      this.listDiv.scrollTop += snapshot.scrollAdjustment;
    }
  }

  public shouldComponentUpdate(newProps: IVirtualizedListProps<T>) {
    if (this.props.items !== newProps.items) {
      this.cache.updateItems(newProps.items, newProps.expectedItemHeight);
    }
    return true;
  }

  public getSnapshotBeforeUpdate(): IVirtualizedListSnapshot {
    const totalHeight = this.cache.getTotalHeight();
    const latestTopPosition = this.cache.getTopPosition(this.latestVisibleItem);
    const scrollAdjustment = latestTopPosition - this.latestVisibleItemPosition;
    return { totalHeight, scrollAdjustment };
  }

  public render() {
    const { height, items, renderItem, keyFn } = this.props;
    const { startIndex, measuredItems } = this.state;
    const listStyle = {
      height
    };
    const wrapperStyle = {
      height: `${this.cache.getTotalHeight()}px`
    };
    const renderedItemCount = this.getRenderedItemCount();
    const renderedItems = items.slice(
      startIndex,
      startIndex + renderedItemCount
    );
    return (
      <div
        className="list"
        style={listStyle}
        onScroll={this.onScroll}
        ref={ref => (this.listDiv = ref)}
      >
        <div className="measurer" style={wrapperStyle}>
          {renderedItems
            .filter(item => !measuredItems[keyFn(item)])
            .map((item, i) => (
              <Measure
                key={keyFn(item)}
                bounds={true}
                onResize={this.onItemResize(item)}
              >
                {({ measureRef }) => (
                  <div ref={measureRef} className="item">
                    {renderItem(item)}
                  </div>
                )}
              </Measure>
            ))}
        </div>
        <div className="wrapper" ref={ref => (this.wrapperDiv = ref)}>
          {renderedItems
            .filter(item => measuredItems[keyFn(item)])
            .map((item, i) => (
              <div
                key={keyFn(item)}
                className="item"
                style={{
                  top: `${this.cache.getTopPosition(item)}px`
                }}
              >
                {renderItem(item)}
              </div>
            ))}
        </div>
      </div>
    );
  }

  private getRenderedItemCount(): number {
    const { height, expectedItemHeight } = this.props;
    return Math.ceil(height / expectedItemHeight) + BUFFER_SIZE * 2;
  }

  private onItemResize = (item: T) => (contentRect: ContentRect) => {
    const { keyFn } = this.props;
    this.updateHeightCache(item, (contentRect.bounds as BoundingRect).height);
    this.setState(state => ({
      ...state,
      measuredItems: { ...state.measuredItems, [keyFn(item)]: true }
    }));
  };

  private updateHeightCache(item: T, height: number) {
    this.cache.setHeight(item, height);
  }

  private onHeightChange = () => {
    this.setState(state => ({
      ...state
    }));
  };

  private updateRenderRange(topPos: number) {
    const { onRenderRangeChange, height } = this.props;

    if (!onRenderRangeChange) {
      return;
    }

    const currentRenderRange = {
      firstVisibleItemIndex: this.cache.findTopPositionIndex(topPos),
      lastVisibleItemIndex: this.cache.findTopPositionIndex(topPos + height)
    };

    if (
      this.renderRange &&
      this.renderRange.firstVisibleItemIndex ===
        currentRenderRange.firstVisibleItemIndex &&
      this.renderRange.lastVisibleItemIndex ===
        currentRenderRange.lastVisibleItemIndex
    ) {
      return;
    }

    this.renderRange = currentRenderRange;

    let isCallbackCalled = false;
    const req = requestAnimationFrame(() => {
      onRenderRangeChange(this.renderRange);
      isCallbackCalled = true;
    });

    setTimeout(() => {
      if (isCallbackCalled) {
        return;
      }
      onRenderRangeChange(this.renderRange);
      cancelAnimationFrame(req);
      isCallbackCalled = true;
    }, 33);
  }

  private onScrollPositionChange = (target: HTMLDivElement) => {
    const topPos = target.scrollTop;
    const latestVisibleItemIndex = this.cache.getItemIndexByPosition(topPos);
    if (latestVisibleItemIndex !== null) {
      const item = this.props.items[latestVisibleItemIndex];
      const topPosOfItem = this.cache.getTopPosition(item);
      this.latestVisibleItemPosition = topPosOfItem;
      this.latestVisibleItem = item;
    }

    const { startIndex } = this.state;

    const topVisibleItemKey = this.cache.findTopPositionIndex(topPos);

    const newStartIndex =
      topVisibleItemKey - BUFFER_SIZE < 0 ? 0 : topVisibleItemKey - BUFFER_SIZE;

    this.updateRenderRange(topPos);

    if (Math.abs(newStartIndex - startIndex) < BATCH_LIMIT_SIZE) {
      return;
    }

    this.setState(state => ({
      ...state,
      startIndex: newStartIndex
    }));
  };
}
