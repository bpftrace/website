import includeDefaultLanguages from '@theme-original/prism-include-languages';
import registerBpftrace from '@site/src/prism/bpftrace';

export default function prismIncludeLanguages(Prism) {
  includeDefaultLanguages(Prism);
  registerBpftrace(Prism);
}
