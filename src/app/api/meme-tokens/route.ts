import { NextResponse } from 'next/server'

type MemeToken = {
  id: string
  name: string
  votes: number
}

let tokens: MemeToken[] = []

export async function GET() {
  return NextResponse.json(tokens)
}

export async function POST(request: Request) {
  const newToken: Omit<MemeToken, 'id' | 'votes'> = await request.json()
  const token: MemeToken = {
    id: Date.now().toString(),
    name: newToken.name,
    votes: 0
  }
  tokens.push(token)
  return NextResponse.json(token, { status: 201 })
}

export async function PUT(request: Request) {
  const { id }: { id: string } = await request.json()
  const token = tokens.find(t => t.id === id)
  if (token) {
    token.votes++
    return NextResponse.json(token)
  }
  return NextResponse.json({ error: 'Token not found' }, { status: 404 })
}