'use client';

import React, { useState } from 'react';
import { PromptChain } from '@/types';
import { Terminal, Copy, Check, Play, Sparkles, RefreshCw, Layers, ShieldAlert, Cpu, DollarSign } from 'lucide-react';

interface PromptSimulatorProps {
  chains: PromptChain[];
  roleTitle: string;
}

export default function PromptSimulator({ chains, roleTitle }: PromptSimulatorProps) {
  const [selectedChainIndex, setSelectedChainIndex] = useState(0);
  const activeChain = chains[selectedChainIndex] || chains[0];

  const [variables, setVariables] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    activeChain?.variables?.forEach((v) => {
      initial[v.name] = v.defaultValue;
    });
    return initial;
  });

  const [promptFormat, setPromptFormat] = useState<'claude' | 'chatgpt'>('claude');
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleSelectChain = (index: number) => {
    setSelectedChainIndex(index);
    const newChain = chains[index];
    const newVars: Record<string, string> = {};
    newChain?.variables?.forEach((v) => {
      newVars[v.name] = v.defaultValue;
    });
    setVariables(newVars);
  };

  const handleVariableChange = (name: string, val: string) => {
    setVariables((prev) => ({ ...prev, [name]: val }));
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  // Replace variables in raw prompt based on target format
  const basePromptTemplate =
    promptFormat === 'claude'
      ? activeChain?.fullPrompt || ''
      : activeChain?.chatGptPrompt || activeChain?.fullPrompt || '';

  let renderedPrompt = basePromptTemplate;
  Object.entries(variables).forEach(([k, v]) => {
    renderedPrompt = renderedPrompt.split(`{{${k}}}`).join(v || `[${k}]`);
  });

  const copyToClipboard = (text: string, type: 'prompt' | 'output') => {
    navigator.clipboard.writeText(text);
    if (type === 'prompt') {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  return (
    <div id="playground" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-8 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Prompt Sandbox</span>
          </div>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Live AI Workflow Simulator for {roleTitle}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Select a production prompt chain, adjust client variables, and test output generation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span>{activeChain.recommendedModel}</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>~{activeChain.estimatedTokens} Tokens</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-emerald-400 font-semibold">
            <DollarSign className="h-3.5 w-3.5" />
            <span>${activeChain.estimatedCostUsd} / run</span>
          </span>
        </div>
      </div>

      {/* Chain Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {chains.map((chain, idx) => (
          <button
            key={chain.id}
            onClick={() => handleSelectChain(idx)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              selectedChainIndex === idx
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <span className="font-mono opacity-80 mr-1.5">[{chain.id}]</span>
            <span>{chain.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Inputs vs Output */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Variables & Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>Prompt Input Variables</span>
              </span>

              {/* Target Format Switcher */}
              <div className="flex rounded-md bg-slate-800 p-0.5 border border-slate-700 text-[10px]">
                <button
                  onClick={() => setPromptFormat('claude')}
                  className={`px-2 py-0.5 rounded font-medium transition ${
                    promptFormat === 'claude'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Claude (XML)
                </button>
                <button
                  onClick={() => setPromptFormat('chatgpt')}
                  className={`px-2 py-0.5 rounded font-medium transition ${
                    promptFormat === 'chatgpt'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ChatGPT
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Objective:</strong> {activeChain.objective}
            </p>

            <div className="space-y-3.5 pt-1">
              {activeChain.variables.map((v) => (
                <div key={v.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-medium text-emerald-400">
                      &#123;&#123;{v.name}&#125;&#125;
                    </label>
                  </div>
                  <input
                    type="text"
                    value={variables[v.name] || ''}
                    onChange={(e) => handleVariableChange(v.name, e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                    placeholder={v.description}
                  />
                  <p className="text-[10px] text-slate-500">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50 shadow-md shadow-emerald-500/20 active:scale-98"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Output...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Simulate AI Output</span>
                </>
              )}
            </button>

            <button
              onClick={() => copyToClipboard(renderedPrompt, 'prompt')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              title="Copy Raw Prompt"
            >
              {copiedPrompt ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedPrompt ? 'Copied' : `Copy (${promptFormat === 'claude' ? 'Claude' : 'GPT'})`}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Output View (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Verified Model Work Product
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(activeChain.sampleOutput, 'output')}
              className="flex items-center gap-1.5 rounded border border-slate-700/80 bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              {copiedOutput ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedOutput ? 'Copied Output' : 'Copy Output'}</span>
            </button>
          </div>

          {/* Rendered Output Body */}
          <div className="mt-4 flex-1 overflow-y-auto max-h-[460px] rounded-lg bg-slate-900/70 p-4 font-mono text-xs text-slate-200 leading-relaxed border border-slate-800">
            {isSimulating ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                <RefreshCw className="h-6 w-6 animate-spin text-emerald-400" />
                <p className="text-xs">Applying Chain-of-Thought reasoning & regulatory constraints...</p>
              </div>
            ) : (
              <div className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed space-y-2">
                {activeChain.sampleOutput}
              </div>
            )}
          </div>

          <div className="mt-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-300/90 leading-tight">
              <strong>Execution Tip:</strong> {activeChain.practicalUseNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

