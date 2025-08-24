export interface Experience {
  id: string | number;
  title: string;
  business: string;
  location: string;
  date: string;
  image: string;
  details: string[];
}

const experienceData: Experience[] = [
  {
    id: 1,
    title: "Full-Stack Developer",
    business: "Jgaa Restaurant",
    location: "Davao City, Philippines",
    date: "Jun 2024 - Present",
    image: "/logo.jpg",
    details: [
      "Worked as a Full-Stack Developer at Jgaa Restaurant located in Davao City, Philippines from Jun 2024 - Present, contributing to web and application development projects. Designed responsive and interactive web interfaces using React, Tailwind CSS, Ant Design, and styled-components. Developed backend APIs and server-side logic with Node.js and Express, ensuring efficient communication with MySQL databases.",
      "Set up modern development environments and tooling using Vite for faster builds and streamlined development. Ensured application security, scalability, and performance through best practices in full-stack development.",
      "Ensured security and performance of backend services.",
      "Ensured application security, scalability, and performance through best practices in full-stack development. Collaborated with cross-functional teams, including designers and stakeholders, to deliver projects on time and meet business requirements.",
    ],
  },
  {
    id: "2",
    title: "Front-End Developer",
    business: "ND-MAK School System",
    location: "Makilala, North Cotabato, Philippines",
    date: "Jun 2025 - Present",
    image: "/Ntredame.jpg",
    details: [
      "Worked as a Front-End Developer at NDMI School System located in North Cotabato, Mindanao from Jun 2025 - Present, contributing to web interface design and frontend development projects. Designed and implemented responsive and interactive web interfaces using React, Tailwind CSS, Ant Design, and styled-components, improving user engagement and accessibility. Collaborated with backend developers to integrate APIs built with Node.js and Express, ensuring smooth communication between frontend and backend services connected to MySQL databases.",
      "Set up modern development environments using Vite for faster builds, hot module replacement, and streamlined development workflows. Optimized frontend performance and accessibility to enhance the learning experience and administrative workflows. Worked closely with cross-functional teams, including designers and school administrators, to deliver projects on time and meet functional requirements.",
    ],
  },
];

export default experienceData;
