# ContentPilot

ContentPilot is an open-source AI content strategy platform for real estate agents, creators, and small businesses. It turns a business, audience, platform, offer, and brand voice into a structured social content strategy.

## What is included

- A public product page at `/` with product information and getting-started guidance.
- A strategy generator at `/app`.
- A server-side `POST /api/generate` endpoint that calls Anthropic Claude and validates its response.
- No accounts, payments, or database.

The generator returns 10 content ideas, 10 short-form video hooks, 3 video scripts, 5 carousel ideas, and 3 calls to action. Generated results are real Claude responses; the app does not use sample output as a fallback.

## Run the app in Replit

Open the ContentPilot web preview. The project uses a separate API server for strategy requests.

## Enable Claude generation

Claude generation is intentionally unavailable until an API key is configured. To enable it:

1. Create an Anthropic API key in your Anthropic account.
2. In Replit, open the **Tools** pane and select **Secrets**.
3. Add a secret named `ANTHROPIC_API_KEY` and paste the key into its value field. Do not put the key in source code, browser settings, chat, or GitHub.
4. Restart the **API Server** workflow.
5. Open `/app` and select **Generate Strategy**.

Anthropic may charge for API usage. ContentPilot sends the five form fields to Anthropic only when the server-side key is configured.

Without the key, the API returns a setup-required response and the app explains what to configure. This is expected; the app does not pretend generation succeeded.

## API

`POST /api/generate` accepts JSON with these required string fields:

- `businessType`
- `targetAudience`
- `socialPlatform`
- `productService`
- `brandTone`

Successful responses contain the five strategy sections described above. The server validates both request data and Claude's output. The Anthropic key is read only by the API server from `ANTHROPIC_API_KEY`.

## GitHub

The GitHub link in the product page is a placeholder until you create or connect a repository.
