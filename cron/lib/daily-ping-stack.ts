import * as dotenv from 'dotenv';
import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export class DailyPingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_SUPABASE_URL;
    const supabaseAnonKey =
      process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_SUPABASE_ANON_KEY;
    const lobbyCode = process.env.LOBBY_CODE ?? '440-8A2';
    const waitMs = process.env.WAIT_MS ?? '5000';

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing SUPABASE_URL and/or SUPABASE_ANON_KEY env vars for cron Lambda');
    }

    const pingFunction = new NodejsFunction(this, 'DailyVisitFunction', {
      entry: path.join(__dirname, '../lambda/visit.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      logRetention: RetentionDays.ONE_WEEK,
      environment: {
        WAIT_MS: waitMs,
        LOBBY_CODE: lobbyCode,
        SUPABASE_URL: supabaseUrl,
        SUPABASE_ANON_KEY: supabaseAnonKey
      },
      bundling: {
        minify: true,
        target: 'node20'
      }
    });

    new Rule(this, 'DailyVisitRule', {
      description: 'Trigger the Civ6Picker lobby keep-alive visit once per day.',
      schedule: Schedule.rate(cdk.Duration.days(1)),
      targets: [new LambdaFunction(pingFunction)]
    });
  }
}
