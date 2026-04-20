type Status =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN";

const statusStyles: Record<Status, string> = {
  APPLIED: "bg-status-applied-bg text-status-applied-text border border-status-applied-border",
  SCREENING: "bg-status-screening-bg text-status-screening-text border border-status-screening-border",
  INTERVIEW: "bg-status-interview-bg text-status-interview-text border border-status-interview-border",
  OFFER: "bg-status-offer-bg text-status-offer-text border border-status-offer-border",
  REJECTED: "bg-status-rejected-bg text-status-rejected-text border border-status-rejected-border",
  WITHDRAWN: "bg-status-withdrawn-bg text-status-withdrawn-text border border-status-withdrawn-border",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-md ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}