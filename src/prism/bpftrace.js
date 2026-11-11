module.exports = function registerBpftrace(Prism) {
  Prism.languages.bpftrace = {
    comment: [
      {pattern: /^#![^\r\n]*/, greedy: true},
      {pattern: /\/\*[\s\S]*?(?:\*\/|$)/, greedy: true},
      {pattern: /\/\/[^\r\n]*/, greedy: true},
    ],
  };
};
