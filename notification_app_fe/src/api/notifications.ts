import { Log } from "../../logging_middleware/logger";

export async function fetchNotifications(query = "") {
  try {
    const res = await fetch(`/api/notifications?${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();

    console.log("API RESPONSE:", data);

    const notifications = Array.isArray(data)
      ? data
      : data?.notifications || [];

    await Log("frontend", "info", "api", "Fetched notifications");

    return notifications;
  } catch (e) {
    console.error(e);
    await Log("frontend", "error", "api", "Fetch failed");
    return [];
  }
}