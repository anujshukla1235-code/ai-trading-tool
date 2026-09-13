"use client";

import { useState } from "react";
import axios from "axios";
import { Search, AlertCircle, Loader2 } from "lucide-react";

type ParsedExperiment = {
  is_trading_related: boolean;
  instrument?: string | null;
  timeframe?: string | null;
  entry?: string | null;
  exit?: string | null;
  holding_period?: string | null;
  filters?: string[] | null;
  question?: string | null;
};

export default function ResearchAssistant() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [experiment, setExperiment] = useState<ParsedExperiment | null>(null);
  const [clarificationData, setClarificationData] = useState<Partial<ParsedExperiment>>({});
  
  // Backtest states
  const [backtesting, setBacktesting] = useState(false);
  const [backtestResult, setBacktestResult] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setExperiment(null);
    setClarificationData({});
    setBacktestResult(null);

    try {
      const { data } = await axios.post<ParsedExperiment>("/api/parse-query", { query });
      setExperiment(data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClarificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (experiment) {
      setExperiment({ ...experiment, ...clarificationData });
    }
  };

  const handleRunBacktest = async () => {
    if (!experiment) return;
    setBacktesting(true);
    try {
      const { data } = await axios.post("/api/mock-backtest", experiment);
      setBacktestResult(data);
    } catch (err) {
      alert("Mock backtest failed.");
    } finally {
      setBacktesting(false);
    }
  };

  const getMissingFields = () => {
    if (!experiment || !experiment.is_trading_related) return [];
    const fields: (keyof ParsedExperiment)[] = ["instrument", "timeframe", "entry", "exit", "holding_period"];
    return fields.filter(field => !experiment[field]);
  };

  const missingFields = getMissingFields();
  const needsClarification = missingFields.length > 0;

  const fieldPrompts: Record<string, { label: string; placeholder: string }> = {
    instrument: { label: "Instrument", placeholder: "e.g., NIFTY, AAPL" },
    timeframe: { label: "Timeframe", placeholder: "e.g., Daily, 5min" },
    entry: { label: "Entry Magnitude", placeholder: "What % fall counts as sharp? (e.g., >= 1%)" },
    exit: { label: "Exit Condition", placeholder: "e.g., Target 2%, SL 1%" },
    holding_period: { label: "Holding Period", placeholder: "e.g., 2 days, end of day" },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center space-y-3 mt-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-black">AI Trading Assistant</h1>
        <p className="text-gray-900 text-lg font-medium">Convert natural language questions into structured experiments.</p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Does buying NIFTY after a sharp fall work?"
          className="w-full p-4 pr-14 text-lg text-black font-medium placeholder:text-gray-700 rounded-2xl border-2 border-gray-400 shadow-sm focus:ring-4 focus:ring-blue-500/30 focus:border-blue-600 outline-none transition-all bg-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white bg-blue-700 rounded-xl hover:bg-blue-800 disabled:bg-blue-400 transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Search className="w-5 h-5 text-white" />}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-900 rounded-xl flex items-center gap-3 border-2 border-red-300 font-bold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {experiment && !experiment.is_trading_related && (
        <div className="p-6 bg-amber-100 text-amber-900 rounded-xl text-center border-2 border-amber-300">
          <p className="text-xl font-bold">This doesn't look like a trading query.</p>
          <p className="text-base mt-2 font-semibold">Please ask a question related to market instruments or trading strategies.</p>
        </div>
      )}

      {experiment?.is_trading_related && needsClarification && (
        <div className="p-6 bg-indigo-100 rounded-xl border-2 border-indigo-300 shadow-sm transition-all duration-300">
          <h3 className="text-2xl font-bold text-indigo-950 mb-2">We need a bit more info</h3>
          <p className="text-indigo-900 font-bold mb-6 text-lg">To properly structure this experiment, please clarify the missing details below:</p>
          
          <form onSubmit={handleClarificationSubmit} className="space-y-4">
            {missingFields.map((field) => (
              <div key={field} className="space-y-1.5">
                <label className="block text-base font-bold text-indigo-950">
                  {fieldPrompts[field]?.label || field}
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 rounded-xl border-2 border-indigo-400 focus:ring-4 focus:ring-indigo-500 outline-none bg-white text-black font-medium placeholder:text-gray-700"
                  value={(clarificationData[field] as string) || ""}
                  onChange={(e) => setClarificationData({ ...clarificationData, [field]: e.target.value })}
                  placeholder={fieldPrompts[field]?.placeholder || ""}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-lg rounded-xl transition-colors mt-4 shadow-md"
            >
              Generate Final Experiment
            </button>
          </form>
        </div>
      )}

      {experiment?.is_trading_related && !needsClarification && (
        <div className="p-6 bg-white rounded-xl border-2 border-gray-300 shadow-md transition-all duration-500">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
            <h2 className="text-3xl font-extrabold text-black">Structured Experiment</h2>
            <span className="px-4 py-1 bg-green-200 text-green-900 text-sm font-extrabold rounded-full tracking-wide border border-green-400">READY</span>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Instrument</span>
              <p className="text-xl font-bold text-black mt-1">{experiment.instrument}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Timeframe</span>
              <p className="text-xl font-bold text-black mt-1">{experiment.timeframe}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300 md:col-span-2">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Entry Condition</span>
              <p className="text-xl font-bold text-black mt-1">{experiment.entry}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300 md:col-span-2">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Exit Condition</span>
              <p className="text-xl font-bold text-black mt-1">{experiment.exit}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Holding Period</span>
              <p className="text-xl font-bold text-black mt-1">{experiment.holding_period}</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl border-2 border-slate-300">
              <span className="text-sm text-slate-900 font-extrabold uppercase tracking-wider">Filters</span>
              <p className="text-xl font-bold text-black mt-1">
                {experiment.filters?.length ? experiment.filters.join(", ") : "None"}
              </p>
            </div>
            {experiment.question && (
              <div className="p-4 bg-blue-100 rounded-xl border-2 border-blue-400 md:col-span-2">
                <span className="text-sm text-blue-950 font-extrabold uppercase tracking-wider">Core Question</span>
                <p className="text-xl font-bold text-black mt-1">{experiment.question}</p>
              </div>
            )}
          </div>

          {/* Bonus Mock Backtest Section */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            {!backtestResult ? (
              <button
                onClick={handleRunBacktest}
                disabled={backtesting}
                className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-xl transition-colors shadow-md disabled:bg-gray-600 flex items-center justify-center gap-2"
              >
                {backtesting ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
                {backtesting ? "Running Simulation..." : "Run Backtest (Demo/Simulated)"}
              </button>
            ) : (
              <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-extrabold text-emerald-950">Simulated Results</h3>
                  <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-bold uppercase rounded-md">Demo Data</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Trades</span>
                    <p className="text-xl font-black text-black">{backtestResult.trades}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Win Rate</span>
                    <p className="text-xl font-black text-black">{backtestResult.win_rate}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Avg Return</span>
                    <p className="text-xl font-black text-black">{backtestResult.avg_return}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Sharpe</span>
                    <p className="text-xl font-black text-black">{backtestResult.sharpe_ratio}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-emerald-800 text-center opacity-80">{backtestResult.note}</p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
