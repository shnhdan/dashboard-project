'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageAggregator } from './message-aggregator'
import { TaskManager } from './task-manager'
import { MemeTokenVoting } from './meme-token-voting'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("messages")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All-in-One Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="meme-tokens">Meme Tokens</TabsTrigger>
        </TabsList>
        <TabsContent value="messages">
          <MessageAggregator />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskManager />
        </TabsContent>
        <TabsContent value="meme-tokens">
          <MemeTokenVoting />
        </TabsContent>
      </Tabs>
    </div>
  )
}