// src/schema/MyBlog.ts

const myBlogData = [
  {
    id: 1,
    date: "Aug 19, 2025",
    time: "3:11 PM",
    title: "How I Finally Landed as Full-Stack Developer Role",
    image: "/maps_image.jpg",
    contentBlocks: [
      {
        type: "text",
        text: "When I started my first year in BSIT (Bachelor of Science in Information Technology) at the University of Mindanao, I was extremely nervous. The course was called IT, which meant coding, and I had absolutely no prior knowledge or experience in programming. I remember feeling intimidated by the complexity of the subjects and wondering if I even belonged there. In our first class, the teacher asked us to create a simple program like `Hello World`[Hahaha...]. I followed the instructions exactly, while some of my classmates tried to make theirs more stylish and attractive. It was just `Hello World`, but I realized early on that I didn’t need to compare myself to others—I just needed to focus on learning and improving step by step. ",
      },
      {
        type: "text",
        text: "After that, our teacher asked us to do a design project. I really had no idea what to do, so I ended up copying my classmate’s work [Hahaha]. But I didn’t just copy it—I made some changes to the design to make it my own. At that moment, I understood the importance of observation, creativity, and making something uniquely yours, even when starting from scratch. Then came a bigger challenge: a project that required using MySQL Xampp. At first, I was completely lost. I had no idea how databases worked, but I refused to give up. I watched countless tutorials on YouTube, searched through Google, and experimented with queries until I finally understood it. The project wasn’t perfect, but the satisfaction of solving problems and seeing my system work motivated me to keep going.",
      },
      {
        type: "text",
        text: "By the third year of college, I challenged myself further. I created a full system where I handled both the frontend and backend—doing everything from scratch like a true full-stack developer. Honestly, I didn’t think I could do it alone because I used to focus more on documentation than coding. But pushing myself outside my comfort zone taught me resilience, patience, and the value of persistence. Along the way, I learned that mistakes aren’t failures—they are lessons. Every time I got stuck, every time my code didn’t work, I learned something new. I also learned the importance of asking questions, seeking help, and never being afraid to experiment.",
      },
      {
        type: "text",
        text: "Today, I am proud to call myself a full-stack developer. The road wasn’t easy, but it was worth every late night, every challenge, and every moment of self-doubt. And I know this is just the beginning—there are many more technologies to learn and new challenges to conquer in the future.",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    date: "Aug 19, 2025",
    time: "5:00 PM",
    title: "My Journey into Modern Backend Development",
    image: "/sql-1.jpg",
    contentBlocks: [
      {
        type: "text",
        text: "When I first started exploring web development, I was fascinated by how data moves from the user interface to the server and back. Initially, it felt overwhelming—APIs, databases, authentication, servers… everything seemed complex. But step by step, I started building a foundation in backend development and learned how modern web applications truly function.",
      },
      {
        type: "text",
        text: " –Understanding the Backend",
      },
      {
        type: "text",
        text: "The backend is the engine of any web application. It handles data storage, server-side logic, authentication, and communication between the frontend and database. My first exposure was through simple CRUD applications, but over time I explored more modern tools and frameworks.",
      },
      {
        type: "text",
        text: " –Core Technologies I Learned",
      },
      {
        type: "text",
        text: "1. Node.js & Express.js – I learned how to create RESTful APIs, handle requests, and serve data to clients efficiently.",
      },
      {
        type: "text",
        text: "2. Databases –Imoved beyond MySQL to explore PostgreSQL and MongoDB, understanding relational vs. non-relational data structures.",
      },
      {
        type: "text",
        text: "3. Authentication & Security – Implementing JWT tokens, password hashing, and secure login systems taught me the importance of protecting user data.",
      },
      {
        type: "text",
        text: "4. Version Control & Deployment – Using GitHub and deploying applications to Heroku, Vercel, or Render made me realize the importance of CI/CD in modern development.",
      },
      {
        type: "text",
        text: "5. API Consumption & Integration – Learning to consume third-party APIs (like payment gateways or weather APIs) expanded my understanding of how modern apps integrate with external services.",
      },
      {
        type: "text",
        text: " – Practice Projects",
      },
      {
        type: "text",
        text: " I applied these skills to practical projects:",
      },
      {
        type: "text",
        text: "• Blog Platform – Full backend with user authentication, CRUD for posts, and database integration.",
      },
      {
        type: "text",
        text: "• Task Management App – Users could create, edit, and delete tasks, with real-time updates using WebSockets.",
      },
      {
        type: "text",
        text: "• E-commerce Backend – Products, categories, orders, and payment APIs handled entirely on the backend.",
      },
      {
        type: "text",
        text: "Backend development transformed the way I approach problem-solving. It’s more than coding—it’s about building scalable, efficient, and secure applications that can handle real users and data. From my first small project to fully functional applications today, the journey has been challenging, rewarding, and full of learning opportunities.",
      },
    ],
    featured: true,
  },
  {
    id: 3,
    date: "Aug 19, 2025",
    time: "7:50 PM",
    title: "Why I Chose React Web Development???",
    image: "/act-1.jpg",
    contentBlocks: [
      {
        type: "text",
        text: "In the 2nd semester, our teacher introduced us React. The lessons were quite complicated at first because it was a completely new concept—we had only used PHP before. When React was introduced, I decided to give it a try. Our first project was a basic real-time chat app using Socket.io, though it didn’t have any design yet.",
      },
      {
        type: "text",
        text: " As we started working on projects, I realized how powerful React could be. My first full project was a hotel management system. I wasn’t very skilled at the time, but over time, I practiced and became proficient in React. I learned the concepts of components, state management, and how to structure an application efficiently.",
      },
      {
        type: "text",
        text: "Later on, Node.js and Express.js were introduced to us for backend development. This opened a whole new world for me. I learned how to create servers, manage routes, handle APIs, and connect to databases. Combining React for the frontend and Node.js/Express.js for the backend helped me build fully functional, dynamic web applications.",
      },
      {
        type: "image",
        src: "/act-2.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: "Through continuous learning and experimentation, I gained the ability to design any interface, whether it’s a dashboard or a full website. This experience helped me become a mastered both frontend and backend development.",
      },
    ],
    featured: true,
  },
  {
    id: 4,
    date: "Aug 19, 2025",
    time: "9:30 PM",
    title: "What Friends For?",
    image: "/f-1.jpg",
    contentBlocks: [
      {
        type: "text",
        text: "Everyone needs friends, and this is especially true in programming. Friends are there to support each other, help troubleshoot problems, and share knowledge. In coding, it’s easy to get stuck on a bug or feel overwhelmed by a challenging concept—but having friends means you’re not alone. If you don’t know something, someone else probably does, and they are often willing to help.",
      },
      {
        type: "image",
        src: "/f-2.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: " Friendship in programming isn’t just about solving problems—it’s about learning together, sharing ideas, and growing as a team. Good friends encourage each other, celebrate successes, and provide guidance when things get tough. They motivate you to keep going when a project seems impossible and make the learning process fun and less stressful. Beyond coding, friends provide emotional support, share different perspectives, and push you to think creatively. They help you see mistakes as opportunities to improve rather than failures, and their feedback often makes your work stronger. Ultimately, friends turn challenges into opportunities, mistakes into lessons, and lonely struggles into shared victories. In programming and in life, friends are the people who help you become better, not just at your craft, but as a person.",
      },
      {
        type: "text",
        text: " ",
      },
      {
        type: "image",
        src: "/f-3.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: "Friendship is also about inspiration. Seeing a friend succeed or solve a problem can spark new ideas and motivate you to push your boundaries. They remind you that learning is a journey, not a race, and that everyone progresses at their own pace. Sharing your wins and losses with friends cultivates a supportive environment where everyone can thrive.",
      },
      {
        type: "video",
        src: "/f-5.mp4",
      },
      {
        type: "text",
        text: "Having friends also builds accountability. When you commit to a project or learning goal with someone else, you’re more likely to follow through. Friends can challenge you to try new technologies, collaborate on projects, or even start coding clubs or communities. The synergy created by a group of motivated friends can push your skills further than you ever thought possible.",
      },
      {
        type: "image",
        src: "/f-4.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: "In the end, friends are not just companions—they are partners in growth, cheerleaders in struggles, and collaborators in success. In programming and beyond, the connections you build can shape not only your career but also your mindset, creativity, and resilience. So, never underestimate the power of having good friends by your side—they make every challenge lighter and every achievement brighter.",
      },
    ],
    featured: true,
  },
  {
    id: 5,
    date: "Aug 20, 2025",
    time: "10:21 AM",
    title: "✨ I Built a Web App for My Girlfriend ✨",
    image: "/by-1.jpg",
    contentBlocks: [
      {
        type: "text",
        text: "I made a special web app for my beloved to show her how much I truly love her. 💖 This isn’t just a simple project—it’s a work of art created with love, passion, and dedication. Every detail was carefully thought out, not just to impress her, but to make her feel cherished.",
      },
      {
        type: "image",
        src: "/by-2.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "video",
        src: "/by-5.mp4",
      },
      {
        type: "text",
        text: " All of this is for her—especially the words I’ve written, which are true without a single lie. I saw in her a beautiful heart and a deep trust in the Lord, and that made me love her even more. ❤️ This web app comes straight from my heart. It’s more than just code—it’s a reflection of my feelings, a reminder of our beautiful moments together, and a symbol of how far love can inspire creativity. 💕",
      },
      {
        type: "text",
        text: " ",
      },
      {
        type: "image",
        src: "/by-3.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: "I hope this little creation inspires others too—not only to build amazing things with technology but also to use their skills to make someone they love feel truly special. 🌹✨",
      },
      {
        type: "image",
        src: "/by-6.jpg",
        alt: "Updated Image 1",
      },
      {
        type: "text",
        text: "I built this using GraphQL, Ant Design, CSS, and Styled Components—not just to showcase my skills, but to prove that even technology can carry a piece of my heart. Every line of code, every styled detail, and every interaction within this web app represents the love I have for her. It’s more than functions and components—it’s emotions translated into design, love expressed through logic, and devotion written in code.💻💞",
      },
    ],
    featured: true,
  },
  {
    id: 6,
    date: "May 17, 2024",
    time: "2:45 PM",
    title: "Open Source: Why I Started and What I Learned Along the Way",
    image: "/bl-3.jpg",
    contentBlocks: [
      {
        type: "text",
        text: " When I first discovered HackerRank,  I started practicing more and more. It became a place where I could improve my problem-solving skills, explore different challenges,and  sharpen my knowledge of my preferred languages. Over time, it turned into a consistent part of my learning journey and helped me grow as a developer.",
      },
      {
        type: "text",
        text: "● SQL (Advance)",
      },
      {
        type: "text",
        text: "● Frontend Developer (React) - (Role)",
      },
      {
        type: "text",
        text: "● CSS - (BASIC)",
      },
      {
        type: "text",
        text: "● JavaScript - (Basic & Intermediate)",
      },
      {
        type: "text",
        text: "● NodeJS  - (Basic)",
      },
      {
        type: "text",
        text: "● React  - (Basic)",
      },
      {
        type: "text",
        text: "The more problems I solved, the more confident I became in tackling real-world coding tasks. I also learned how to think critically, break down complex problems into smaller steps, and write cleaner, more efficient code. What began as a simple practice routine soon became one of the most valuable experiences in my path to becoming a better programmer.",
      },
      {
        type: "image",
        src: "/bl-4.jpg",
        alt: "Third Image",
      },
      {
        type: "text",
        text: "This kinds of learnings is not just a toy or something you try once and forget. It’s a real tool that pushes you to learn more and improve your coding strategies. Every challenge teaches you something new, whether it’s mastering algorithms, understanding data structures, or finding better ways to optimize solutions. ",
      },
      {
        type: "image",
        src: "/bl-1.jpg",
        alt: "Third Image",
      },
      {
        type: "image",
        src: "/bl-2.jpg",
        alt: "Third Image",
      },
      {
        type: "text",
        text: "Certificates are a great milestone along the way, serve as proof of your dedication, consistency, and skills, while also becoming an achievement you can proudly showcase in your professional journey and not but the least  each certificate marks progress — not just in coding, but in becoming a stronger and more confident developer.",
      },
    ],
    featured: false,
  },
];

export default myBlogData;
