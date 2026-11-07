import React from "react";
import { Check, Minus, ShieldCheck, Sparkles, GitCompareArrows } from "lucide-react";

const comparisonRows = [
  {
    feature: "Primary focus",
    Other: "General-purpose AI assistance",
    COSXIA: "AI-powered source-code security analysis",
  },
  {
    feature: "Vulnerability detection",
    other: "Can identify issues when prompted",
    nova: "Designed to detect source-code vulnerabilities",
  },
  {
    feature: "Security-focused explanations",
    other: "Depends on the model and prompt",
    nova: "Explains detected security issues",
  },
  {
    feature: "Remediation guidance",
    other: "Can suggest code improvements",
    nova: "Provides vulnerability-focused remediation recommendations",
  },
  {
    feature: "Code security workflow",
    other: "Usually requires a general chat workflow",
    nova: "Built around code security analysis",
  },
  {
    feature: "Results presentation",
    other: "Conversational response",
    nova: "Structured security findings and recommendations",
  },
];

const Compare = () => {
  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-slate-900 sm:px-8 lg:px-10">
      <main className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Compare <span className="text-purple-500">LLMs</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            See how a general-purpose language model compares with COSXIA's
            security-focused code analysis workflow.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[minmax(130px,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-slate-200 bg-slate-50">
            <div className="flex items-center px-4 py-5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6"> Feature </div>
            <div className="border-l border-slate-200 px-4 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600">
                  <GitCompareArrows size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Other LLM</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">General-purpose model</p>
                </div>
              </div>
            </div>
            <div className="border-l border-violet-100 bg-violet-50/70 px-4 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nav/10 text-purple-500">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">COSXIA</p>
                  <p className="mt-0.5 text-[11px] font-medium text-purple-500">Our LLM</p>
                </div>
              </div>
            </div>
          </div>

          {comparisonRows.map((row, index) => (
            <div key={row.feature} className={`grid grid-cols-[minmax(130px,0.85fr)_minmax(0,1fr)_minmax(0,1fr)] ${ index !== comparisonRows.length - 1 ? "border-b border-slate-100" : "" }`}>
              <div className="flex items-center px-4 py-5 text-xs font-semibold text-slate-700 sm:px-6 sm:text-sm">
                {row.feature}
              </div>
              <div className="flex items-center border-l border-slate-100 px-4 py-5 text-xs leading-5 text-slate-600 sm:px-6 sm:text-sm">
                {row.other}
              </div>
              <div className="flex items-center gap-2 border-l border-violet-100 bg-violet-50/30 px-4 py-5 text-xs leading-5 text-slate-700 sm:px-6 sm:text-sm">
                <Check size={15} className="shrink-0 text-violet-600" />
                {row.nova}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-500">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-violet-600" />
          <p>
            This table describes NOVA's intended product focus, not benchmark
            results. Actual detection quality depends on the model, code,
            configuration, and evaluation.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Compare;
