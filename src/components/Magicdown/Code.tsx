import { useRef, type ReactNode } from "react";
import { capitalize, get } from "radash";

import "./highlight.css";

const langAlias = {
  ino: "Arduino",
  sh: "Bash",
  zsh: "Base",
  h: "C",
  cpp: "C++",
  cc: "C++",
  "h++": "C++",
  hpp: "C++",
  hh: "C++",
  hxx: "C++",
  cxx: "C++",
  csharp: "C#",
  cs: "C#",
  css: "CSS",
  patch: "Diff",
  golang: "Go",
  graphql: "GraphQL",
  gql: "GraphQL",
  ini: "INI",
  toml: "TOML",
  jsp: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
  jsx: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  json: "JSON",
  jsonc: "JSON",
  kt: "Kotlin",
  kts: "Kotlin",
  pluto: "Lua",
  mk: "Makefile",
  mak: "Makefile",
  make: "Makefile",
  md: "Markdown",
  mkdown: "Markdown",
  mkd: "Markdown",
  objectivec: "Objective-C",
  mm: "Objective-C",
  objc: "Objective-C",
  "obj-c": "Objective-C",
  "obj-c++": "Objective-C",
  "objective-c++": "Objective-C",
  pl: "Perl",
  pm: "Perl",
  plaintext: "Plain text",
  text: "Plain text",
  txt: "Plain text",
  py: "Python",
  gyp: "Python",
  ipython: "Python",
  rb: "Ruby",
  gemspec: "Ruby",
  podspec: "Ruby",
  thor: "Ruby",
  irb: "Ruby",
  rs: "Rust",
  scss: "SCSS",
  shell: "Shell Session",
  console: "Shell Session",
  shellsession: "Shell Session",
  sql: "SQL",
  typescript: "TypeScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  mts: "TypeScript",
  cts: "TypeScript",
  vbnet: "Visual Basic .NET",
  vb: "Visual Basic .NET",
  wasm: "WebAssembly",
  xml: "XML",
  html: "HTML",
  xhtml: "XML",
  rss: "XML",
  atom: "XML",
  xjb: "XML",
  xsd: "XML",
  xsl: "XML",
  plist: "XML",
  wsf: "XML",
  svg: "XML",
  yaml: "YAML",
  yml: "YAML",
} as const;

type Props = {
  children: ReactNode;
  lang: string;
};

function getLangAlias(lang: string): string {
  return get(langAlias, lang, capitalize(lang)) || "";
}

function Code({ children, lang }: Props) {
  const codeWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex h-10 w-full items-center justify-between overflow-x-auto break-all rounded-t bg-gray-200 pl-4 pr-3 text-sm text-slate-500 dark:bg-[rgb(31,41,55)]">
        {lang ? <span title={lang}>{getLangAlias(lang)}</span> : <span></span>}
      </div>
      <div ref={codeWrapperRef} className="overflow-auto rounded-b">
        {children}
      </div>
    </>
  );
}

export default Code;
