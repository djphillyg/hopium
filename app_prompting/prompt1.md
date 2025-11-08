
<goal>
write an emergent prompt for my hopium app.
</goal>


<guidelines>
- it should follow the guidelines closely outlined in here https://help.emergent.sh/articles/169224-guide-to-prompt
</guidelines>

<important_tips>
IMPORTANT Tips -
after the first prompt, tell the agent to build in phases. Product development is an iterative process, and even AI cannot build 10 features at once - just like human developer teams. Do not tell the agent multiple features at once after initial prompt, and fix bugs one by one as well.
Build 1 feature after another, and dont move to the next one till you are satisfied with the previous.
Use rollback when the agent says it has fixed a bug but it hasnt really fixed it. A rollback of code + messages will clear the context and the agent will get it right on the next attempt with a slightly more descriptive prompt of the same issue. Trust me, it works - do not fall for sunken cost fallacy, and do a rollback.
Fork when you reach a version that you like and where features work well. Or push to GitHub. Its a good idea to maintain working versions of code like checkpoints.
</important_tips>

guidelines.
1. read and reference the hopium-vibecon-mvp-guide.md
2. generate a prompt to start to iteratively build this app

return back a prompt to feed into the emergent system. it should be concise, no more than 100 words.