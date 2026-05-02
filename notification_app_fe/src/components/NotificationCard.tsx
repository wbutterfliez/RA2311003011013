"use client";

import { Card, CardContent, Typography } from "@mui/material";

export default function NotificationCard({ n, read }: any) {
  return (
    <Card sx={{ mb: 2, opacity: read ? 0.5 : 1 }}>
      <CardContent>
        <Typography variant="h6">{n.Type}</Typography>
        <Typography>{n.Message}</Typography>
        <Typography variant="caption">{n.Timestamp}</Typography>
      </CardContent>
    </Card>
  );
}