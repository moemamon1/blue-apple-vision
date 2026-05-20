import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: () => <Navigate to="/" />,
});
