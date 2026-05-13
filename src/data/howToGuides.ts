export interface HowToGuide {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: string;
  prerequisites: string[];
  steps: { title: string; description: string }[];
  links: { label: string; url: string }[];
  tags: string[];
}

export const howToGuides: HowToGuide[] = [
  {
    id: 'ollama',
    name: 'Ollama',
    description: 'Run large language models locally on your machine. Simple CLI tool that makes it easy to download and run models like Llama 2, Mistral, and more.',
    icon: '🦙',
    difficulty: 'beginner',
    timeToComplete: '10 minutes',
    prerequisites: [
      'macOS, Linux, or Windows (with WSL2)',
      '8GB+ RAM recommended',
      '10GB+ free disk space'
    ],
    steps: [
      {
        title: 'Install Ollama',
        description: 'Download from ollama.ai or run: curl -fsSL https://ollama.ai/install.sh | sh'
      },
      {
        title: 'Pull a model',
        description: 'Run: ollama pull llama2 (or mistral, codellama, etc.)'
      },
      {
        title: 'Start chatting',
        description: 'Run: ollama run llama2 - Start an interactive chat session'
      },
      {
        title: 'Use the API',
        description: 'Ollama runs a local API at http://localhost:11434 - Compatible with OpenAI API format'
      }
    ],
    links: [
      { label: 'Official Website', url: 'https://ollama.ai' },
      { label: 'Model Library', url: 'https://ollama.ai/library' },
      { label: 'GitHub', url: 'https://github.com/ollama/ollama' }
    ],
    tags: ['LLM', 'Local', 'CLI', 'API']
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    description: 'Desktop app to discover, download, and run local LLMs with a beautiful UI. No terminal required - perfect for beginners.',
    icon: '🎛️',
    difficulty: 'beginner',
    timeToComplete: '15 minutes',
    prerequisites: [
      'macOS (Apple Silicon or Intel) or Windows',
      '16GB+ RAM recommended for larger models',
      'GPU optional but recommended'
    ],
    steps: [
      {
        title: 'Download LM Studio',
        description: 'Visit lmstudio.ai and download the installer for your OS'
      },
      {
        title: 'Browse models',
        description: 'Use the built-in model browser to search and download models from Hugging Face'
      },
      {
        title: 'Load a model',
        description: 'Select a downloaded model and click Load - wait for it to initialize'
      },
      {
        title: 'Start chatting',
        description: 'Use the chat interface or enable the local server for API access'
      }
    ],
    links: [
      { label: 'Official Website', url: 'https://lmstudio.ai' },
      { label: 'Discord Community', url: 'https://discord.gg/lmstudio' }
    ],
    tags: ['LLM', 'Desktop', 'GUI', 'Beginner-Friendly']
  },
  {
    id: 'comfyui',
    name: 'ComfyUI',
    description: 'Powerful node-based UI for Stable Diffusion. Create complex image generation workflows with a visual interface.',
    icon: '🎨',
    difficulty: 'intermediate',
    timeToComplete: '30 minutes',
    prerequisites: [
      'Python 3.10+',
      'NVIDIA GPU with 6GB+ VRAM (or CPU mode)',
      'Git installed'
    ],
    steps: [
      {
        title: 'Clone the repo',
        description: 'git clone https://github.com/comfyanonymous/ComfyUI.git'
      },
      {
        title: 'Install dependencies',
        description: 'pip install -r requirements.txt (use venv recommended)'
      },
      {
        title: 'Download models',
        description: 'Place SD checkpoints in models/checkpoints folder'
      },
      {
        title: 'Launch ComfyUI',
        description: 'python main.py - Opens web UI at http://127.0.0.1:8188'
      },
      {
        title: 'Build workflows',
        description: 'Connect nodes to create image generation pipelines - start with default workflow'
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/comfyanonymous/ComfyUI' },
      { label: 'ComfyUI Manager', url: 'https://github.com/ltdrdata/ComfyUI-Manager' },
      { label: 'Workflow Examples', url: 'https://comfyworkflows.com' }
    ],
    tags: ['Stable Diffusion', 'Image Gen', 'Nodes', 'Workflows']
  },
  {
    id: 'automatic1111',
    name: 'Automatic1111 WebUI',
    description: 'The most popular Stable Diffusion web interface. Feature-rich with extensions, LoRA support, and advanced settings.',
    icon: '🖼️',
    difficulty: 'intermediate',
    timeToComplete: '45 minutes',
    prerequisites: [
      'Python 3.10.6',
      'NVIDIA GPU with 4GB+ VRAM',
      'Git installed'
    ],
    steps: [
      {
        title: 'Clone repository',
        description: 'git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git'
      },
      {
        title: 'Download a model',
        description: 'Get SD 1.5 or SDXL checkpoint from civitai.com or Hugging Face'
      },
      {
        title: 'Place model files',
        description: 'Put .safetensors in models/Stable-diffusion folder'
      },
      {
        title: 'Run webui',
        description: 'Windows: webui-user.bat | Linux/Mac: ./webui.sh'
      },
      {
        title: 'Access the UI',
        description: 'Open http://127.0.0.1:7860 in your browser'
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui' },
      { label: 'Wiki', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki' },
      { label: 'CivitAI Models', url: 'https://civitai.com' }
    ],
    tags: ['Stable Diffusion', 'WebUI', 'Extensions', 'LoRA']
  },
  {
    id: 'open-interpreter',
    name: 'Open Interpreter',
    description: 'Let AI execute code on your computer. Chat with your terminal to run Python, shell commands, and more.',
    icon: '💻',
    difficulty: 'beginner',
    timeToComplete: '5 minutes',
    prerequisites: [
      'Python 3.10+',
      'OpenAI API key (or local LLM setup)',
      'pip installed'
    ],
    steps: [
      {
        title: 'Install via pip',
        description: 'pip install open-interpreter'
      },
      {
        title: 'Set API key',
        description: 'export OPENAI_API_KEY=your-key-here (or use local mode)'
      },
      {
        title: 'Launch interpreter',
        description: 'Run: interpreter - starts interactive session'
      },
      {
        title: 'Chat and execute',
        description: 'Ask it to write and run code - it will ask for permission before executing'
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/OpenInterpreter/open-interpreter' },
      { label: 'Documentation', url: 'https://docs.openinterpreter.com' }
    ],
    tags: ['CLI', 'Code Execution', 'Agent', 'Automation']
  },
  {
    id: 'localai',
    name: 'LocalAI',
    description: 'OpenAI API compatible server for running LLMs, image generation, and audio models locally. Drop-in replacement for OpenAI.',
    icon: '🏠',
    difficulty: 'intermediate',
    timeToComplete: '20 minutes',
    prerequisites: [
      'Docker installed',
      '8GB+ RAM',
      'GPU optional (CUDA or Metal supported)'
    ],
    steps: [
      {
        title: 'Run with Docker',
        description: 'docker run -p 8080:8080 --name local-ai -ti localai/localai:latest-aio-cpu'
      },
      {
        title: 'Download models',
        description: 'Models auto-download on first use, or pre-download from gallery'
      },
      {
        title: 'Test the API',
        description: 'curl http://localhost:8080/v1/models - should return model list'
      },
      {
        title: 'Use with existing tools',
        description: 'Point OpenAI SDK to http://localhost:8080 - works with LangChain, etc.'
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/mudler/LocalAI' },
      { label: 'Model Gallery', url: 'https://localai.io/models/' },
      { label: 'Documentation', url: 'https://localai.io' }
    ],
    tags: ['API', 'Docker', 'OpenAI Compatible', 'Self-hosted']
  },
  {
    id: 'text-gen-webui',
    name: 'Text Generation WebUI',
    description: 'Feature-rich Gradio interface for running LLMs. Supports many model formats and has extensive customization options.',
    icon: '📝',
    difficulty: 'intermediate',
    timeToComplete: '30 minutes',
    prerequisites: [
      'Python 3.10+',
      'NVIDIA GPU with 6GB+ VRAM recommended',
      'Git installed'
    ],
    steps: [
      {
        title: 'Clone the repository',
        description: 'git clone https://github.com/oobabooga/text-generation-webui.git'
      },
      {
        title: 'Run the installer',
        description: 'Windows: start_windows.bat | Linux: ./start_linux.sh | Mac: ./start_macos.sh'
      },
      {
        title: 'Download models',
        description: 'Use the Model tab to download from Hugging Face, or place files in models folder'
      },
      {
        title: 'Load and chat',
        description: 'Select model, click Load, then use Chat tab for conversations'
      }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/oobabooga/text-generation-webui' },
      { label: 'Wiki', url: 'https://github.com/oobabooga/text-generation-webui/wiki' }
    ],
    tags: ['LLM', 'WebUI', 'Gradio', 'GGUF']
  },
  {
    id: 'gpt4all',
    name: 'GPT4All',
    description: 'Easy-to-use desktop chatbot that runs offline. No technical setup required - just download and run.',
    icon: '🤖',
    difficulty: 'beginner',
    timeToComplete: '5 minutes',
    prerequisites: [
      'Windows, macOS, or Linux',
      '8GB RAM minimum',
      '5GB free disk space'
    ],
    steps: [
      {
        title: 'Download installer',
        description: 'Visit gpt4all.io and download for your operating system'
      },
      {
        title: 'Install the app',
        description: 'Run the installer - no additional setup needed'
      },
      {
        title: 'Choose a model',
        description: 'On first launch, select and download a model (Mistral recommended)'
      },
      {
        title: 'Start chatting',
        description: 'Everything runs locally - no internet required after download'
      }
    ],
    links: [
      { label: 'Official Website', url: 'https://gpt4all.io' },
      { label: 'GitHub', url: 'https://github.com/nomic-ai/gpt4all' }
    ],
    tags: ['Desktop', 'Offline', 'Beginner-Friendly', 'Privacy']
  }
];
