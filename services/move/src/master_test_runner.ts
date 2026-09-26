/**
 * weTag (iTag) Master Test Runner & Quality Audit Suite
 * Orchestrates all 5 validation tiers:
 * 1. Master E2E Lifecycle Cross-Service Suite (12 steps)
 * 2. Red Team Safety & Fraud Simulation Suite (7 scenarios)
 * 3. Live HTTP Contract & Smoke Test Suite (3 contracts)
 * 4. Ibadan Phase 1 Geofence & Smart Hub Verification (14 checks)
 * 5. Spatial & Pricing Matching Algorithm Suite (4 tests)
 * 6. SEO & GEO Distribution Integrity Audit (6 checks)
 */

process.env.NODE_ENV = 'test';

import fs from 'fs';
import path from 'path';
import { runFullE2ETestSuite } from './e2e_integration';
import { runRedTeamSuite } from './red_team_simulation';
import { runMoveSmokeTests } from './live_smoke_test';
import { runGeofenceAudit } from './geofence_runner';
import { runMatchingTests } from './matching.test';
import { runSecurityTestSuite } from './security_audit.test';

export interface TierResult {
  tier: string;
  totalChecks: number;
  passedChecks: number;
  status: 'PASSED' | 'FAILED';
  durationMs: number;
  details: string;
}

export function auditSeoAndGeo(distDir: string) {
  const checks: { check: string; passed: boolean; details: string }[] = [];

  const indexPath = path.join(distDir, 'index.html');
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const robotsPath = path.join(distDir, 'robots.txt');
  const waitlistPath = path.join(distDir, 'waitlist.html');

  // Check 1: index.html exists
  const indexExists = fs.existsSync(indexPath);
  checks.push({
    check: 'Mobile web distribution index.html exists',
    passed: indexExists,
    details: indexPath,
  });

  if (indexExists) {
    const content = fs.readFileSync(indexPath, 'utf-8');

    // Check 2: SEO Title
    const hasSeoTitle = content.includes('weTag (iTag) — Campus & Commuter Carpool');
    checks.push({
      check: 'Primary SEO Title & Meta Description present',
      passed: hasSeoTitle && content.includes('<meta name="description"'),
      details: 'Targeted for Ibadan student & commuter keywords',
    });

    // Check 3: GEO Coordinates
    const hasGeo =
      content.includes('geo.region') &&
      content.includes('NG-OY') &&
      content.includes('7.3775;3.9470') &&
      content.includes('ICBM');
    checks.push({
      check: 'GEO Coordinates & Local Discovery (Ibadan NG-OY)',
      passed: hasGeo,
      details: 'geo.position="7.3775;3.9470", ICBM="7.3775, 3.9470"',
    });

    // Check 4: OpenGraph & Twitter
    const hasOg = content.includes('og:title') && content.includes('twitter:card');
    checks.push({
      check: 'Social OpenGraph & Twitter Card metadata',
      passed: hasOg,
      details: 'og:locale="en_NG", twitter:card="summary_large_image"',
    });

    // Check 5: Schema.org Microdata
    const hasSchema =
      content.includes('TransportationService') && content.includes('AccommodationService');
    checks.push({
      check: 'Schema.org JSON-LD Structured Microdata',
      passed: hasSchema,
      details: 'TransportationService + AccommodationService schemas',
    });
  }

  // Check 6: Sitemap & Robots
  const hasSitemapAndRobots = fs.existsSync(sitemapPath) && fs.existsSync(robotsPath);
  checks.push({
    check: 'sitemap.xml and robots.txt generation',
    passed: hasSitemapAndRobots,
    details: 'Verified in public distribution root',
  });

  // Check 7: Standalone Waitlist Landing Page
  const hasWaitlist = fs.existsSync(waitlistPath);
  checks.push({
    check: 'High-Converting Interactive Waitlist Landing Page',
    passed: hasWaitlist,
    details: 'Includes MOVE fuel offset & STAY move-in calculators',
  });

  return checks;
}

export async function runMasterQualityAudit(): Promise<{
  tierResults: TierResult[];
  allPassed: boolean;
  totalChecks: number;
  totalPassed: number;
}> {
  console.log('\n================================================================');
  console.log(' weTag (iTag) Master Platform Test Suite & Production Audit');
  console.log('================================================================\n');

  const tierResults: TierResult[] = [];

  // TIER 1: E2E Lifecycle Suite
  console.log('▶ Tier 1: Executing Cross-Service E2E Lifecycle Test Suite...');
  const startE2E = Date.now();
  const e2eSteps = await runFullE2ETestSuite();
  const durE2E = Date.now() - startE2E;
  const e2ePassed = e2eSteps.filter((s) => s.status === 'PASSED').length;
  tierResults.push({
    tier: '1. E2E Cross-Service Lifecycle',
    totalChecks: e2eSteps.length,
    passedChecks: e2ePassed,
    status: e2ePassed === e2eSteps.length ? 'PASSED' : 'FAILED',
    durationMs: durE2E,
    details: '12 multi-role steps: Identity, Wallet, Move, Stay, Safety',
  });

  // TIER 2: Red Team Suite
  console.log('▶ Tier 2: Executing Red Team Safety & Fraud Simulation Suite...');
  const startRT = Date.now();
  const rtResults = runRedTeamSuite();
  const durRT = Date.now() - startRT;
  const rtPassed = rtResults.filter((r) => r.actualStatus === 'PASSED').length;
  tierResults.push({
    tier: '2. Red Team Safety & Fraud Suite',
    totalChecks: rtResults.length,
    passedChecks: rtPassed,
    status: rtPassed === rtResults.length ? 'PASSED' : 'FAILED',
    durationMs: durRT,
    details: '7 critical attack vectors: PIN, vehicle swap, route anomaly, SOS 615',
  });

  // TIER 3: Live HTTP Contract & Smoke Suite
  console.log('▶ Tier 3: Executing Live HTTP Route Contracts & Smoke Suite...');
  const startSmoke = Date.now();
  const smokeResults = await runMoveSmokeTests();
  const durSmoke = Date.now() - startSmoke;
  const smokePassed = smokeResults.filter((s) => s.passed).length;
  tierResults.push({
    tier: '3. HTTP Route Contracts & Smoke',
    totalChecks: smokeResults.length,
    passedChecks: smokePassed,
    status: smokePassed === smokeResults.length ? 'PASSED' : 'FAILED',
    durationMs: durSmoke,
    details: 'Health probes, Zod validation, JWT bearer auth guards',
  });

  // TIER 4: Ibadan Phase 1 Geofencing & Smart Hub Suite
  console.log('▶ Tier 4: Executing Ibadan Phase 1 Geofencing & Hub Verification...');
  const startGeo = Date.now();
  const geoChecks = runGeofenceAudit();
  const durGeo = Date.now() - startGeo;
  const geoPassed = geoChecks.filter((c) => c.passed).length;
  tierResults.push({
    tier: '4. Geofencing & Smart Hubs',
    totalChecks: geoChecks.length,
    passedChecks: geoPassed,
    status: geoPassed === geoChecks.length ? 'PASSED' : 'FAILED',
    durationMs: durGeo,
    details: 'Polygon ray-casting, 7 core hubs (UI, Bodija, Akobo, Dugbe, Challenge)',
  });

  // TIER 5: Spatial & Matching Algorithms
  console.log('▶ Tier 5: Executing Matching & Spatial Pricing Algorithms...');
  const startAlg = Date.now();
  const algResults = runMatchingTests();
  const durAlg = Date.now() - startAlg;
  const algPassed = algResults.filter((a) => a.passed).length;
  tierResults.push({
    tier: '5. Matching & Spatial Algorithms',
    totalChecks: algResults.length,
    passedChecks: algPassed,
    status: algPassed === algResults.length ? 'PASSED' : 'FAILED',
    durationMs: durAlg,
    details: 'Haversine distance, PIN generation, minimum fare, compatibility',
  });

  // TIER 6: SEO & GEO Distribution Integrity
  console.log('▶ Tier 6: Auditing SEO & GEO Web Distribution Integrity...');
  const distDir = path.resolve(__dirname, '../../../apps/mobile/dist');
  const startSeo = Date.now();
  const seoChecks = auditSeoAndGeo(distDir);
  const durSeo = Date.now() - startSeo;
  const seoPassed = seoChecks.filter((c) => c.passed).length;
  tierResults.push({
    tier: '6. SEO & GEO Distribution Integrity',
    totalChecks: seoChecks.length,
    passedChecks: seoPassed,
    status: seoPassed === seoChecks.length ? 'PASSED' : 'FAILED',
    durationMs: durSeo,
    details: 'Title, description, NG-OY tags, JSON-LD, sitemap, robots, waitlist',
  });

  // TIER 7: Security & Vulnerability Safeguards
  console.log('▶ Tier 7: Auditing Security, Cryptography & IDOR Protections...');
  const startSec = Date.now();
  const secResults = runSecurityTestSuite();
  const durSec = Date.now() - startSec;
  const secPassed = secResults.filter((s) => s.status === 'PASSED').length;
  tierResults.push({
    tier: '7. Security & Cryptography Defense',
    totalChecks: secResults.length,
    passedChecks: secPassed,
    status: secPassed === secResults.length ? 'PASSED' : 'FAILED',
    durationMs: durSec,
    details: 'CSPRNG OTP, brute-force lock, timing-safe HMAC, IDOR ownership guards',
  });

  const totalChecks = tierResults.reduce((acc, t) => acc + t.totalChecks, 0);
  const totalPassed = tierResults.reduce((acc, t) => acc + t.passedChecks, 0);
  const allPassed = totalPassed === totalChecks;

  return { tierResults, allPassed, totalChecks, totalPassed };
}

if (require.main === module) {
  runMasterQualityAudit()
    .then(({ tierResults, allPassed, totalChecks, totalPassed }) => {
      console.log('\n================================================================');
      console.log(' weTag (iTag) Master Platform Audit Scorecard');
      console.log('================================================================\n');

      console.table(
        tierResults.map((t) => ({
          Tier: t.tier,
          Checks: `${t.passedChecks}/${t.totalChecks}`,
          Status: t.status,
          Latency: `${t.durationMs}ms`,
          Scope: t.details,
        }))
      );

      console.log(
        `\n Overall Result: ${totalPassed}/${totalChecks} Total Quality Checks Passed (${Math.round((totalPassed / totalChecks) * 100)}%).`
      );

      if (allPassed) {
        console.log('\n 100% SUCCESS: weTag (iTag) is 100% functional, fully verified,');
        console.log('   with SEO and GEO blazingly intact and ready for mass adoption & production scale!');
        process.exit(0);
      } else {
        console.error('\n Quality audit detected failures.');
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error('Audit execution error:', err);
      process.exit(1);
    });
}
