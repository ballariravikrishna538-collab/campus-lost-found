import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-B3kRMkUk.js";
import { a as CATEGORY_LABELS, b as CATEGORY_COLORS, C as CATEGORY_ICONS } from "./index-Y1WSDvOi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function CategoryBadge({
  category,
  showIcon = true,
  className = ""
}) {
  const label = CATEGORY_LABELS[category] ?? String(category);
  const colorClass = CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground";
  const icon = CATEGORY_ICONS[category] ?? "📦";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${colorClass} ${className}`,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: icon }),
        label
      ]
    }
  );
}
export {
  CategoryBadge as C,
  Calendar as a
};
