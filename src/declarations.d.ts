declare const graphql: (query: TemplateStringsArray) => void;

declare module 'thousands' {
  function thousands(number: number, separator?: string): string;
  export = thousands;
}
