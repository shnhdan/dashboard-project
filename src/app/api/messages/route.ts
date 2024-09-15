import { NextResponse } from 'next/server'

let messages = [
  { id: '1', platform: 'WhatsApp', sender: 'John', content: 'Hello there!', timestamp: new Date().toISOString() },
  { id: '2', platform: 'Slack', sender: 'Jane', content: 'Meeting at 3 PM', timestamp: new Date().toISOString() },
  { id: '3', platform: 'Telegram', sender: 'Bob', content: 'Check this out!', timestamp: new Date().toISOString() },
]

export async function GET() {
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const newMessage = await request.json()
  newMessage.id = Date.now().toString()
  newMessage.timestamp = new Date().toISOString()
  messages.push(newMessage)
  return NextResponse.json(newMessage, { status: 201 })
}