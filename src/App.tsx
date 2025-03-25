import { useState } from 'react';

export default function App() {
  const [key, setKey] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [fetched, setFetched] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleUpload = async () => {
    setMessage('Uploading...');
    try {
      const res = await fetch('/api/put-blob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, content }),
      });
      const data = await res.json();
      setMessage(`✅ Uploaded: ${data.url}`);
    } catch {
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
    } catch {
      setMessage('❌ Download failed');
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🗂 Vercel Blob Demo</h1>
      <label>
        ファイル名: <br />
        <input value={key} onChange={(e) => setKey(e.target.value)} />
      </label>
      <br /><br />
      <label>
        内容: <br />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <br /><br />
      <button onClick={handleUpload}>⬆️ アップロード</button>
      <button onClick={handleDownload}>⬇️ 読み取り</button>
      <p>{message}</p>
      {fetched && (
        <>
          <h3>読み取った内容:</h3>
          <pre>{fetched}</pre>
        </>
      )}
    </main>
  );
}
