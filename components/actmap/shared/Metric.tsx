type MetricProps = {
  label: string;
  value: string | number;
  note?: string;
};

export default function Metric({ label, value, note }: MetricProps) {
  return (
    <div className="px-4 py-4">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-2 text-[26px] font-medium leading-none tracking-tight text-foreground">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {note && <p className="mt-2 text-[12.5px] text-muted">{note}</p>}
    </div>
  );
}
