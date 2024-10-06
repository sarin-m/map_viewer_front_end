export default function Login() {
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <p>User Id:</p>
            <input
            type="text"
            ref={userIdRef}
            placeholder="Please enter the user Id"
            />
      </div>
    )
}