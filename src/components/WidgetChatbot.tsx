import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function WidgetChatbot({ onInstruction }: { onInstruction: (inst: any) => void }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/widget-chat", {
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
    <div className="space-y-2">
      <Textarea
        placeholder="Ask the assistant to add/remove widgets…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Ask Assistant"}
      </Button>
    </div>
  );
}
