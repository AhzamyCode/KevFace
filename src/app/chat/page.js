'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ChatPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (!chatContainerRef.current) return
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query) return
    const question = query
    setChatHistory((prev) => [...prev, { type: 'question', text: question }])
    setQuery('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question }),
      })
      const data = await res.json()
      const answer = data?.response || data?.answer || 'Gagal mendapatkan jawaban'
      setChatHistory((prev) => [...prev, { type: 'answer', text: answer }])
    } catch (err) {
      setChatHistory((prev) => [...prev, { type: 'answer', text: 'Terjadi error' }])
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => setChatHistory([])

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gray-900 text-green-100">
      <h1 className="text-2xl font-bold p-4 border-b border-gray-700 sticky top-0 bg-gray-900 ">
        Gemini Ai
      </h1>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {chatHistory.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded max-w-[80%] break-words ${
              item.type === 'question'
                ? 'bg-gray-700 self-start'
                : 'bg-green-700 self-end'
            }`}
          >
            <span className="font-semibold">
              {item.type === 'question' ? 'Question:' : 'Model:'}
            </span>{' '}
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  return !inline ? (
                    <pre className="bg-gray-800 p-2 rounded overflow-x-auto">
                      <code className="font-mono text-green-100">{children}</code>
                    </pre>
                  ) : (
                    <code className="bg-gray-700 px-1 rounded font-mono">{children}</code>
                  )
                },
                a({ node, ...props }) {
                  return (
                    <a
                      className="text-blue-400 hover:underline break-words"
                      {...props}
                    />
                  )
                },
              }}
            >
              {item.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-4 border-t border-gray-700 bg-gray-800 sticky bottom-0 z-10"
      >
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none"
          placeholder="Tulis pertanyaan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Kirim'}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-semibold"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </div>
  )
}
