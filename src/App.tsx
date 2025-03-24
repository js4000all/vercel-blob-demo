import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [key, setKey] = useState('');
  const [content, setContent] = useState('');
  const [fetched, setFetched] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    setMessage('Uploading...');
    try {
      const res = await fetch('/api/save-blob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, content }),
      });
      const data = await res.json();
      setMessage(`✅ Uploaded: ${data.url}`);
    } catch (err) {
      setMessage('❌ Upload failed');
    }
  };

  const handleDownload = async () => {
    setMessage('Downloading...');
    try {
      const res = await fetch(`/api/head-blob?key=${encodeURIComponent(key)}`);
      const data = await res.json();
      const fileRes = await fetch(data.url);
      const text = await fileRes.text();
      setFetched(text);
      setMessage('✅ Download complete');
    } catch (err) {
      setMessage('❌ Download failed');
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>🗂 Vercel Blob Demo</h1>
      <div className="card">
        <label>
          ファイル名（key）: <br />
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="example.txt"
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <br /><br />

        <label>
          ファイル内容（content）: <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <br /><br />

        <button onClick={handleUpload} style={{ marginRight: 10 }}>
          ⬆️ アップロード
        </button>
        <button onClick={handleDownload}>
          ⬇️ 読み取り
        </button>

        <p>{message}</p>

        {fetched && (
          <>
            <h3>📄 読み取った内容：</h3>
            <pre style={{ background: '#f4f4f4', padding: 10 }}>{fetched}</pre>
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
