/*!
 * Wunderbaum - utils
 * Copyright (c) 2021-2022, Martin Wendt. Released under the MIT license.
 * @VERSION, @DATE (https://github.com/mar10/wunderbaum)
 */

import {
  BoolOptionResolver,
  ColumnDefinitionList,
  DndOptionsType,
  NavigationOptions,
  NodeTypeDefinitions,
  WbNodeEventType,
  WbRenderEventType,
  WbTreeEventType,
} from "./types";

export interface WbNodeData {
  title: string;
  key?: string;
  refKey?: string;
  expanded?: boolean;
  selected?: boolean;
  checkbox?: boolean | string;
  children?: Array<WbNodeData>;
  // ...any?: Any;
}

/**
 * Available options for [[Wunderbaum]].
 *
 * Options are passed to the constructor as plain object:
 *
 * ```js
 * const tree = new mar10.Wunderbaum({
 *   id: "demo",
 *   element: document.querySelector("#demo-tree"),
 *   source: "url/of/data/request",
 *   ...
 * });
 * ```
 *
 * Event handlers are also passed as callbacks
 *
 * ```js
 * const tree = new mar10.Wunderbaum({
 *   ...
 *   init: (e) => {
 *     console.log(`Tree ${e.tree} was initialized and loaded.`)
 *   },
 *   activate: (e) => {
 *     console.log(`Node ${e.node} was activated.`)
 *   },
 *   ...
 * });
 * ```
 */
export interface WunderbaumOptions {
  /**
   * The target `div` element (or selector) that shall become a Wunderbaum.
   */
  element: string | HTMLDivElement;
  /**
   * The identifier of this tree. Used to reference the instance, especially
   * when multiple trees are present (e.g. `tree = mar10.Wunderbaum.getTree("demo")`).
   *
   * Default: `"wb_" + COUNTER`.
   */
  id?: string;
  /**
   * Define the initial tree data. Typically a URL of an endpoint that serves
   * a JSON formatted structure, but also a callback, Promise, or static data
   * is allowed.
   *
   * Default: `{}`.
   */
  source?: string | Array<WbNodeData>;
  /**
   * Define shared attributes for multiple nodes of the same type.
   * This allows for more compact data models. Type definitions can be passed
   * as tree option, or be part of a `source` response.
   *
   * Default: `{}`.
   */
  types?: NodeTypeDefinitions; // { [key: string]: NodeTypeDefinition };
  /**
   * A list of maps that define column headers. If this option is set,
   * Wunderbaum becomes a treegrid control instead of a plain tree.
   * Column definitions can be passed as tree option, or be part of a `source`
   * response.
   * Default: `[]` meaning this is a plain tree.
   */
  columns?: ColumnDefinitionList;
  /**
   * If true, add a `wb-skeleton` class to all nodes, that will result in a
   * 'glow' effect. Typically used with initial dummy nodes, while loading the
   * real data.
   * Default: false.
   */
  skeleton?: false;
  /**
   * Translation map for some system messages.
   */
  strings?: any; //[key: string] string;
  /**
   * 0:quiet, 1:errors, 2:warnings, 3:info, 4:verbose
   * Default: 3 (4 in local debug environment)
   */
  debugLevel: number;
  /**
   * Number of levels that are forced to be expanded, and have no expander icon.
   * E.g. 1 would keep all toplevel nodes expanded.
   * Default: 0
   */
  minExpandLevel?: number;
  // escapeTitles: boolean;
  // /**
  //  * Height of the header row div.
  //  * Default: 22
  //  */
  // headerHeightPx: number;
  /**
   * Height of a node row div.
   * Default: 22
   */
  rowHeightPx?: number;
  /**
   * Collapse siblings when a node is expanded.
   * Default: false
   */
  autoCollapse?: boolean;
  /**
   * HTMLElement that receives the top nodes breadcrumb.
   * Default: undefined
   */
  connectTopBreadcrumb?: HTMLElement;
  /**
   * Default:  NavigationOptions.startRow
   */
  navigationModeOption?: NavigationOptions;
  /**
   * Show/hide header (default: null)
   * null: assume false for plain tree and true for grids.
   * string: use text as header (only for plain trees)
   * true: display a header (use tree's id as text for plain trees)
   * false: do not display a header
   */
  header?: boolean | string | null;
  /**
   *
   */
  showSpinner?: boolean;
  /**
   * If true, render a checkbox before the node tile to allow selection with the
   * mouse.
   * Default: false.
   */
  checkbox?: boolean | "radio" | BoolOptionResolver;
  /**
   * Default: 200
   */
  updateThrottleWait?: number;
  /**
   * Default: true
   */
  enabled?: boolean;
  /**
   * Default: false
   */
  fixedCol?: boolean;

  // --- KeyNav ---
  /**
   * Default: true
   */
  quicksearch?: boolean;

  // --- Extensions ------------------------------------------------------------
  dnd?: DndOptionsType; // = {};
  edit: any; // = {};
  filter: any; // = {};
  grid: any; // = {};

  // --- Events ----------------------------------------------------------------

  /**
   *
   * @category Callback
   */
  activate?: (e: WbNodeEventType) => void;
  /**
   *
   * @category Callback
   */
  change?: (e: WbNodeEventType) => void;
  /**
   *
   * Return `false` to prevent default handling, e.g. activating the node.
   * @category Callback
   */
  click?: (e: WbTreeEventType) => void;
  /**
   *
   * Return `false` to prevent default handling, e.g. activating the node.
   * @category Callback
   */
  beforeActivate?: (e: WbNodeEventType) => void;
  /**
  /**
   *
   * Return `false` to prevent default handling, e.g. deactivating the node
   * and activating the next.
   * @category Callback
   */
  deactivate?: (e: WbNodeEventType) => void;
  /**
   *
   * @category Callback
   */
  discard?: (e: WbNodeEventType) => void;
  /**
   *
   * @category Callback
   */
  enhanceTitle?: (e: WbNodeEventType) => void;
  /**
   *
   * @category Callback
   */
  error?: (e: WbTreeEventType) => void;
  /**
   *
   * Check `e.flag` for status.
   * @category Callback
   */
  focus?: (e: WbTreeEventType) => void;
  /**
   * Fires when the tree markup was created and the initial source data was loaded.
   * Typical use cases would be activating a node, setting focus, enabling other
   * controls on the page, etc.<br>
   * Check `e.error` for status.
   * @category Callback
   */
  init?: (e: WbTreeEventType) => void;
  /**
   *
   * @category Callback
   */
  keydown?: (e: WbNodeEventType) => void;
  /**
   * Fires when a node that was marked 'lazy', is expanded for the first time.
   * Typically we return an endpoint URL or the Promise of a fetch request that
   * provides a (potentially nested) list of child nodes.
   * @category Callback
   */
  lazyLoad?: (e: WbNodeEventType) => void;
  /**
   * Fires when data was loaded (initial request, reload, or lazy loading),
   * after the data is applied and rendered.
   * @category Callback
   */
  load?: (e: WbNodeEventType) => void;
  /**
   * @category Callback
   */
  modifyChild?: (e: WbNodeEventType) => void;
  /**
   * Fires when data was fetched (initial request, reload, or lazy loading),
   * but before the data is applied and rendered.
   * Here we can modify and adjust the received data, for example to convert an
   * external response to native Wunderbaum syntax.
   * @category Callback
   */
  receive?: (e: WbNodeEventType) => void;
  /**
   * Fires when a node is about to be displayed.
   * The default HTML markup is already created, but not yet added to the DOM.
   * Now we can tweak the markup, create HTML elements in this node's column
   * cells, etc.
   * See also `Custom Rendering` for details.
   * @category Callback
   */
  render?: (e: WbRenderEventType) => void;
  /**
   *
   * @category Callback
   */
  renderStatusNode?: (e: WbNodeEventType) => void;
  /**
   *
   * Check `e.flag` for status.
   * @category Callback
   */
  select?: (e: WbNodeEventType) => void;
  /**
   * Fires when the viewport content was updated, after scroling, expanding etc.
   * @category Callback
   */
  update?: (e: WbTreeEventType) => void;
}
