import type { backendInterface } from "../backend";
import {
  Category,
  ClaimStatus,
  ItemStatus,
  ItemType,
  NotificationType,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = {
  toText: () => "aaaaa-aa",
  toString: () => "aaaaa-aa",
  toUint8Array: () => new Uint8Array(29),
  compareTo: () => ({ __brand__: "Order" as const, value: 0 }),
  isAnonymous: () => false,
} as unknown as Principal;

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayAgo = now - BigInt(86_400_000_000_000);
const twoDaysAgo = now - BigInt(2 * 86_400_000_000_000);

const sampleItems = [
  {
    id: BigInt(1),
    status: ItemStatus.open,
    userId: mockPrincipal,
    date: dayAgo,
    name: "Black Backpack",
    createdAt: dayAgo,
    description: "Lost a black Nike backpack near the Science Center Cafeteria. Contains textbooks and laptop charger.",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    itemType: ItemType.lost,
    category: Category.accessories,
    location: "Science Center Cafeteria",
  },
  {
    id: BigInt(2),
    status: ItemStatus.open,
    userId: mockPrincipal,
    date: twoDaysAgo,
    name: "Keys Found in Library",
    createdAt: twoDaysAgo,
    description: "Found a set of keys with a blue keychain on the 2nd floor of the Main Library.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    itemType: ItemType.found,
    category: Category.keys,
    location: "Main Library, 2nd Floor",
  },
  {
    id: BigInt(3),
    status: ItemStatus.matched,
    userId: mockPrincipal,
    date: twoDaysAgo,
    name: "iPhone 14 Pro",
    createdAt: twoDaysAgo,
    description: "Lost iPhone 14 Pro with a clear case. Has a cracked screen protector.",
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80",
    itemType: ItemType.lost,
    category: Category.electronics,
    location: "Student Union Building",
  },
  {
    id: BigInt(4),
    status: ItemStatus.open,
    userId: mockPrincipal,
    date: now,
    name: "Brown Leather Wallet",
    createdAt: now,
    description: "Found a brown leather wallet near the Science Center. Contains student ID and some cash.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    itemType: ItemType.found,
    category: Category.accessories,
    location: "Science Center Cafeteria",
  },
  {
    id: BigInt(5),
    status: ItemStatus.open,
    userId: mockPrincipal,
    date: dayAgo,
    name: "Introduction to Algorithms",
    createdAt: dayAgo,
    description: "Lost my CLRS textbook in the Engineering building. Has my name written on the inside cover.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    itemType: ItemType.lost,
    category: Category.books,
    location: "Engineering Building, Room 302",
  },
];

export const mockBackend: backendInterface = {
  approveClaim: async (_claimId) => true,

  createItem: async (request) => ({
    id: BigInt(99),
    status: ItemStatus.open,
    userId: mockPrincipal,
    date: request.date,
    name: request.name,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    description: request.description,
    imageUrl: request.imageUrl,
    itemType: request.itemType,
    category: request.category,
    location: request.location,
  }),

  deleteItem: async (_id) => true,

  getItem: async (id) => sampleItems.find((i) => i.id === id) ?? null,

  getMatchSuggestions: async (_id) => [sampleItems[1]],

  getMyNotifications: async () => [
    {
      id: BigInt(1),
      itemId: BigInt(1),
      userId: mockPrincipal,
      notificationType: NotificationType.match_found,
      createdAt: dayAgo,
      read: false,
      message: "A possible match was found for your Black Backpack! Check the details.",
    },
    {
      id: BigInt(2),
      itemId: BigInt(2),
      userId: mockPrincipal,
      notificationType: NotificationType.claim_received,
      createdAt: twoDaysAgo,
      read: false,
      message: "Someone claimed your found item: Keys Found in Library.",
    },
    {
      id: BigInt(3),
      itemId: BigInt(3),
      userId: mockPrincipal,
      notificationType: NotificationType.claim_approved,
      createdAt: twoDaysAgo,
      read: true,
      message: "Your claim for iPhone 14 Pro has been approved.",
    },
  ],

  getMyProfile: async () => ({
    id: mockPrincipal,
    name: "Alex Johnson",
    createdAt: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
    email: "alex.johnson@university.edu",
  }),

  getUserProfile: async (_userId) => ({
    id: mockPrincipal,
    name: "Alex Johnson",
    createdAt: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
    email: "alex.johnson@university.edu",
  }),

  listAllItems: async (offset, limit) => ({
    total: BigInt(sampleItems.length),
    offset,
    limit,
    items: sampleItems.slice(Number(offset), Number(offset) + Number(limit)),
  }),

  listClaimsByItem: async (_itemId) => [
    {
      id: BigInt(1),
      status: ClaimStatus.pending,
      itemId: BigInt(2),
      createdAt: dayAgo,
      message: "I think these are my keys! I lost them yesterday near the library.",
      claimantId: mockPrincipal,
    },
  ],

  listItemsByCategory: async (category, offset, limit) => {
    const filtered = sampleItems.filter((i) => i.category === category);
    return {
      total: BigInt(filtered.length),
      offset,
      limit,
      items: filtered.slice(Number(offset), Number(offset) + Number(limit)),
    };
  },

  listItemsByType: async (itemType, offset, limit) => {
    const filtered = sampleItems.filter((i) => i.itemType === itemType);
    return {
      total: BigInt(filtered.length),
      offset,
      limit,
      items: filtered.slice(Number(offset), Number(offset) + Number(limit)),
    };
  },

  listItemsByUser: async (_userId) => sampleItems.slice(0, 3),

  listMyClaims: async () => [
    {
      id: BigInt(1),
      status: ClaimStatus.approved,
      itemId: BigInt(3),
      createdAt: dayAgo,
      message: "This is my iPhone. I can provide the serial number.",
      claimantId: mockPrincipal,
    },
  ],

  markNotificationRead: async (_id) => true,

  registerUser: async (name, email) => ({
    id: mockPrincipal,
    name,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    email,
  }),

  rejectClaim: async (_claimId) => false,

  resolveItem: async (_id) => true,

  submitClaim: async (request) => ({
    id: BigInt(99),
    status: ClaimStatus.pending,
    itemId: request.itemId,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    message: request.message,
    claimantId: mockPrincipal,
  }),

  updateItem: async (request) => {
    const item = sampleItems.find((i) => i.id === request.id);
    if (!item) return null;
    return { ...item, ...request };
  },

  updateMyProfile: async (request) => ({
    id: mockPrincipal,
    name: request.name ?? "Alex Johnson",
    createdAt: BigInt(Date.now() - 30 * 86400000) * BigInt(1_000_000),
    email: request.email ?? "alex.johnson@university.edu",
  }),
};
