import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Task = {
  id: string
  content: string
  priority: 'low' | 'medium' | 'high'
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        content: newTask,
        priority: newPriority,
      }
      setTasks(prevTasks => [...prevTasks, task])
      setNewTask('')
      setNewPriority('medium')
    }
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return 'bg-green-200'
      case 'medium': return 'bg-yellow-200'
      case 'high': return 'bg-red-200'
      default: return 'bg-gray-200'
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tasks</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className={`p-2 rounded ${getPriorityColor(task.priority)}`}>
            <p>{task.content}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <Select value={newPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewPriority(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
    </div>
  )
}