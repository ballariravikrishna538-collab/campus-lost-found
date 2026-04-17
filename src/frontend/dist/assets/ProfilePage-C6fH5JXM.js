import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn, a as useBackend, u as useAuth, f as useQueryClient, e as useNavigate, d as useQuery, n as LoadingScreen, I as ItemType, l as ItemStatus, L as LoadingSpinner, S as Search, g as ue } from "./index-B3kRMkUk.js";
import { E as EmptyState } from "./EmptyState-2xONxMIc.js";
import { P as Package, I as ItemCard } from "./ItemCard-XT33CBNU.js";
import { P as PageHeader } from "./PageHeader-FJvrZreR.js";
import { u as useComposedRefs, B as Button } from "./button-C_Sdx-K0.js";
import { P as Presence, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-Baqw7R1F.js";
import { I as Input } from "./input-Clk_USEF.js";
import { L as Label } from "./label-bfvK2Ags.js";
import { d as useId, P as Primitive, e as composeEventHandlers, c as createContextScope, b as useControllableState, a as useCallbackRef } from "./Combination-r_aLKKAQ.js";
import { c as createCollection, u as useDirection } from "./index-C2GJV0j0.js";
import { u as useMutation } from "./x-CCX_kk-4.js";
import "./CategoryBadge-D0eHMT-b.js";
import "./index-Y1WSDvOi.js";
import "./StatusBadge-D6ZnRgVQ.js";
import "./map-pin-D5rAQqNa.js";
import "./index-BEnBZagZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
const AVATAR_PALETTE = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground"
];
function getAvatarColor(name) {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}
function StatChip({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground text-center leading-tight", children: label })
  ] });
}
function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
  isPending
}) {
  const [name, setName] = reactExports.useState(profile.name);
  const [email, setEmail] = reactExports.useState(profile.email);
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSave(name.trim(), email.trim());
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm mx-4", "data-ocid": "profile.edit_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "edit-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Your name",
            required: true,
            "data-ocid": "profile.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "edit-email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "your@email.com",
            required: true,
            "data-ocid": "profile.email_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2 gap-2 flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            className: "flex-1",
            "data-ocid": "profile.edit_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "flex-1",
            "data-ocid": "profile.edit_save_button",
            children: isPending ? "Saving…" : "Save changes"
          }
        )
      ] })
    ] })
  ] }) });
}
function ItemTabContent({
  items,
  type
}) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: type === "lost" ? "🔍" : "📦",
        title: `No ${type} items yet`,
        description: `Items you report as ${type} will appear here.`,
        "data-ocid": `profile.${type}_empty_state`
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 pb-4", "data-ocid": `profile.${type}_items_list`, children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ItemCard,
    {
      item,
      index: i + 1,
      showActions: false
    },
    String(item.id)
  )) });
}
function ProfilePage() {
  const { actor, isFetching } = useBackend();
  const { currentUser, identity, logout, isLoadingProfile } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const { data: myItems, isLoading: isLoadingItems } = useQuery({
    queryKey: ["myItems", identity == null ? void 0 : identity.getPrincipal().toText()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.listItemsByUser(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 6e4
  });
  const updateProfile = useMutation({
    mutationFn: async ({ name, email }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMyProfile({ name, email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      ue.success("Profile updated!");
      setEditOpen(false);
    },
    onError: () => ue.error("Failed to update profile")
  });
  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }
  if (isLoadingProfile) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { label: "Loading profile…" });
  const displayName = (currentUser == null ? void 0 : currentUser.name) ?? "Campus User";
  const displayEmail = (currentUser == null ? void 0 : currentUser.email) ?? "";
  const items = myItems ?? [];
  const lostItems = items.filter((i) => i.itemType === ItemType.lost);
  const foundItems = items.filter((i) => i.itemType === ItemType.found);
  const resolvedCount = items.filter(
    (i) => i.status === ItemStatus.resolved
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "My Profile",
        rightAction: currentUser ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 text-muted-foreground hover:text-primary",
            onClick: () => setEditOpen(true),
            "aria-label": "Edit profile",
            "data-ocid": "profile.edit_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-b from-primary/10 to-background px-4 pt-6 pb-4 flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-20 h-20 rounded-full flex items-center justify-center shadow-elevated font-display font-bold text-2xl ${getAvatarColor(displayName)}`,
          "data-ocid": "profile.avatar",
          children: isLoadingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : getInitials(displayName)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: displayName }),
        displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: displayEmail })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl px-4 py-3 flex items-center divide-x divide-border shadow-card",
        "data-ocid": "profile.stats",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { value: items.length, label: "Posted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { value: foundItems.length, label: "Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { value: resolvedCount, label: "Resolved" })
        ]
      }
    ) }),
    isLoadingItems ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center py-10",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading your items…" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "lost", className: "flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mx-4 mb-1 grid grid-cols-2 bg-muted rounded-lg h-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "lost",
            "data-ocid": "profile.lost_tab",
            className: "rounded-md text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Lost (",
              lostItems.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "found",
            "data-ocid": "profile.found_tab",
            className: "rounded-md text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Found (",
              foundItems.length,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "lost", className: "px-4 mt-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTabContent, { items: lostItems, type: "lost" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "found", className: "px-4 mt-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTabContent, { items: foundItems, type: "found" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 border-t border-border mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "w-full border-destructive/50 text-destructive hover:bg-destructive/5 hover:border-destructive",
        onClick: handleLogout,
        "data-ocid": "profile.logout_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
          "Log Out"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "px-4 pb-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          className: "text-primary hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "caffeine.ai"
        }
      )
    ] }) }),
    editOpen && currentUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileModal,
      {
        open: editOpen,
        profile: currentUser,
        onClose: () => setEditOpen(false),
        onSave: (name, email) => updateProfile.mutate({ name, email }),
        isPending: updateProfile.isPending
      }
    )
  ] });
}
export {
  ProfilePage as default
};
