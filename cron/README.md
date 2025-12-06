# Civ6Picker daily visit cron

This CDK app deploys a Lambda that joins the Supabase presence channel for lobby `440-8A2`, stays connected for five seconds, then disconnects. An EventBridge rule triggers it once per day.

Supabase URL/anon key are injected from your local `.env` at deploy time (never committed). See `.env.sample` for required keys.

## Usage
- Install deps: `cd cron && yarn install` (uses the bundled `aws-cdk` CLI).
- (First time only) Bootstrap your account/region if not already: `yarn cdk bootstrap`.
- Deploy: `yarn cdk deploy`.
- View the synthesized template: `yarn cdk synth`.

The stack name is `Civ6PickerCronStack`. The Lambda uses Node.js 20 and keeps logs for one week. Adjust schedule, URL, or wait time in `lib/daily-ping-stack.ts`.
