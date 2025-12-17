import MessagesDashboard from "@/components/messages-dashboard";
import React from "react";

const page = () => {
  return (
    <div>
      <main className=" bg-white mt-24">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-8">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Messaggi</h1>
            <p className="text-sm text-muted-foreground">Resta connesso e rispondi ai tuoi utenti in modo semplice e veloce</p>
          </header>
          <MessagesDashboard />
        </div>
      </main>
    </div>
  );
};

export default page;
