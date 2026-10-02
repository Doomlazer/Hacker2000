# Hacker2000

Retro hacking simulation videogame with vector graphics.

IMPORTANT NOTICE TO THE PLAYER: Despite the fact this is a browser-based game, the simulated computers are created locally on your device. The pretend tools in this videogame, such as SSH, are NOT connecting over the internet to real computers. The DTMF tones from DIAL are NOT makeing real world phone calls. That said, this game does make real network connections for the command AUDIO, which streams music from real urls over the real world internet. Streaming Jungle music (and whatever URLs you add to the playlist) is the only network connection this game will make.

<img src="./pics/ssh.png" width="800" alt="SSH command tunneling through multible nodes"></img>
<img src="./pics/brute.png" width="800" alt="BRUTE command attempting to crack multible nodes, but with the windows spread apart casually"></img>
<img src="./pics/brute0.png" width="800" alt="BRUTE command attempting to crack multible nodes"></img>
<img src="./pics/cards.png" width="800" alt="DECK command playing solitaire"></img>

# Playable pre-alpha: [Click Here](https://doomlazer.github.io/Hacker2000)

Persistence is currently a work in progress. If the game will not load, trash the database in your browser's JS console with: 

indexedDB.deleteDatabase("VirtualFileSystemDB");

If the game will run, typing the command DELETEALL in-game will also reset everything.

LLM Disclosure: I hate 'AI', but when I started this project I thought it would be a good time to understand for myself the current capabilities and limitations of these tools. It's very likely that no matter what happens, we'll be stuck with LLMs for the rest of our lives. I'd hoped to find a balance where I could utilize the tool to speed up development on specific parts of code that were less interesting to implement, such as file system navigation. Instead, I find developing with an LLM to be mostly frustrating, and somewhat depressing. While I still strive to understand how I can leverage it as a tool, I have to admit that its use in this project has caused me to feel much more ambivalent about continuing. I struggle with the feeling that the project is tainted by LLM code and regret its inclusion. I like making games, not because I want others to play them, but because I enjoy the process of creating and it's a cathartic release from the stress and monotony of working for a living. Personally, at least at this time, I find LLMs diminish that enjoyment. This is not an apology for using 'AI', as I feel everyone should understand and experience what they are for themselves, but rather a lament that it has stolen some personal satisfaction by it's inclusion. Anyway, most of the game is hand written and those parts that aren't should be fairly obvious.
