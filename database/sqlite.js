let posts = [];
let id = 1;

export async function initDB(){
  if(posts.length===0){
    posts = [
      {
        id: id++, 
        user: 'AI Insider', 
        content: 'Breaking: A new open-source LLM just dropped and it outperforms GPT-4 in coding tasks. The future of open-source AI is here! 🤖💻 #AI #OpenSource', 
        likes: 1240, 
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        time: '30m ago'
      },
      {
        id: id++, 
        user: 'Neural Artist', 
        content: 'Generated this stunning neo-futuristic cityscape using Stable Diffusion 3. The level of detail on the lighting is insane. 🎨✨ #GenerativeAI #Art', 
        likes: 856, 
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        time: '2h ago'
      },
      {
        id: id++, 
        user: 'Visionary',
        content: 'Object detection in 2026 is reaching 99.9% accuracy. Self-driving cars are about to get a huge upgrade. 🚗👁️',
        likes: 541,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        time: '3h ago'
      },
      {
        id: id++, 
        user: 'Robotica', 
        content: 'Humanoid robots are now learning tasks by watching videos. We are closer to having household robot assistants than most people think. 🤖🏠', 
        likes: 432, 
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
        time: '5h ago'
      },
      {
        id: id++, 
        user: 'Ethics Guardian', 
        content: 'Important thread on AI bias and the need for more transparent training data. Let\'s build a future where AI works for everyone. 🌍🤝', 
        likes: 210, 
        time: '8h ago'
      },
      {
        id: id++, 
        user: 'Quantum Dev', 
        content: 'Exploring the intersection of Quantum Computing and Neural Networks. The speedups for certain optimization problems are theoretical miracles. ⚛️🧠', 
        likes: 315, 
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
        time: '12h ago'
      },
      {
        id: id++, 
        user: 'Deep Mindset',
        content: 'Is AGI closer than we think? The latest reinforcement learning breakthroughs suggest we might be seeing sparks of agency. ⚡🤖',
        likes: 980,
        time: '15h ago'
      },
      {
        id: id++, 
        user: 'Code Wizard',
        content: 'Copilot and Cursor are cool, but have you seen the new AI that writes entire system architectures from a single prompt? 🏗️💻',
        likes: 672,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        time: '18h ago'
      },
      {
        id: id++, 
        user: 'ML Engineer',
        content: 'Fine-tuning a Llama-3 model on a 4090. The efficiency of Quantization is a game changer for local AI development. 🛠️🧠',
        likes: 245,
        time: '1d ago'
      },
      {
        id: id++, 
        user: 'Futurist',
        content: 'The 2030s will be the decade of AI-human symbiosis. Are you ready for the augmentation? 🦾🧠',
        likes: 1540,
        image: 'https://images.unsplash.com/photo-1544006659-f0b21884cb1d?auto=format&fit=crop&w=800&q=80',
        time: '2d ago'
      },
    ];
  }
}
export async function getPosts(){ return [...posts].reverse(); }
export async function addPost(user, content){ 
  posts.push({
    id:id++, 
    user, 
    content, 
    likes:0, 
    time: 'Just now'
  }); 
}
export async function likePost(postId){
  posts = posts.map(p => p.id===postId ? {...p, likes:p.likes+1} : p);
}
