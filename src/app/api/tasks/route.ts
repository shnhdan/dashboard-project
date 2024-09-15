import { NextResponse } from 'next/server'

type Task = {
  id: string
  content: string
  priority: 'low' | 'medium' | 'high'
}

let tasks: Task[] = []

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const newTask: Omit<Task, 'id'> = await request.json()
  const task: Task = {
    id: Date.now().toString(),
    content: newTask.content,
    priority: newTask.priority
  }
  tasks.push(task)
  return NextResponse.json(task, { status: 201 })
}