import { useEffect, useRef, useState } from 'react';
import type { Output, Transaction } from '../types/SecondTaskTypes';

const SecondTask = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isStart, setIsStart] = useState(false);
  const totalSum =
    transactions.reduce((acc, transaction) => {
      const sumPerTx =
        transaction.out?.reduce(
          (sum: number, output: Output) => sum + output.value,
          0,
        ) || 0;
      return acc + sumPerTx;
    }, 0) / 1e8;

  useEffect(() => {
    if (isStart) {
      socketRef.current = new WebSocket('wss://ws.blockchain.info/inv');

      socketRef.current.onopen = () => {
        socketRef.current?.send(
          JSON.stringify({
            op: 'unconfirmed_sub',
          }),
        );
      };

      socketRef.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.op === 'utx') {
          setTransactions((prev) => [msg.x, ...prev]);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
    return () => {
      socketRef.current?.close();
    };
  }, [isStart]);

  const handleStart = () => {
    setIsStart(true);
  };

  const handleStop = () => {
    socketRef.current?.close();
    setIsStart(false);
  };

  const handleReset = () => {
    setTransactions([]);
  };

  return (
    <section className="flex flex-col items-center justify-start min-h-[60vh] bg-white px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
        Second Task
      </h1>

      <h2 className="text-3l sm:text-4xl text-orange-500 mb-6">
        WebSocket-based Bitcoin Transactions
      </h2>

      <div className="relative w-full min-h-150 bg-gray-100 p-4">
        <div className="flex justify-center gap-10 my-5">
          <button
            className={`bg-green-800 text-white text-2xl rounded-xl w-50 py-2 ${isStart ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600 '}`}
            onClick={handleStart}
          >
            Start
          </button>

          <button
            className={`bg-red-800 text-white text-2xl rounded-xl w-50 py-2 ${!isStart ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-red-600'}`}
            onClick={handleStop}
          >
            Stop
          </button>

          <button
            className={`bg-yellow-600 text-white text-2xl rounded-xl w-50 py-2  ${transactions.length ? 'hover:bg-yellow-400 cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <table className="w-full border-collapse border-2 border-black text-left">
          <caption className="font-bold text-3xl text-center pt-20 pb-4">
            Sum = {totalSum} BTC
          </caption>

          <thead>
            <tr>
              {['From', 'To', 'Sum'].map((item) => (
                <th
                  key={item}
                  scope="col"
                  className="text-2xl border-2 border-black px-4 py-2"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="max-w-20 break-words whitespace-normal border-2 border-black px-4 py-2">
                  {transaction.inputs[0]?.prev_out?.addr || '-'}
                </td>
                <td className="max-w-20 break-words whitespace-normal border-2 border-black px-4 py-2">
                  {transaction.out[0]?.addr || '-'}
                </td>
                <td className="max-w-20 break-words whitespace-normal border-2 border-black px-4 py-2">
                  <div className="min-h-20">
                    {transaction.out ?
                      (
                        transaction.out.reduce(
                          (sum: number, output: Output) => sum + output.value,
                          0,
                        ) / 1e8
                      ).toFixed(8)
                    : '0.00000000'}{' '}
                    BTC
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SecondTask;
