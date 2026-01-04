function Stat({ label, value }) {
return (
<div>
<div className="text-xl font-bold">{value}</div>
<div className="text-xs text-gray-500">{label}</div>
</div>
);
}

export default Stat;