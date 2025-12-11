export default function Message({ type = 'info', children }) {
  const colors = {
    error: '#f44336',
    success: '#4caf50',
    info: '#2196f3',
  }

  const color = colors[type] || colors.info
  const bgColor = `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(color.slice(3, 5), 16)},${parseInt(color.slice(5, 7), 16)},0.1)`

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: color,
        padding: '12px 16px',
        borderRadius: '8px',
        border: `1px solid ${color}`,
        marginBottom: '16px',
        fontSize: '14px',
      }}
    >
      {children}
    </div>
  )
}
