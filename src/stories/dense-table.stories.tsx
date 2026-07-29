import { StatusBadge } from "../status-badge/status-badge";

const ROWS = [
  ["hello@acme.com", "Welcome to Acme", "delivered", "2m ago"],
  ["b@customer.io", "Reset your password", "sent", "9m ago"],
  ["c@bounce.example", "Invoice #1042", "bounced", "1h ago"],
];

export const DenseTable = () => (
  <div className="story-pad">
    <table className="w-full table-dense">
      <thead>
        <tr><th>Recipient</th><th>Subject</th><th>Status</th><th>Age</th></tr>
      </thead>
      <tbody>
        {ROWS.map(([to, subject, status, age]) => (
          <tr key={to}>
            <td className="data">{to}</td>
            <td>{subject}</td>
            <td><StatusBadge value={status} /></td>
            <td className="story-dim">{age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
