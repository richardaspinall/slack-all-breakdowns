# Slack API Feature Breakdowns

> Date started (Aug 2020)

## Description

Tester apps for Slack API features

## Goals

- To have a way to quickly and easily test each of Slack's API features independently.

## Install

1. Clone repository and run `npm install`
2. Create a Slack app [see here](#slack-app-configuration-instructions) for each specific feature configuration

## Usage

- `npm run [/feature]` (each feature corrosponds to a folder name)

## Requirements

- Node
- Nodemon
- NPM
- NGROK

## Slack app configuration

Follow the appropriate configuration guide for the feature you want to test. A Slack app can be created from here: https://api.slack.com/apps?new_app=1

> Note: I create a Slack app for each feature for them to be debugged independently.

---

### /modals

1. In the Slack App configuration, head to the **Interactivity & Shortcuts** tab and toggle **Interactivity**. Add the public request URL of your server with an `/interactivity` end point: `yourserver/interactivity`
2. Underneath click **Create New Shortcut** choosing **Global** > Next > Fill out the details (the name and description will appear in Slack and the Callback ID isn't used within this app but is mandatory).
3. Head to the **Install App** tab and install the app.
4. In the project folder create a `.env` file within the `/modals` directory. Add a `BOTTOKEN` variable and set it to the **Bot User OAuth Acccess Token** from the "Install App" tab.
5. In Slack head to any channel and click the lightning bolt next to the input > Search for the name from step 2 and trigger the modal view in: `/modals/modal_views/view1.json` to open

#### Scopes

- https://api.slack.com/scopes/commands

---

### /events

1. Start the app by running `npm run events`
2. In the Slack App configuration, head to the **Event Subscriptions** and toggle **Enable Events**. Add the public request URL of your server with an `/events` end point: `yourserver/events` (this will only verify if the app is running correctly)
3. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` and `app_home_opened` events
4. Head to the **Install App** tab and install the app.
5. In the project create a `.env` file within the `/events` directory and add a `BOTTOKEN` variable setting it to the **Bot User OAuth Acccess Token** from the **Install App** tab in step 4 above.
6. To add enviornment variables, the app needs to be restarted: `⌃c` (control c), then `npm run events`
7. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
8. Mention the bot `@[your-appname]` - you should see the event hit your end point
9. Head to the bot direct message and go to the **Home** tab, you should see the view in: `/events/views/home.json`)

#### Scopes

- https://api.slack.com/scopes/app_mentions:read

---

### /socketmode

1. In the Slack App configuration, head to the **Socket Mode** tab and toggle **Enable Socket Mode**
2. Give the app-level token a name and click **Generate**
3. Note the _token_ that is generated (you can find this later under the **Basic Information** tab > **App-Level Tokens**)
4. Click on the **Event Subscriptions** and toggle **Enable Events**
5. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` event
6. In the project create a `.env` file within the `/socketmode` directory and add a `SOCKETMODE` variable setting it to the token from the step 3: `SOCKETMODE=xapp-...`
7. Start the app by running `npm run socketmode`
8. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
9. Mention the bot `@[your-appname]` - you should see the event come through on the socket

#### Scopes

- https://api.slack.com/scopes/app_mentions:read

---

## Resources

- https://api.slack.com/
- https://ngrok.com/
