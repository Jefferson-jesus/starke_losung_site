import type { DemoLocale, DemoState } from "@/components/demos/flowdesk/model";

export function createSeedState(locale: DemoLocale): DemoState {
  const portuguese = locale === "pt-BR";
  return {
    version: 1,
    clients: [
      { id: "client-1", name: "Marina Costa", company: portuguese ? "Aurora Criativa (fictícia)" : "Aurora Creative (fictional)", email: "marina@example.com" },
      { id: "client-2", name: "Daniel Lima", company: portuguese ? "Horizonte Digital (fictícia)" : "Horizon Digital (fictional)", email: "daniel@example.com" },
      { id: "client-3", name: "Alex Morgan", company: portuguese ? "Estúdio Vértice (fictício)" : "Vertex Studio (fictional)", email: "alex@example.com" }
    ],
    quotes: [
      {
        id: "quote-1", clientId: "client-1", title: portuguese ? "Identidade visual" : "Visual identity", status: "approved",
        items: [{ id: "item-1", description: portuguese ? "Criação de identidade visual" : "Visual identity design", quantity: 1, unitPriceCents: portuguese ? 240000 : 120000 }]
      },
      {
        id: "quote-2", clientId: "client-2", title: portuguese ? "Consultoria digital" : "Digital consulting", status: "sent",
        items: [{ id: "item-2", description: portuguese ? "Sessão de consultoria" : "Consulting session", quantity: 3, unitPriceCents: portuguese ? 45000 : 25000 }]
      },
      {
        id: "quote-3", clientId: "client-3", title: portuguese ? "Página de apresentação" : "Landing page", status: "draft",
        items: [{ id: "item-3", description: portuguese ? "Design e desenvolvimento" : "Design and development", quantity: 1, unitPriceCents: portuguese ? 180000 : 95000 }]
      }
    ]
  };
}
