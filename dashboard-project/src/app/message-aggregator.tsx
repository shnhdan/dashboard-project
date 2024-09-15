import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Message = {
  id: string
  platform: string
  sender: string
  content: string
  timestamp: Date
}

export function MessageAggregator() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const fetchedMessages: Message[] = [
          { id: '1', platform: 'WhatsApp', sender: 'John', content: 'Hello there!', timestamp: new Date() },
          { id: '2', platform: 'Slack', sender: 'Jane', content: 'Meeting at 3 PM', timestamp: new Date() },
          { id: '3', platform: 'Telegram', sender: 'Bob', content: 'Check this out!', timestamp: new Date() },
        ]
        setMessages(fetchedMessages)
      } catch (err) {
        setError('Failed to fetch messages')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        platform: 'Dashboard',
        sender: 'You',
        content: newMessage,
        timestamp: new Date(),
      }
      setMessages(prevMessages => [...prevMessages, message])
      setNewMessage('')
    }
  }

  if (isLoading) return <div>Loading messages...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Messages</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="p-2 bg-gray-100 rounded">
            <p className="font-semibold">{message.platform} - {message.sender}</p>
            <p>{message.content}</p>
            <p className="text-sm text-gray-500">{message.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  )
}