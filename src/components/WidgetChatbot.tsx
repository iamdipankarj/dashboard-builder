import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { apiBase } from "@/services/api";

export function WidgetChatbot({ onInstruction }: { onInstruction: (inst: any) => void }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/widget-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      onInstruction(data.instruction); // trigger dashboard update
    } catch (e) {
      console.error("Chat error", e);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 flex-1">
      <Input
        id="agent_input"
        placeholder="Add apple stock."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        <Sparkles />
        {loading ? "Thinking..." : "Ask"}
      </Button>
    </form>
  );
}
