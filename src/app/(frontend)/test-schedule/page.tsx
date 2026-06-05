// app/(dashboard)/test-schedule/page.tsx
'use client'

import { testGenerate } from 'actions/test-schedule'
import { useState } from 'react'

export default function TestSchedulePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    try {
      // Kendi grup ID'nizi yazın
      const data = await testGenerate() // Haziran 2026
      setResult(data)
    } catch (err) {
      console.error(err)
      setResult({ error: String(err) })
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Nöbet Test</h1>

      <button
        onClick={handleTest}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Test Ediliyor...' : 'Test Et'}
      </button>

      {result && (
        <div className="mt-4 p-4 rounded overflow-auto max-h-full">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
