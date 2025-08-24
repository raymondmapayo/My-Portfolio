export interface Education {
  id: string;
  title: string;
  institution: string;
  gwa: string;
  date: string;
  logo: string;
  details: string[];
}

const educationData: Education[] = [
  {
    id: "1",
    title: "Makilala Elementary School",
    institution: "Elemenatary Technology & Education",
    gwa: "",
    date: "Jun 2011 - Jun 2016",
    logo: "/Makilala.jpg",
    details: [
      "Graduated with Academic Distinction, learning basic web and database skills including HTML, CSS, SQL, and UI Design, along with relevant courses in Java, MySQL, and Web Design.",
    ],
  },
  {
    id: "3",
    title: "Notredame Of Makiala High School (K–12)",
    institution: "ND-MAK High (K-12)",
    gwa: "",
    date: "Jun 2016 - Jun 2021",
    logo: "/Ntredame.jpg",
    details: [
      "Completed Senior High School with STEM Strand, Dean’s Lister (2019–2021). Attended the computer lab and Techno Club, learning CSS, HTML, UI design, SQL, and school system design, while exploring programming patterns, algorithms, and problem-solving techniques.",
      "Engaged in projects like robotics, web development, database management, app prototyping, and advanced mathematics. Participated in coding challenges, collaborated with peers on software projects, and gained practical experience in system analysis and design.",
    ],
  },
  {
    id: "4",
    title: "University of Mindanao (College)",
    institution: "Bachelor of Science in Information Technology",
    gwa: "GWA: 1.5 / 1.00",
    date: "Aug 2021 - Jul 2025",
    logo: "/UM.jpg",
    details: [
      "Currently completing Bachelor of Science in Information Technology while self-studying to improve full-stack development skills. Preparing and developing capstone systems for clients using React, GraphQL, Node.js, Express.js, MySQL, styled-components, Ant Design, and other modern tools, learning continuously through hands-on projects.",
      "Gaining experience in designing system flows, UI/UX, and database structures, while exploring best practices for scalable and maintainable software development.",
    ],
  },
];

export default educationData;
