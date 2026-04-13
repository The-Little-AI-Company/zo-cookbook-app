const STORAGE_KEY = "zo_cookbook_api_key";

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key);
}

export function clearApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isConnected(): boolean {
  return !!getApiKey();
}

export function validateApiKeyFormat(key: string): boolean {
  const trimmed = key.trim();
  return trimmed.length >= 10;
}

type RunPromptParams = {
  type: "prompt";
  prompt: string;
};

type RunAutomationParams = {
  type: "automation";
  prompt: string;
  name: string;
  schedule: string;
  delivery: string;
  tools?: string;
};

type RunSpaceParams = {
  type: "space";
  name: string;
  route: string;
  spaceType: string;
  visibility: string;
  description: string;
  keyTech: string;
};

type RunAppParams = {
  type: "app";
  name: string;
  description: string;
  howToBuild: string;
  monetization?: string;
  difficulty?: string;
};

export type RunParams = RunPromptParams | RunAutomationParams | RunSpaceParams | RunAppParams;

export type RunResult =
  | { ok: true; result: string }
  | { ok: false; error: string };

export async function runOnZo(params: RunParams): Promise<RunResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { ok: false, error: "Not connected. Add your Zo API key first." };
  }

  try {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zo-api-key": apiKey,
      },
      body: JSON.stringify(params),
    });

    const text = await res.text();
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text);
    } catch {
      return { ok: false, error: "Server returned an unexpected response. Try again." };
    }

    if (res.status === 401) {
      clearApiKey();
      return { ok: false, error: "Invalid API key. Reconnect with a valid key from Settings > Access Tokens." };
    }

    if (!res.ok || data.ok === false) {
      return { ok: false, error: (data.error as string) || (data.detail as string) || "Something went wrong." };
    }

    return { ok: true, result: typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2) };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: msg };
  }
}
