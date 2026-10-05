export const principal = {
  name: "Jonathan",
  identity: "5ca5409cd4c74c671593791e7dfc16cc6436aa532a0c126ebcc29442c421c012",
  sequence: 6,
  status: "ACTIVE",
};
export const agent = {
  name: "Research Agent",
  identity: "1801d00bc5d2f94ed9869a2c5085ccf705fa8b611f16e7290e8dca21a79a94ab",
  capability: "records.read",
  status: "ACTIVE",
};
export const activity = [
  ["07:23:13","Research Agent requested records.read","ALLOWED"],
  ["07:23:13","OAuth authority issued","DPoP-bound · 300 seconds"],
  ["07:23:14","Research Agent GET /api/records/123","ALLOWED"],
  ["07:23:17","Research Agent DELETE /api/records/123","DENIED"],
  ["07:24:03","Jonathan reset delegations","AUTHORITY REVOKED"],
  ["07:24:05","Research Agent requested records.read","DENIED"],
] as const;