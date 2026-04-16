import { chromium } from 'playwright';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
  totalSize: number;
  requests: number;
}

async function measurePerformance(url: string): Promise<PerformanceMetrics> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const metrics: PerformanceMetrics = {
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    ttfb: 0,
    totalSize: 0,
    requests: 0,
  };
  
  await page.goto(url, { waitUntil: 'networkidle' });
  
  const perf = await page.evaluate(() => {
    const entries = performance.getEntriesByType('navigation')[0] as any;
    const paint = performance.getEntriesByType('paint');
    
    return {
      loadEventEnd: entries.loadEventEnd,
      domContentLoaded: entries.domContentLoadedEventEnd,
      firstPaint: paint.find((e: any) => e.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find((e: any) => e.name === 'first-contentful-paint')?.startTime || 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: (entries as any).cumulativeLayoutShift || 0,
      transferSize: (entries as any).transferSize || 0,
    };
  });
  
  metrics.ttfb = perf.domContentLoaded;
  metrics.fcp = perf.firstContentfulPaint;
  metrics.cls = perf.cumulativeLayoutShift;
  metrics.totalSize = perf.transferSize;
  
  await browser.close();
  
  return metrics;
}

function evaluateMetrics(metrics: PerformanceMetrics): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  
  if (metrics.fcp > 2500) {
    issues.push(`⚠️ FCP lento: ${metrics.fcp}ms (ideal < 1800ms)`);
    score -= 20;
  } else {
    issues.push(`✅ FCP: ${metrics.fcp}ms`);
  }
  
  if (metrics.ttfb > 800) {
    issues.push(`⚠️ TTFB lento: ${metrics.ttfb}ms (ideal < 600ms)`);
    score -= 15;
  } else {
    issues.push(`✅ TTFB: ${metrics.ttfb}ms`);
  }
  
  if (metrics.cls > 0.1) {
    issues.push(`⚠️ CLS alto: ${metrics.cls} (ideal < 0.1)`);
    score -= 25;
  } else {
    issues.push(`✅ CLS: ${metrics.cls}`);
  }
  
  const sizeKB = metrics.totalSize / 1024;
  if (sizeKB > 500) {
    issues.push(`⚠️ Tamanho grande: ${sizeKB.toFixed(1)}KB (ideal < 500KB)`);
    score -= 15;
  } else {
    issues.push(`✅ Tamanho: ${sizeKB.toFixed(1)}KB`);
  }
  
  return { score: Math.max(0, score), issues };
}

async function main() {
  const url = process.env.PERF_URL || 'http://localhost:3000';
  
  console.log(`\n🔍 Performance Check: ${url}\n`);
  console.log('='.repeat(50));
  
  try {
    const metrics = await measurePerformance(url);
    const { score, issues } = evaluateMetrics(metrics);
    
    console.log('\n📊 Métricas:');
    console.log(`  TTFB: ${metrics.ttfb}ms`);
    console.log(`  FCP: ${metrics.fcp}ms`);
    console.log(`  CLS: ${metrics.cls}`);
    console.log(`  Tamanho: ${(metrics.totalSize / 1024).toFixed(1)}KB`);
    
    console.log('\n📋 Avaliação:');
    issues.forEach(i => console.log(`  ${i}`));
    
    console.log(`\n🎯 Score: ${score}/100`);
    
    if (score < 70) {
      console.log('\n❌ Performance abaixo do acceptable');
      process.exit(1);
    } else if (score < 90) {
      console.log('\n🟡 Performance moderada - pode melhorar');
    } else {
      console.log('\n✅ Performance boa!');
    }
  } catch (error) {
    console.error('❌ Erro ao medir performance:', error);
    process.exit(1);
  }
}

main();