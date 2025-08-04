export interface ChatRequest {
  developer_message: string;
  user_message: string;
  model?: string;
  api_key: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://ai-chat-backend-3k7m.onrender.com/api') {
    this.baseUrl = baseUrl;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async sendMessage(
    request: ChatRequest,
    onChunk?: (chunk: string) => void
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        
        if (onChunk) {
          onChunk(chunk);
        }
      }

      return { content: fullContent };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const apiClient = new ApiClient(); 