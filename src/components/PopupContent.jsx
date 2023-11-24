import "./PopupContent.scss";

export default function PopupContent({ label, area }) {
	return (
		<table className="popup">
			<tbody>
				<tr>
					<td>Nome:</td>
					<td>{label}</td>
				</tr>
				<tr>
					<td>Área:</td>
					<td>{area}</td>
				</tr>
			</tbody>
		</table>
	);
}
