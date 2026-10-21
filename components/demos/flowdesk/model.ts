export type DemoClient = { id: string; name: string; company: string; email: string };
export type QuoteLineItem = { id: string; description: string; quantity: number; unitPriceCents: number };
export type DemoQuote = { id: string; clientId: string; title: string; items: QuoteLineItem[]; status: "draft" | "sent" | "approved" };
export type DemoState = { version: 1; clients: DemoClient[]; quotes: DemoQuote[] };
export type DemoLocale = "pt-BR" | "en";
export type DemoAction =
  | { type: "client/upsert"; payload: DemoClient }
  | { type: "quote/upsert"; payload: DemoQuote }
  | { type: "quote/status"; payload: { id: string; status: DemoQuote["status"] } };

export function applyDemoAction(state: DemoState, action: DemoAction): DemoState {
  const next: DemoState = {
    version: 1,
    clients: state.clients.map(client => ({ ...client })),
    quotes: state.quotes.map(quote => ({ ...quote, items: quote.items.map(item => ({ ...item })) }))
  };
  switch (action.type) {
    case "client/upsert": {
      const client = { ...action.payload };
      const index = next.clients.findIndex(existing => existing.id === client.id);
      if (index === -1) next.clients.push(client);
      else next.clients[index] = client;
      break;
    }
    case "quote/upsert": {
      const quote = { ...action.payload, items: action.payload.items.map(item => ({ ...item })) };
      const index = next.quotes.findIndex(existing => existing.id === quote.id);
      if (index === -1) next.quotes.push(quote);
      else next.quotes[index] = quote;
      break;
    }
    case "quote/status": {
      const quote = next.quotes.find(existing => existing.id === action.payload.id);
      if (!quote) throw new Error("Quote not found");
      quote.status = action.payload.status;
      break;
    }
    default:
      throw new Error("Unknown demo action");
  }
  assertDemoState(next);
  return next;
}

export function getDashboardStats(state: DemoState): { clientCount: number; quoteCount: number; approvedTotalCents: number } {
  let approvedTotalCents = 0;
  for (const quote of state.quotes) {
    if (quote.status !== "approved") continue;
    approvedTotalCents += calculateQuoteTotal(quote.items);
    if (!Number.isSafeInteger(approvedTotalCents)) throw new Error("Approved total exceeds safe integer range");
  }
  return { clientCount: state.clients.length, quoteCount: state.quotes.length, approvedTotalCents };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasUniqueIds(records: unknown[]): boolean {
  const ids = new Set<string>();
  for (const record of records) {
    if (!isRecord(record) || typeof record.id !== "string" || !record.id.trim() || ids.has(record.id)) return false;
    ids.add(record.id);
  }
  return true;
}

// Shared by persistence and actions so every accepted state has the same invariants.
export function assertDemoState(value: unknown): asserts value is DemoState {
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.clients) || !Array.isArray(value.quotes) ||
      !hasUniqueIds(value.clients) || !hasUniqueIds(value.quotes)) {
    throw new Error("Invalid demo state");
  }
  for (const client of value.clients) {
    if (!isRecord(client) || ![client.name, client.company, client.email].every(field => typeof field === "string")) {
      throw new Error("Invalid client");
    }
  }
  const clientIds = new Set(value.clients.map(client => client.id));
  for (const quote of value.quotes) {
    if (!isRecord(quote) || typeof quote.title !== "string" || !clientIds.has(quote.clientId) ||
        !["draft", "sent", "approved"].includes(quote.status as string) ||
        !Array.isArray(quote.items) || quote.items.length === 0 || !hasUniqueIds(quote.items)) {
      throw new Error("Invalid quote");
    }
    for (const item of quote.items) {
      if (!isRecord(item) || typeof item.description !== "string") throw new Error("Invalid quote item");
    }
    calculateQuoteTotal(quote.items as QuoteLineItem[]);
  }
  getDashboardStats(value as DemoState);
}

export function calculateQuoteTotal(items: QuoteLineItem[]): number {
  let total = 0;
  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 1000 ||
        !Number.isSafeInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new Error("Invalid quote item amount");
    }
    total += item.quantity * item.unitPriceCents;
    if (!Number.isSafeInteger(total)) throw new Error("Quote total exceeds safe integer range");
  }
  return total;
}

export function parseMoneyInput(value: string): number | null {
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ""] = value.split(/[.,]/);
  const cents = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
  return cents <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(cents) : null;
}
