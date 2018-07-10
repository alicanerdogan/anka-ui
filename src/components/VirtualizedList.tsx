import * as React from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

export interface IVirtualizedListItemProps {
  item: any;
  style: React.CSSProperties;
}

export interface IScrollEvent {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

export interface IRowsRenderEvent {
  overscanStartIndex: number;
  overscanStopIndex: number;
  startIndex: number;
  stopIndex: number;
}

export interface IVirtualizedListProps {
  items: any[];
  children: (props: IVirtualizedListItemProps) => JSX.Element;
  defaultHeight?: number;
  onScroll?: (ev: IScrollEvent) => void;
  onRowsRendered?: (ev: IRowsRenderEvent) => void;
  scrollToIndex?: number;
  scrollToAlignment?: "auto" | "start" | "end";
}

interface IRowRendererProps {
  index?: number;
  key?: any;
  parent: any;
  style?: React.CSSProperties;
}

export class VirtualizedList extends React.Component<
  IVirtualizedListProps,
  {}
> {
  private cache: CellMeasurerCache;

  constructor(props: IVirtualizedListProps) {
    super(props);
    this.state = {};

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: props.defaultHeight || 100
    });
  }

  buildRowRenderer() {
    const cache = this.cache;
    const { items, children } = this.props;
    return ({ index, key, style, parent }: IRowRendererProps) => {
      const item = items[index];
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {children({ item, style })}
        </CellMeasurer>
      );
    };
  }

  render() {
    const {
      items,
      onScroll,
      onRowsRendered,
      scrollToIndex,
      scrollToAlignment
    } = this.props;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            deferredMeasurementCache={this.cache}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.buildRowRenderer()}
            rowCount={items.length}
            {...{ onScroll, onRowsRendered, scrollToIndex, scrollToAlignment }}
          />
        )}
      </AutoSizer>
    );
  }
}

const RowRenderer = ({ items }: { items: any[] }) => (
  <VirtualizedList items={items}>
    {(props: IVirtualizedListItemProps) => (
      <div style={props.style}>{props.item.toString()}</div>
    )}
  </VirtualizedList>
);
