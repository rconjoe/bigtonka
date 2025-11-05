import { createFileRoute } from "@tanstack/react-router";
import { Return } from "../components/Return";

type ReturnSearch = {
  session_id: string;
};

export const Route = createFileRoute("/return")({
  validateSearch: (search: Record<string, unknown>): ReturnSearch => {
    return {
      session_id: (search.session_id as string) || "",
    };
  },
  component: Return,
});
