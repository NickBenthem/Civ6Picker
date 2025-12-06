#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DailyPingStack } from '../lib/daily-ping-stack';

const app = new cdk.App();

new DailyPingStack(app, 'Civ6PickerCronStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
