"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";
import { getTopNotifications } from "../utils/priority";
import NotificationCard from "../components/NotificationCard";
import { Log } from "../../logging_middleware/logger";
import { getToken } from "../utils/auth";

export default function Page() {
  const [all, setAll] = useState<any[]>([]);
  const [top, setTop] = useState<any[]>([]);
  const [read, setRead] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      try {
        await getToken();

        const data = await fetchNotifications("limit=50");

        if (!Array.isArray(data)) {
          console.error("Invalid data:", data);
          return;
        }

        setAll(data);
        setTop(getTopNotifications(data));

        await Log("frontend", "info", "component", "Loaded page");
      } catch (err) {
        console.error(err);
        await Log("frontend", "error", "component", "Init failed");
      }
    }

    init();
  }, []);

  function markRead(id: string) {
    setRead(prev => [...prev, id]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Priority</h2>
      {(top || []).map(n => (
        <div key={n.ID} onClick={() => markRead(n.ID)}>
          <NotificationCard n={n} read={read.includes(n.ID)} />
        </div>
      ))}

      <h2>All</h2>
      {(all || []).map(n => (
        <div key={n.ID} onClick={() => markRead(n.ID)}>
          <NotificationCard n={n} read={read.includes(n.ID)} />
        </div>
      ))}
    </div>
  );
}