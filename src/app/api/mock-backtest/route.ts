import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // In a real app, this would receive the structured JSON and pass it to a python engine
    const experiment = await req.json();
    
    // Simulate backtesting delay (e.g., 2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock results
    const mockResult = {
      trades: 42,
      win_rate: "58.5%",
      avg_return: "+1.2%",
      sharpe_ratio: "1.4",
      note: "Demo/Simulated Result — Not real financial data"
    };

    return NextResponse.json(mockResult);
  } catch (error) {
    return NextResponse.json({ error: "Failed to run mock backtest" }, { status: 500 });
  }
}
