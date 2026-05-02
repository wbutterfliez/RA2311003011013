const weightMap: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getTopNotifications(
  notifications: any[] = [],
  n = 10
) {
  return [...notifications]
    .sort((a, b) => {
      const weightDiff =
        (weightMap[b?.Type] || 0) -
        (weightMap[a?.Type] || 0);

      if (weightDiff !== 0) return weightDiff;

      return (
        new Date(b?.Timestamp).getTime() -
        new Date(a?.Timestamp).getTime()
      );
    })
    .slice(0, n);
}