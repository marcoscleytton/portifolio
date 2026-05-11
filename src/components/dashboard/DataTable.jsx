import React from 'react';

const transactions = [
  { id: '#TR-8821', store: 'Supermercado Alpha', amount: 'R$ 12.450,00', status: 'Completed', date: 'Oct 12, 2023' },
  { id: '#TR-8822', store: 'Varejo Central', amount: 'R$ 8.120,50', status: 'Pending', date: 'Oct 11, 2023' },
  { id: '#TR-8823', store: 'Hiper Fest', amount: 'R$ 25.000,00', status: 'Processing', date: 'Oct 10, 2023' },
  { id: '#TR-8824', store: 'Express Store', amount: 'R$ 3.450,00', status: 'Completed', date: 'Oct 10, 2023' },
  { id: '#TR-8825', store: 'Market Place', amount: 'R$ 15.600,00', status: 'Failed', date: 'Oct 09, 2023' },
];

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Processing: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Failed: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
};

const DataTable = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-xl font-bold dark:text-white">Recent Transactions</h3>
        <button className="text-orange-500 font-semibold text-sm hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-sm uppercase tracking-wider">
              <th className="px-8 py-4 font-medium">Transaction ID</th>
              <th className="px-8 py-4 font-medium">Store</th>
              <th className="px-8 py-4 font-medium">Amount</th>
              <th className="px-8 py-4 font-medium">Status</th>
              <th className="px-8 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {transactions.map((tr) => (
              <tr key={tr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <td className="px-8 py-5 font-medium text-slate-900 dark:text-white">{tr.id}</td>
                <td className="px-8 py-5 text-slate-600 dark:text-slate-400">{tr.store}</td>
                <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{tr.amount}</td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusStyles[tr.status]}`}>
                    {tr.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-slate-500 text-sm">{tr.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
