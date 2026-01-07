/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeCheck, Briefcase, ChevronDown, ChevronRight, Menu, Paperclip, Send, Trash2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Message = {
  id: string;
  author: "me" | "them";
  text: string;
  timestamp: string;
};

type Chat = {
  id: string;
  name: string;
  preview: string;
  lastAt: string;
  unread?: boolean;
};

type Vehicle = {
  id: string;
  name: string;
  image: string;
  open: boolean;
  unreadCount: number;
  chats: Chat[];
};

type Mode = "company" | "customer";

export default function MessagesDashboard({ defaultMode = "company" }: { defaultMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => seedVehicles());
  const allChatsFlat = useMemo(
    () =>
      vehicles.flatMap((v) =>
        v.chats.map((c) => ({
          vehicleId: v.id,
          vehicleName: v.name,
          ...c,
        }))
      ),
    [vehicles]
  );

  const initialChat = allChatsFlat[0];
  const [active, setActive] = useState<{ vehicleId: string; chatId: string } | null>(
    initialChat ? { vehicleId: initialChat.vehicleId, chatId: initialChat.id } : null
  );

  // Messages store keyed by chatId
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => seedMessages(allChatsFlat.map((c) => c.id)));

  // For mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Compose area
  const [text, setText] = useState("");

  const activeChatMeta = useMemo(() => {
    if (!active) return null;
    const vehicle = vehicles.find((v) => v.id === active.vehicleId);
    const chat = vehicle?.chats.find((c) => c.id === active.chatId);
    return { vehicle, chat };
  }, [active, vehicles]);

  // Mark chat read when activated
  useEffect(() => {
    if (!active) return;
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== active.vehicleId) return v;
        const nextChats = v.chats.map((c) => {
          if (c.id === active.chatId && c.unread) {
            return { ...c, unread: false };
          }
          return c;
        });
        const unreadCount = nextChats.filter((c) => c.unread).length;
        return { ...v, chats: nextChats, unreadCount };
      })
    );
  }, [active]);

  const chatMsgs = active ? messages[active.chatId] ?? [] : [];

  const handleSend = () => {
    if (!active || !text.trim()) return;
    const newMsg: Message = {
      id: crypto.randomUUID(),
      author: "me",
      text: text.trim(),
      timestamp: formatNow(),
    };
    setMessages((prev) => ({ ...prev, [active.chatId]: [...(prev[active.chatId] ?? []), newMsg] }));
    setText("");
  };

  const handleDeleteConversation = () => {
    if (!active) return;
    setMessages((prev) => ({ ...prev, [active.chatId]: [] }));
  };

  const toggleVehicle = (vehicleId: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, open: !v.open } : v)));
  };

  const closeVehicleConversations = (vehicleId: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, open: false } : v)));
  };

  return (
    <div className="relative">
      {/* Grid layout */}
      <div className="grid h-[calc(100vh-240px)] grid-rows-[auto_1fr_auto] gap-4 md:grid-rows-1 md:grid-cols-[340px_minmax(0,1fr)]">
        {/* Sidebar (md+) */}
        <aside className="hidden md:block">
          <Sidebar
            mode={mode}
            onModeChange={setMode}
            vehicles={vehicles}
            active={active}
            setActive={(vId, cId) => setActive({ vehicleId: vId, chatId: cId })}
            toggleVehicle={toggleVehicle}
            closeVehicleConversations={closeVehicleConversations}
          />
        </aside>

        {/* Chat Area */}
        <section className="col-span-1 flex h-full flex-col">
          <div className="flex h-full flex-col">
            <ChatHeader
              title={activeChatMeta?.chat?.name ?? "Seleziona una conversazione"}
              onMenu={() => setSidebarOpen(true)}
              onDelete={handleDeleteConversation}
            />

            <MessagesList messages={chatMsgs} />

            <ComposeBar
              value={text}
              onChange={setText}
              onSend={handleSend}
              onAttach={() => {
                // In a real app you'd open a file picker, here we just simulate success
                alert("Allegato aggiunto (simulato)");
              }}
            />
          </div>
        </section>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[360px] bg-white shadow-xl">
            <div className="h-full overflow-y-auto p-3">
              <Sidebar
                mode={mode}
                onModeChange={(m) => {
                  setMode(m);
                }}
                vehicles={vehicles}
                active={active}
                setActive={(vId, cId) => {
                  setActive({ vehicleId: vId, chatId: cId });
                  setSidebarOpen(false);
                }}
                toggleVehicle={toggleVehicle}
                closeVehicleConversations={closeVehicleConversations}
                compact
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({
  mode,
  onModeChange,
  vehicles,
  active,
  setActive,
  toggleVehicle,
  closeVehicleConversations,
  compact = false,
}: {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  vehicles: Vehicle[];
  active: { vehicleId: string; chatId: string } | null;
  setActive: (vehicleId: string, chatId: string) => void;
  toggleVehicle: (vehicleId: string) => void;
  closeVehicleConversations: (vehicleId: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="text-sm font-semibold">Chat azienda</h2>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant={mode === "company" ? "default" : "ghost"}
            className={cn("h-8 w-8", mode === "company" ? "bg-neutral-900 text-white hover:bg-neutral-800" : "")}
            onClick={() => onModeChange("company")}
            aria-label="Modalità azienda"
            title="Modalità azienda"
          >
            <Briefcase className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={mode === "customer" ? "default" : "ghost"}
            className={cn("h-8 w-8", mode === "customer" ? "bg-neutral-900 text-white hover:bg-neutral-800" : "")}
            onClick={() => onModeChange("customer")}
            aria-label="Modalità cliente"
            title="Modalità cliente"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100%-49px)] flex-col gap-4 overflow-y-auto p-3">
        {/* Selected/expanded vehicle at top (first one) */}
        {vehicles.slice(0, 1).map((v) => (
          <div key={v.id} className="rounded-lg border">
            <div className="flex gap-3 p-3">
              <Image src="/exotic-sport-car.png" alt={v.name} width={96} height={64} className="h-16 w-24 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate text-sm font-medium">{v.name}</div>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {v.unreadCount} chat {v.unreadCount === 1 ? "non letta" : "non lette"}
                  </span>
                  {v.unreadCount > 0 && <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
                </div>
                <button
                  onClick={() => closeVehicleConversations(v.id)}
                  className="mt-1 text-xs font-medium text-neutral-900 underline underline-offset-2"
                >
                  Chiudi conversazioni
                </button>
              </div>
            </div>

            {/* Chats */}
            <div className="divide-y">
              {v.chats.map((c) => {
                const isActive = active?.vehicleId === v.id && active?.chatId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActive(v.id, c.id)}
                    className={cn("w-full px-3 py-2 text-left transition-colors hover:bg-muted/60", isActive && "bg-muted/80")}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {/* <Avatar className="h-8 w-8">
                          <AvatarImage src="/diverse-person-avatars.png" alt="" />
                          <AvatarFallback>{initials(c.name)}</AvatarFallback>
                        </Avatar> */}
                        <div className="min-w-0">
                          <div className={cn("truncate text-sm", c.unread ? "font-semibold" : "font-medium")}>{c.name}</div>
                          <div className={cn("truncate text-xs text-muted-foreground", c.unread && "text-neutral-900")}>{c.preview}</div>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end">
                        <span className="text-[11px] text-muted-foreground">{c.lastAt}</span>
                        {c.unread && <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Other vehicles list */}
        <div className="space-y-3">
          {vehicles.slice(1).map((v) => (
            <div key={v.id} className="rounded-lg border">
              <button className="flex w-full items-center gap-3 p-3 text-left hover:bg-muted/60" onClick={() => toggleVehicle(v.id)}>
                <Image
                  src={v.image || "/placeholder.svg"}
                  alt={v.name}
                  width={96}
                  height={64}
                  className="h-16 w-24 flex-none rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-medium">{v.name}</div>
                    <div className="ml-2 flex items-center gap-2">
                      {v.unreadCount > 0 && <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
                      {v.open ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {v.unreadCount} chat {v.unreadCount === 1 ? "non letta" : "non lette"}
                  </div>
                  <div className="mt-1 text-xs font-medium text-neutral-900 underline underline-offset-2">
                    {v.open ? "Chiudi conversazioni" : "Mostra conversazioni"}
                  </div>
                </div>
              </button>

              {v.open && (
                <div className="divide-y">
                  {v.chats.map((c) => {
                    const isActive = active?.vehicleId === v.id && active?.chatId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActive(v.id, c.id)}
                        className={cn("w-full px-3 py-2 text-left transition-colors hover:bg-muted/60", isActive && "bg-muted/80")}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            {/* <Avatar className="h-8 w-8">
                              <AvatarImage src="/diverse-person-avatars.png" alt="" />
                              <AvatarFallback>{initials(c.name)}</AvatarFallback>
                            </Avatar> */}
                            <div className="min-w-0">
                              <div className={cn("truncate text-sm", c.unread ? "font-semibold" : "font-medium")}>{c.name}</div>
                              <div className={cn("truncate text-xs text-muted-foreground", c.unread && "text-neutral-900")}>{c.preview}</div>
                            </div>
                          </div>
                          <div className="flex shrink-0 flex-col items-end">
                            <span className="text-[11px] text-muted-foreground">{c.lastAt}</span>
                            {c.unread && <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {!compact && (
          <div className="mt-auto flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5" />
            <span>{"Sicuro e affidabile"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatHeader({ title, onMenu, onDelete }: { title: string; onMenu: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-between border-b px-3 py-2">
      <div className="flex items-center gap-2">
        <Button className="md:hidden" size="icon" variant="ghost" onClick={onMenu} aria-label="Apri elenco chat">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium md:text-base">{title}</div>
      </div>
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" onClick={onDelete} aria-label="Elimina conversazione">
          <Trash2 className="h-5 w-5 text-neutral-700" />
        </Button>
      </div>
    </div>
  );
}

function MessagesList({ messages }: { messages: Message[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  if (!messages.length) {
    return (
      <div ref={containerRef} className="flex flex-1 items-center justify-center px-3 py-4">
        <div className="text-center text-sm text-muted-foreground">Nessun messaggio. Inizia la conversazione.</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} author={m.author} text={m.text} timestamp={m.timestamp} />
      ))}
    </div>
  );
}

function MessageBubble({ author, text, timestamp }: { author: "me" | "them"; text: string; timestamp: string }) {
  const isMine = author === "me";
  return (
    <div className={cn("flex w-full", isMine ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] rounded-lg border p-3 shadow-sm md:max-w-[70%]", isMine ? "bg-rose-50 border-rose-100" : "bg-neutral-50")}>
        <p className="text-sm leading-relaxed">{text}</p>
        <div className="mt-1 text-right text-[11px] text-muted-foreground">{timestamp}</div>
      </div>
    </div>
  );
}

function ComposeBar({
  value,
  onChange,
  onSend,
  onAttach,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onAttach: () => void;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  return (
    <div className="flex items-center gap-2 border-t p-2">
      <Button variant="ghost" size="icon" className="text-neutral-700" onClick={onAttach} aria-label="Aggiungi allegato">
        <Paperclip className="h-5 w-5" />
      </Button>
      <Input
        placeholder="Scrivi qui il tuo messaggio..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1"
        aria-label="Campo di inserimento messaggio"
      />
      <Button onClick={onSend} className="bg-primary text-white hover:bg-primary/90" aria-label="Invia messaggio">
        <Send className="mr-2 h-4 w-4" />
        Invia
      </Button>
    </div>
  );
}

/* Helpers and seeds */

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function formatNow() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const mon = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${mon}/${year} alle ${hh}:${mm}`;
}

function seedVehicles(): Vehicle[] {
  return [
    {
      id: "veh-1",
      name: "Lamborghini Huracan",
      image: "/exotic-sport-car.png",
      open: true,
      unreadCount: 1,
      chats: [
        {
          id: "chat-stefano",
          name: "Stefano Rossi",
          preview: "Si vorrei prenotare un veicolo per andare all'estero...",
          lastAt: "30/11/2024 alle 14:55",
          unread: false,
        },
        {
          id: "chat-francesca",
          name: "Francesca Lazi",
          preview: "Tur: Salve per la consegna a domicilio...",
          lastAt: "25/10/2024 alle 18:07",
          unread: true,
        },
        {
          id: "chat-lorenzo",
          name: "Lorenzo Fagini",
          preview: "Si vorrei prenotare il suo veicolo per occuparmi di al...",
          lastAt: "12/08/2024 alle 11:23",
          unread: false,
        },
      ],
    },
    {
      id: "veh-2",
      name: "Maserati Ghibli Gransport",
      image: "/sleek-maserati-ghibli.png",
      open: false,
      unreadCount: 0,
      chats: [
        {
          id: "chat-mas-1",
          name: "Giulia Neri",
          preview: "0 chat non lette",
          lastAt: "—",
        },
      ],
    },
    {
      id: "veh-3",
      name: "Ford Transit 330",
      image: "/ford-transit-van.png",
      open: false,
      unreadCount: 0,
      chats: [
        {
          id: "chat-ford-1",
          name: "Marco Bianchi",
          preview: "0 chat non lette",
          lastAt: "—",
        },
      ],
    },
    {
      id: "veh-4",
      name: "Mercedes-Benz C43 AMG",
      image: "/sleek-mercedes-c43.png",
      open: false,
      unreadCount: 0,
      chats: [
        {
          id: "chat-merc-1",
          name: "Sara Verdi",
          preview: "0 chat non lette",
          lastAt: "—",
        },
      ],
    },
    {
      id: "veh-5",
      name: "Mazda 2",
      image: "/mazda-2-hatchback.png",
      open: false,
      unreadCount: 0,
      chats: [
        {
          id: "chat-mazda-1",
          name: "Paolo Neri",
          preview: "0 chat non lette",
          lastAt: "—",
        },
      ],
    },
  ];
}

function seedMessages(chatIds: string[]): Record<string, Message[]> {
  const base: Message[] = [
    {
      id: crypto.randomUUID(),
      author: "them",
      text: "Salve ho visto la sua telefonata; desidera il furgone?",
      timestamp: "30/11/2024 alle 14:55",
    },
    {
      id: crypto.randomUUID(),
      author: "me",
      text: "Si vorrei prenotare ne ho bisogno tra pochi minuti e dovrei andare anche in Italia",
      timestamp: "30/11/2024 alle 14:57",
    },
    {
      id: crypto.randomUUID(),
      author: "them",
      text: "Perfetto, le preparo la delega ed il contratto, abbiamo incluso nel noleggio la consegna a domicilio, le può interessare?",
      timestamp: "30/11/2024 alle 14:58",
    },
    {
      id: crypto.randomUUID(),
      author: "them",
      text: "Ottimo! In allegato troverà i miei dati per il contratto, riguardo la consegna a domicilio, lo confermo appena possibile! Tanti cari saluti da Stefano.",
      timestamp: "30/11/2024 alle 15:06",
    },
    {
      id: crypto.randomUUID(),
      author: "me",
      text: "Certo lo saluto! A presto.",
      timestamp: "30/11/2024 alle 15:10",
    },
  ];
  const map: Record<string, Message[]> = {};
  chatIds.forEach((id, i) => {
    map[id] = i === 0 ? base : [];
  });
  return map;
}
