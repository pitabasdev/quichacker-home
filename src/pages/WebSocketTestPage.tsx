import { useEffect, useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
// Use a simple div instead of ScrollArea to avoid potential hook issues
// import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';

interface Message {
  type: string;
  message?: string;
  sender?: string;
  timestamp: string;
}

export default function WebSocketTestPage() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    // Connect to the WebSocket server
    const connectWebSocket = () => {
      try {
        // Determine the correct protocol based on the current page protocol
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws`;
        
        console.log(`Connecting to WebSocket at ${wsUrl}`);
        const socket = new WebSocket(wsUrl);
        
        socket.onopen = () => {
          console.log('WebSocket connection established');
          setConnected(true);
          setConnectionStatus('Connected');
        };
        
        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as Message;
            console.log('WebSocket message received:', data);
            setMessages((prev) => [...prev, data]);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        socket.onclose = () => {
          console.log('WebSocket connection closed');
          setConnected(false);
          setConnectionStatus('Disconnected');
          // Try to reconnect after a delay
          setTimeout(connectWebSocket, 5000);
        };
        
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('Error');
        };
        
        socketRef.current = socket;
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        setConnectionStatus('Error');
        // Try to reconnect after a delay
        setTimeout(connectWebSocket, 5000);
      }
    };
    
    connectWebSocket();
    
    return () => {
      // Close the connection when component unmounts
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  
  const handleSendMessage = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN || !message.trim()) {
      return;
    }
    
    const messageData = {
      type: 'chat',
      message: message.trim(),
      sender: 'User',
      timestamp: new Date().toISOString()
    };
    
    socketRef.current.send(JSON.stringify(messageData));
    setMessage('');
  };
  
  const handleSendPing = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    
    const pingData = {
      type: 'ping',
      timestamp: new Date().toISOString()
    };
    
    socketRef.current.send(JSON.stringify(pingData));
  };
  
  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'Connected':
        return 'bg-green-500';
      case 'Disconnected':
        return 'bg-red-500';
      case 'Error':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="bg-black/50 border-[#4f46e5]/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl text-white bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            WebSocket Test Console
          </CardTitle>
          <CardDescription className="text-gray-300">
            Test real-time communication through WebSockets
          </CardDescription>
          <div className="flex items-center mt-2">
            <Badge className={`${getConnectionStatusColor()} mr-2`}>
              {connectionStatus}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="h-[400px] overflow-y-auto border border-gray-800 rounded-md p-4 bg-black/60">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p>No messages yet. Send a message to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg ${
                      msg.type === 'chat' ? 'bg-indigo-900/50 border border-indigo-500/50' :
                      msg.type === 'welcome' ? 'bg-green-900/50 border border-green-500/50' :
                      msg.type === 'pong' ? 'bg-blue-900/50 border border-blue-500/50' :
                      'bg-gray-900/50 border border-gray-500/50'
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <Badge variant="outline" className="text-xs">
                        {msg.type}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-white">{msg.message}</p>
                    {msg.sender && <p className="text-xs text-gray-300 mt-1">From: {msg.sender}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1 bg-black/50 text-white border-gray-700"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!connected}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Send
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button 
              variant="outline" 
              onClick={handleSendPing}
              disabled={!connected}
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30"
            >
              Send Ping
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setMessages([])}
              className="border-red-500 text-red-400 hover:bg-red-950/30"
            >
              Clear Console
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}