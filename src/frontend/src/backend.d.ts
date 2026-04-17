import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Claim {
    id: ClaimId;
    status: ClaimStatus;
    itemId: ItemId;
    createdAt: Timestamp;
    message: string;
    claimantId: UserId;
}
export type Timestamp = bigint;
export interface CreateItemRequest {
    date: Timestamp;
    name: string;
    description: string;
    imageUrl?: string;
    itemType: ItemType;
    category: Category;
    location: string;
}
export interface CreateClaimRequest {
    itemId: ItemId;
    message: string;
}
export type UserId = Principal;
export interface ItemsPage {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Item>;
}
export interface Item {
    id: ItemId;
    status: ItemStatus;
    userId: UserId;
    date: Timestamp;
    name: string;
    createdAt: Timestamp;
    description: string;
    imageUrl?: string;
    itemType: ItemType;
    category: Category;
    location: string;
}
export type NotificationId = bigint;
export interface UpdateItemRequest {
    id: ItemId;
    name?: string;
    description?: string;
    imageUrl?: string;
    location?: string;
}
export interface Notification {
    id: NotificationId;
    itemId?: ItemId;
    userId: UserId;
    notificationType: NotificationType;
    createdAt: Timestamp;
    read: boolean;
    message: string;
}
export interface UpdateUserRequest {
    name?: string;
    email?: string;
}
export type ItemId = bigint;
export interface UserProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    email: string;
}
export type ClaimId = bigint;
export enum Category {
    documents = "documents",
    clothing = "clothing",
    accessories = "accessories",
    other = "other",
    keys = "keys",
    books = "books",
    electronics = "electronics"
}
export enum ClaimStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ItemStatus {
    resolved = "resolved",
    open = "open",
    matched = "matched"
}
export enum ItemType {
    found = "found",
    lost = "lost"
}
export enum NotificationType {
    claim_approved = "claim_approved",
    claim_rejected = "claim_rejected",
    match_found = "match_found",
    claim_received = "claim_received"
}
export interface backendInterface {
    approveClaim(claimId: ClaimId): Promise<boolean>;
    createItem(request: CreateItemRequest): Promise<Item>;
    deleteItem(id: ItemId): Promise<boolean>;
    getItem(id: ItemId): Promise<Item | null>;
    getMatchSuggestions(id: ItemId): Promise<Array<Item>>;
    getMyNotifications(): Promise<Array<Notification>>;
    getMyProfile(): Promise<UserProfile | null>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    listAllItems(offset: bigint, limit: bigint): Promise<ItemsPage>;
    listClaimsByItem(itemId: ItemId): Promise<Array<Claim>>;
    listItemsByCategory(category: Category, offset: bigint, limit: bigint): Promise<ItemsPage>;
    listItemsByType(itemType: ItemType, offset: bigint, limit: bigint): Promise<ItemsPage>;
    listItemsByUser(userId: UserId): Promise<Array<Item>>;
    listMyClaims(): Promise<Array<Claim>>;
    markNotificationRead(id: NotificationId): Promise<boolean>;
    registerUser(name: string, email: string): Promise<UserProfile>;
    rejectClaim(claimId: ClaimId): Promise<boolean>;
    resolveItem(id: ItemId): Promise<boolean>;
    submitClaim(request: CreateClaimRequest): Promise<Claim>;
    updateItem(request: UpdateItemRequest): Promise<Item | null>;
    updateMyProfile(request: UpdateUserRequest): Promise<UserProfile | null>;
}
