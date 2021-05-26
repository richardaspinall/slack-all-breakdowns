# Slack API Feature Breakdowns

> Started: Aug 2020

> Ended:

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
- NPM
- Nodemon (automatically restarts the node application when a file changes. keep in mind to do a full restart when changing enviornment variables! etc)
- NGROK (creates a public URL and tunnels it to your local host see [resources](https://github.com/richardaspinall/slack-api-feature-breakdowns#resources)

## Slack app configuration

Follow the appropriate configuration guide for the feature you want to test. A Slack app can be created from here: https://api.slack.com/apps?new_app=1

> Note: creating a Slack app for each feature makes it easier to debug independently.

---

### /modals

#### Configuration

1. On your Slack App configuration page, head to the **Interactivity & Shortcuts** tab and toggle **Interactivity**. Add the public request URL of your server with an `/interactivity` end point: `yourserver/interactivity`
2. Underneath click **Create New Shortcut** choosing **Global** > Next > Fill out the details (the name and description will appear in Slack and the Callback ID isn't used within this app but is mandatory).
3. Head to the **Install App** tab and install the app.
4. In the project folder create a `.env` file within the `/modals` directory. Add a `BOTTOKEN` variable and set it to the **Bot User OAuth Acccess Token** from the "Install App" tab.

#### Scopes

- https://api.slack.com/scopes/commands

#### Usage

1. In Slack head to any channel and click the lightning bolt next to the input
2. Search for the name (added step2 in the **Configuration** steps above) and trigger the modal view to open (which is found here `/modals/modal_views/view1.json`)

---

### /events

#### Configuration

1. Start the app by running `npm run events`
2. On your Slack App configuration page, head to the **Event Subscriptions** and toggle **Enable Events**. Add the public request URL of your server with an `/events` end point: `yourserver/events` (this will only verify if the app is running correctly)
3. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` and `app_home_opened` events
4. Head to the **Install App** tab and install the app.
5. In the project create a `.env` file within the `/events` directory and add a `BOTTOKEN` variable setting it to the **Bot User OAuth Acccess Token** from the **Install App** tab in step4 above.
6. To add enviornment variables, the app needs to be restarted: `⌃c` (control c), then `npm run events`

#### Scopes

- https://api.slack.com/scopes/app_mentions:read

#### Usage

1. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
2. Mention the bot `@[your-appname]` - you should see the event hit your end point
3. Head to the bot direct message and go to the **Home** tab, you should see the view in: `/events/views/home.json`)

---

### /socketmode

#### Configuration

1. On your Slack App configuration page, head to the **Socket Mode** tab and toggle **Enable Socket Mode**
2. Give the app-level token a name of **SOCKETMODE** (or anything you like) and click **Generate**
3. Note the _token_ that is generated (you can find this later under the **Basic Information** tab > **App-Level Tokens**)
4. Click on the **Event Subscriptions** tab and toggle **Enable Events**, click **Save Changes** (down the bottom right)
5. Underneath click **Subscribe to bot events** and click **Add Bot User Event** choosing the `app_mention` event
6. Click on the **Install App** tab and click through the **Install to Workspace** options
7. In the project code, create a `.env` file and add the `SOCKETMODE` variable: `SOCKETMODE=xapp-...` from step 3.

#### Scopes

- https://api.slack.com/scopes/connections:write (automatically added when setting up Socket Mode)
- https://api.slack.com/scopes/app_mentions:read

#### Usage

1. Start the app by running `npm run socketmode`
2. In Slack invite the bot to a channel(enter `/invite @[your-appname]`)
3. Mention the bot `@[your-appname]` - you should see the event come through on the socket displayed in your terminal.

---

### /unfurling

This tester app uploads a file and then unfurls it when someone enters the corrosponding unfurl URL (`https://YOURUNFURLDOMAIN.com/image123`)

#### Configuration

1. Head to `unfurling/manifest.json`
2. Change `features.unfurl_domains` to your domain that your app will unfurl for
3. Change `settings.event_subscriptions.request_url` to the public server URL hosting your app
4. Head to https://api.slack.com/apps/new and create an app entering the JSON from `unfurling/manifest.json`.
5. Install the app by clicking on the **Install App** tab on the left.
6. Back in the project code, create a `.env` file and add a `BOTTOKEN` variable for the token from step 5.
7. Add `UNFURLDOMAIN` variable for your domain name

The `.env` file should look like this with appropriate replacements:

```
#.env
BOTTOKEN=xoxb-...
UNFURLDOMAIN=https://YOURUNFURLDOMAIN.com
```

#### Scopes

- https://api.slack.com/scopes/links:read
- https://api.slack.com/scopes/links:write
- https://api.slack.com/scopes/remote_files:write

#### Usage

1. Run `npm run unfurling`
2. In Slack invite the bot to a channel(enter `/invite @breakdown-unfurling`)
3. Enter `https://YOURUNFURLDOMAIN.com/image123`

**Note:** `image123` is hardcoded in `unfurling/controllers/unfurling-controller.js`)

---

## Resources

- https://api.slack.com/
- https://ngrok.com/
