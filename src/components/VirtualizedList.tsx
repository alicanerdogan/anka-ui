import * as React from "react";
import {
  VirtualizedList as List,
  IRenderRange
} from "./VirtualizedList/VirtualizedList";
import { AutoSizer } from "./VirtualizedList/AutoSizer";
import { ITweet } from "../models/Tweet";

export interface IVirtualizedListItemProps {
  item: any;
  style: React.CSSProperties;
}

export interface IScrollEvent {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

export interface IVirtualizedListProps {
  items: any[];
  children: (props: IVirtualizedListItemProps) => JSX.Element;
  defaultHeight?: number;
  onScroll?: (ev: IScrollEvent) => void;
  onRenderRangeChange?: (ev: IRenderRange) => void;
  scrollToIndex?: number;
  scrollToAlignment?: "auto" | "start" | "end";
  getItemId?: (item: any) => string;
}

export class VirtualizedList extends React.Component<
  IVirtualizedListProps,
  {}
> {
  constructor(props: IVirtualizedListProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, children, defaultHeight, onRenderRangeChange } = this.props;
    return (
      <AutoSizer>
        {(currentHeight: number) => (
          <List
            items={items}
            height={currentHeight}
            keyFn={(item: ITweet) => item.id_str}
            expectedItemHeight={defaultHeight || 100}
            renderItem={(item: ITweet) => children({ item, style: {} })}
            onRenderRangeChange={onRenderRangeChange}
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
