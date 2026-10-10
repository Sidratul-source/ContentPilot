import { Router, type IRouter } from "express";
import {
  GenerateStrategyBody,
  GenerateStrategyResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MODEL = "claude-sonnet-4-6";

type AnthropicMessage = {
  content?: Array<{ type?: string; text?: string }>;
};

router.post("/generate", async (req, res): Promise<void> => {
  const input = GenerateStrategyBody.safeParse(req.body);
  if (!input.success) {
    res.status(400).json({
      error: "Please complete all five fields with valid details.",
    });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error:
        "ContentPilot is ready to connect to Claude, but ANTHROPIC_API_KEY is not configured. Add it as a server-side secret, then restart the API server.",
      setupRequired: true,
    });
    return;
  }

  const { businessType, targetAudience, socialPlatform, productService, brandTone } =
    input.data;

  let response: Response;
  try {
    response = await fetch(ANTHROPIC_MESSAGES_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "anthropic-version": ANTHROPIC_VERSION,
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 5000,
        system: [
          "You are an experienced social content strategist. Create specific, useful strategy for the supplied business; do not use generic filler.",
          "Tailor every item to the exact business type, target audience, social platform, product or service, and brand tone.",
          "Do not invent business credentials, results, legal claims, guarantees, or facts not supplied by the user.",
          "Return only valid JSON, without markdown or surrounding commentary, matching this exact shape:",
          '{"contentIdeas":[{"title":"...","angle":"...","format":"..."}],"videoHooks":["..."],"videoScripts":[{"title":"...","hook":"...","beats":["..."],"callToAction":"..."}],"carouselIdeas":[{"title":"...","slides":["..."]}],"callsToAction":["..."]}',
          "Include exactly 10 distinct contentIdeas, exactly 10 short-form videoHooks, exactly 3 short-form videoScripts with 3 to 6 concise beats each, exactly 5 carouselIdeas with 4 to 8 slide descriptions each, and exactly 3 callsToAction.",
          "Use platform-native formats, concrete angles, and the requested voice. Make hooks specific enough to earn attention without clickbait.",
        ].join(" "),
        messages: [
          {
            role: "user",
            content: JSON.stringify({
              businessType,
              targetAudience,
              socialPlatform,
              productService,
              brandTone,
            }),
          },
        ],
      }),
      signal: AbortSignal.timeout(90_000),
    });
  } catch (error) {
    req.log.error(
      { errorName: error instanceof Error ? error.name : "unknown" },
      "Anthropic request could not be completed",
    );
    res.status(502).json({
      error:
        "Claude could not be reached right now. Please wait a moment and try again.",
    });
    return;
  }

  if (!response.ok) {
    req.log.error({ status: response.status }, "Anthropic API returned an error");
    res.status(502).json({
      error:
        "Claude could not generate the strategy right now. Please try again later.",
    });
    return;
  }

  let message: AnthropicMessage;
  try {
    message = (await response.json()) as AnthropicMessage;
  } catch {
    req.log.warn("Anthropic response was not valid JSON");
    res.status(422).json({
      error: "Claude returned an unreadable response. Please try again.",
    });
    return;
  }

  const text = message.content
    ?.filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (!text) {
    req.log.warn("Anthropic response did not contain text");
    res.status(422).json({
      error: "Claude returned an empty response. Please try again.",
    });
    return;
  }

  const jsonText = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  let decoded: unknown;
  try {
    decoded = JSON.parse(jsonText);
  } catch {
    req.log.warn("Anthropic response did not contain parseable strategy JSON");
    res.status(422).json({
      error: "Claude returned an incomplete strategy. Please try again.",
    });
    return;
  }

  const strategy = GenerateStrategyResponse.safeParse(decoded);
  if (!strategy.success) {
    req.log.warn("Anthropic strategy did not match the required response shape");
    res.status(422).json({
      error: "Claude returned an incomplete strategy. Please try again.",
    });
    return;
  }

  res.status(200).json(strategy.data);
});

export default router;
