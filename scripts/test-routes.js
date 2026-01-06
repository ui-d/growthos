#!/usr/bin/env node

/**
 * Route Verification Script
 *
 * Tests that all important routes return HTTP 200.
 * Run after building the app: pnpm build && pnpm start
 * Then in another terminal: node scripts/test-routes.js
 *
 * Usage:
 *   node scripts/test-routes.js [baseUrl]
 *
 * Examples:
 *   node scripts/test-routes.js                    # Uses http://localhost:3000
 *   node scripts/test-routes.js http://localhost:3001
 *   node scripts/test-routes.js https://growthos.fyi
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

// All routes that should return 200
const routes = [
  // Main pages
  '/',
  '/builder',
  '/examples',
  '/modules',
  '/library',
  '/about',

  // Documentation pages
  '/documentation',
  '/docs',
  '/guides',
  '/architecture',

  // Product pages
  '/pricing',

  // Resource pages
  '/blog',
  '/changelog',

  // Company pages
  '/careers',
  '/contact',
  '/partners',

  // Legal pages
  '/privacy',
  '/terms',
  '/cookies',
  '/license',

  // Meta files
  '/sitemap.xml',
  '/robots.txt',
];

// Routes that should have meaningful content (not just loading spinners)
const contentChecks = {
  '/builder': ['Growth OS Builder', 'Product', 'Activation'],
  '/': ['Growth OS'],
  '/examples': ['Growth OS Examples'],
  '/modules': ['Modules'],
  '/documentation': ['Documentation', 'Modules', 'Guides', 'Architecture', 'Examples'],
  '/architecture': ['Architecture', 'KPI Tree', 'Activation Framework'],
  '/guides': ['Guides', 'Getting Started'],
};

async function testRoute(route) {
  const url = `${BASE_URL}${route}`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GrowthOS-Route-Tester/1.0',
      },
    });

    const status = response.status;
    const contentType = response.headers.get('content-type') || '';

    let passed = status === 200;
    let issues = [];

    if (!passed) {
      issues.push(`HTTP ${status}`);
    }

    // Check content for HTML pages
    if (passed && contentType.includes('text/html') && contentChecks[route]) {
      const html = await response.text();
      for (const expectedText of contentChecks[route]) {
        if (!html.includes(expectedText)) {
          issues.push(`Missing: "${expectedText}"`);
          passed = false;
        }
      }
    }

    return { route, url, status, passed, issues };
  } catch (error) {
    return {
      route,
      url,
      status: 0,
      passed: false,
      issues: [`Network error: ${error.message}`]
    };
  }
}

async function main() {
  console.log(`\n🔍 Testing routes against: ${BASE_URL}\n`);
  console.log('='.repeat(60));

  const results = await Promise.all(routes.map(testRoute));

  let passCount = 0;
  let failCount = 0;

  for (const result of results) {
    if (result.passed) {
      console.log(`✅ ${result.route}`);
      passCount++;
    } else {
      console.log(`❌ ${result.route}`);
      for (const issue of result.issues) {
        console.log(`   └─ ${issue}`);
      }
      failCount++;
    }
  }

  console.log('='.repeat(60));
  console.log(`\n📊 Results: ${passCount} passed, ${failCount} failed\n`);

  if (failCount > 0) {
    console.log('❌ Some routes failed. Please fix the issues above.\n');
    process.exit(1);
  } else {
    console.log('✅ All routes passed!\n');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
});
