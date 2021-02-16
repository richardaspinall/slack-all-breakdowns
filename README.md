# Slack API Feature Breakdowns
> Date started (Aug 2020)

## Description
Tester apps for Slack API features

## Goals
* To have a way to quickly and easily test each of Slack's API features independently.

## Install
1. Clone repository and run `npm install`
2. Create a Slack app [see here](#slack-app-configuration-instructions) for each specific feature configuration

## Usage
* `npm run [/feature]` (each feature corrosponds to a folder name)

## Requirements
* Node
* Nodemon
* NPM

## Slack app configuration
Follow the appropriate configuration guide for the feature you want to test. A Slack app can be created from here: https://api.slack.com/apps?new_app=1

> Note: I create a Slack app for each feature for them to be debugged independently.
---

### /modals
  1. Add a request URL endpoint: "/interactivity" in the "Interactivity & Shortcuts" tab. Then Create New Shortcut.
  2. Head to the "Install App" tab and install the app.
  3. Create a `.env` file in `/modals`. Add a BOTTOKEN variable and set it to the **Bot User OAuth Acccess Token** from the "Install App" tab.
#### Scopes 
https://api.slack.com/scopes/commands

---
### /events
  1. Start the app by running `npm run events`
  2. Add a request URL endpoint: "/events" in the "Event Subscriptions" tab. (this will only verify if the app is running correctly)
  3. Open "Subscribe to bot events" and add `app_home_opened` and `app_mention`
  4. Head to the "Install App" tab and install the app.
  5. Create a `.env` file in `/events`. Add a BOTTOKEN variable and set it to the **Bot User OAuth Acccess Token** from the "Install App" tab.
#### Scopes 

---



## Resources
* https://api.slack.com/
