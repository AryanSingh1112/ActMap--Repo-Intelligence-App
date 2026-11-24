
"use client";

import { useState, useRef, type FormEvent } from "react";

type RepositoryAskProps = {
  analysisId: string;
  selectedFile: string | null;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ToolActivity = {
  id: string;
  name: string;
  status: "running" | "complete";
};

type StreamEvent = {
  type?: string;
  id?: string;
  name?: string;
  text?: string;
  content?: string;
  message?: string;
  threadId?: string;
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function RepositoryAsk({
  analysisId,
  selectedFile,
}: RepositoryAskProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [tools, setTools] = useState<ToolActivity[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const canAsk = question.trim().length > 0 && !loading;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = question.trim();

    if (!value || loading) return;

    setQuestion("");
    setError(null);
    setLoading(true);
    setTools([]);

    const userMessage: Message = {
      id: makeId(),
      role: "user",
      content: value,
    };

    const assistantId = makeId();

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: assistantId,
        role: "assistant",
        content: "",
      },
    ]);

    try {
      const response = await fetch(`/analyses/${analysisId}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          selected: selectedFile,
          threadId,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "The repository agent could not be reached.",
        );
      }

      if (!response.body) {
        throw new Error("The agent returned an empty response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let receivedText = false;

      function updateAssistant(text: string) {
        if (!text) return;

        receivedText = true;

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + text,
                }
              : message,
          ),
        );
      }

      function handleEvent(event: StreamEvent) {
        if (event.type === "thread") {
          if (typeof event.threadId === "string") {
            setThreadId(event.threadId);
          }
          return;
        }

        if (
          event.type === "tool_start" ||
          event.type === "tool_call"
        ) {
          const toolId =
            typeof event.id === "string" ? event.id : makeId();

          const name =
            typeof event.name === "string"
              ? event.name
              : "Repository tool";

          setTools((current) => {
            if (current.some((tool) => tool.id === toolId)) {
              return current;
            }

            return [
              ...current,
              {
                id: toolId,
                name,
                status: "running",
              },
            ];
          });

          return;
        }

        if (
          event.type === "tool_end" ||
          event.type === "tool_result"
        ) {
          const toolId =
            typeof event.id === "string" ? event.id : null;

          if (toolId) {
            setTools((current) =>
              current.map((tool) =>
                tool.id === toolId
                  ? { ...tool, status: "complete" }
                  : tool,
              ),
            );
          }

          return;
        }

        if (event.type === "text" || event.type === "token") {
          const text =
            typeof event.text === "string"
              ? event.text
              : typeof event.content === "string"
                ? event.content
                : "";

          updateAssistant(text);
          return;
        }

        if (event.type === "error") {
          throw new Error(
            typeof event.message === "string"
              ? event.message
              : "The agent encountered an error.",
          );
        }
      }

      function processLine(line: string) {
        const trimmed = line.trim();

        if (!trimmed) return;

        try {
          const event = JSON.parse(trimmed) as StreamEvent;
          handleEvent(event);
        } catch (parseError) {
          if (parseError instanceof SyntaxError) {
            updateAssistant(trimmed);
            return;
          }

          throw parseError;
        }
      }

      while (true) {
        const { value: chunk, done } = await reader.read();

        if (done) break;

        buffer += decoder.decode(chunk, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          processLine(line);
        }
      }

      buffer += decoder.decode();

      if (buffer.trim()) {
        processLine(buffer);
      }

      if (!receivedText) {
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: "The agent finished without returning an answer.",
                }
              : message,
          ),
        );
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while asking the repository.",
      );

      setMessages((current) =>
        current.filter((message) => message.id !== assistantId),
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-line px-5 py-5">
        <h2 className="text-[18px] font-semibold tracking-tight text-foreground">
          Ask about this repository
        </h2>

        <p className="mt-1 text-[13px] leading-5 text-muted">
          Ask questions about files, dependencies, architecture, and how
          changes can affect the repository.
        </p>

        {selectedFile && (
          <div className="mt-3 rounded-md border border-line bg-surface-2 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-muted">
              Current file
            </div>

            <div className="mt-1 break-all font-mono text-[12px] text-foreground">
              {selectedFile}
            </div>
          </div>
        )}
      </div>

      <div className="quiet-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5">
        {messages.length === 0 ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="max-w-[280px] text-center">
              <p className="text-[14px] font-medium text-foreground">
                Understand the repository through questions.
              </p>

              <p className="mt-2 text-[13px] leading-5 text-muted">
                Try asking where authentication is handled, what imports a
                file, or what could be affected by changing it.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div key={message.id}>
                <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                  {message.role === "user" ? "You" : "Actmap"}
                </div>

                <div
                  className={
                    message.role === "user"
                      ? "rounded-lg bg-surface-2 px-3 py-2.5 text-[13px] leading-5 text-foreground"
                      : "whitespace-pre-wrap text-[13px] leading-6 text-foreground"
                  }
                >
                  {message.content ||
                    (loading && message.role === "assistant"
                      ? "Thinking..."
                      : "")}
                </div>
              </div>
            ))}

            {tools.length > 0 && (
              <div className="rounded-lg border border-line bg-surface-2 px-3 py-3">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
                  Repository activity
                </div>

                <div className="space-y-1.5">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-2 text-[12px]"
                    >
                      <span
                        className={
                          tool.status === "complete"
                            ? "text-good"
                            : "text-warn"
                        }
                      >
                        {tool.status === "complete" ? "✓" : "•"}
                      </span>

                      <span className="font-mono text-muted">
                        {tool.name}
                      </span>

                      {tool.status === "running" && (
                        <span className="text-muted">Running</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && tools.length === 0 && (
              <div className="text-[12px] text-muted">
                Looking through the repository...
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-bad/30 bg-bad/5 px-3 py-2.5 text-[12px] leading-5 text-bad">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-line p-4">
        <div className="rounded-lg border border-line bg-surface-2 focus-within:border-foreground/30">
          <textarea
            ref={inputRef}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                if (canAsk) {
                  event.currentTarget.form?.requestSubmit();
                }
              }
            }}
            placeholder="Ask about your repository..."
            rows={3}
            maxLength={2000}
            disabled={loading}
            className="w-full resize-none bg-transparent px-3 pt-3 text-[13px] leading-5 text-foreground outline-none placeholder:text-muted disabled:opacity-60"
          />

          <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
            <span className="text-[11px] text-muted">
              Enter to ask · Shift + Enter for a new line
            </span>

            <button
              type="submit"
              disabled={!canAsk}
              className="rounded-md bg-foreground px-2.5 py-1.5 text-[12px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
