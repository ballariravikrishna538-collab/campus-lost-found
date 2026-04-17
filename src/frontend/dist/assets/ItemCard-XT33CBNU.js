import { c as createLucideIcon, I as ItemType, j as jsxRuntimeExports, b as Link } from "./index-B3kRMkUk.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { C as CategoryBadge, a as Calendar } from "./CategoryBadge-D0eHMT-b.js";
import { S as StatusBadge } from "./StatusBadge-D6ZnRgVQ.js";
import { M as MapPin } from "./map-pin-D5rAQqNa.js";
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
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode);
function formatDate(timestamp) {
  const ms = Number(timestamp);
  const date = ms > 1e12 ? new Date(ms / 1e6) : new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function ItemCard({
  item,
  index = 1,
  onContact,
  showActions = true
}) {
  const isLost = item.itemType === ItemType.lost;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `items.item.${index}`,
      className: "card-base border border-border overflow-hidden flex mb-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/item/$id",
            params: { id: item.id.toString() },
            className: "relative flex-shrink-0 w-28 h-28 bg-muted overflow-hidden",
            children: [
              item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.imageUrl,
                  alt: item.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: isLost ? "🔍" : "📦" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${isLost ? "bg-destructive/90 text-destructive-foreground" : "bg-primary/90 text-primary-foreground"}`,
                  children: isLost ? "Lost" : "Found"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 p-3 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/item/$id",
                params: { id: item.id.toString() },
                className: "font-display font-semibold text-sm text-foreground leading-tight line-clamp-1 hover:text-primary transition-colors",
                children: item.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: item.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                isLost ? "Lost" : "Found",
                " ",
                formatDate(item.date)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed", children: item.description })
          ] }),
          showActions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/item/$id", params: { id: item.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-7 text-xs px-3",
                "data-ocid": `items.details_button.${index}`,
                children: "Details"
              }
            ) }),
            onContact && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-7 text-xs px-3",
                onClick: () => onContact(item),
                "data-ocid": `items.contact_button.${index}`,
                children: isLost ? "Claim" : "Message"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ItemCard as I,
  Package as P
};
