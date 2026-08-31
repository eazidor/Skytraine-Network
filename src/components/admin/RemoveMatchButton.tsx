"use client";

import { useState } from "react";
import { removeMatch } from "@/app/admin/actions";

export function RemoveMatchButton({
  matchId,
  graduateName,
}: {
  matchId: string;
  graduateName: string;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      onClick={async () => {
        if (!confirm(`Remove ${graduateName} from this opportunity?`)) return;
        setBusy(true);
        await removeMatch(matchId);
        setBusy(false);
      }}
      disabled={busy}
      className="text-xs font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50"
    >
      {busy ? "Removing…" : "Remove"}
    </button>
  );
}
