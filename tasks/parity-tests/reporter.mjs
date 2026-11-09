export default async function* (events) {
  const result={passed:0,failed:0,assertions:0,invalid:0};
  for await (const event of events) {
    if(event.type==='test:pass' || event.type==='test:fail') {
      const d=event.data;
      if(d.nesting!==0 || d.details.type!=='test' || d.skip || d.todo) result.invalid++;
      if(event.type==='test:pass') result.passed++;
      else {
        result.failed++;
        if(d.details.error?.failureType==='testCodeFailure' && d.details.error?.cause?.code==='ERR_ASSERTION') result.assertions++;
        else result.invalid++;
      }
    }
  }
  yield 'TEST_RESULT '+JSON.stringify(result)+'\n';
}
