# Notification System Design

## Stage 1 — Priority Notifications

### Objective

Design a system to fetch notifications from an external API and display the top **N priority notifications** based on:

* Notification type importance
* Recency (latest first)

---

## Approach

### 1. Data Source

* Notifications are fetched from the provided API:

  ```
  GET /notifications
  ```
* No database storage is used as per constraints.

---

### 2. Priority Logic

Each notification is assigned a weight based on its type:

| Type      | Weight |
| --------- | ------ |
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

### Sorting Strategy

1. Sort by **weight (descending)**
2. If weights are equal → sort by **timestamp (descending)**

### Implementation

* Used JavaScript `.sort()` with custom comparator
* Extracted into reusable utility function

### Time Complexity

* Sorting: **O(n log n)**
* Slicing top N: **O(n)**

---

## Optimization Consideration

For large-scale systems:

* Use a **Min Heap (Priority Queue)** of size N
* Complexity reduces to: **O(n log k)**
  (where k = number of top notifications)

---

## Handling Continuous Updates

Since notifications keep arriving:

* Current approach recalculates on each fetch
* Future improvement:

  * Maintain a **real-time priority queue**
  * Use **WebSockets / streaming updates**

---

## Logging Middleware

A reusable logging middleware was implemented:

### Function Signature

```
Log(stack, level, package, message)
```

### Features

* Sends logs to external logging API
* Used across:

  * API calls
  * Component lifecycle
  * Error handling

### Log Levels Used

* `info` → successful operations
* `error` → failures
* `debug` (optional) → development insights

### Benefits

* Centralized logging
* Easier debugging
* Production-level observability

---

## Frontend Implementation

### Tech Stack

* Next.js (App Router)
* TypeScript
* Material UI

### Features

* Display:

  * Priority notifications (Top N)
  * All notifications
* Click to mark as read (UI state only)
* Responsive layout (mobile + desktop)

---

## Error Handling

Handled scenarios:

* API failure → fallback to empty array
* Invalid token → logged error
* Empty dataset → UI still renders safely

---

## Edge Cases

* No notifications returned
* Missing fields in API response
* Duplicate notifications
* Invalid timestamps

---

## Stage 2 — Enhancements

### Pagination

* Supported via:

  ```
  limit
  page
  ```

### Filtering

* Filter by notification type:

  ```
  notification_type = Event | Result | Placement
  ```

### UI Improvements

* Separate views for:

  * All notifications
  * Priority notifications
* Visual distinction for read/unread

---

## Future Improvements

* Real-time updates using WebSockets
* Caching layer (Redis / client-side memoization)
* Server-side rendering for faster load
* User-specific preferences for priority weights
* Persistent read/unread state

---

## Conclusion

The system efficiently prioritizes and displays notifications using a scalable sorting approach, integrates structured logging, and adheres to all constraints provided. The design is extensible and production-ready with clear upgrade paths for performance and real-time capabilities.
