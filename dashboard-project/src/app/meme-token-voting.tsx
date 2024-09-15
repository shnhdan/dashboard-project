import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type MemeToken = {
  id: string
  name: string
  votes: number
}

export function MemeTokenVoting() {
  const [tokens, setTokens] = useState<MemeToken[]>([])
  const [newToken, setNewToken] = useState('')

  const handleAddToken = () => {
    if (newToken.trim()) {
      const token: MemeToken = {
        id: Date.now().toString(),
        name: newToken,
        votes: 0,
      }
      setTokens(prevTokens => [...prevTokens, token])
      setNewToken('')
    }
  }

  const handleVote = (id: string) => {
    setTokens(prevTokens => prevTokens.map(token => 
      token.id === id ? { ...token, votes: token.votes + 1 } : token
    ))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Meme Token Voting</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tokens.map((token) => (
          <div key={token.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <span>{token.name}</span>
            <div>
              <span className="mr-2">Votes: {token.votes}</span>
              <Button onClick={() => handleVote(token.id)}>Vote</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)}
          placeholder="Add a new meme token..."
        />
        <Button onClick={handleAddToken}>Add Token</Button>
      </div>
    </div>
  )
}