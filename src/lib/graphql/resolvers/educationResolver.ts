import fs from "fs";
import path from "path";

const educationFilePath = path.resolve(process.cwd(), "dist/educations.json");

interface Education {
  id: number;
  title: string;
  institution: string;
  gwa: string;
  date: string;
  logo: string;
  details: string[];
}

let educations: Education[] = [];
if (fs.existsSync(educationFilePath)) {
  try {
    educations = JSON.parse(fs.readFileSync(educationFilePath, "utf-8"));
    if (!Array.isArray(educations)) educations = [];
  } catch {
    educations = [];
  }
}

let lastId =
  educations.length > 0 ? Math.max(...educations.map((e) => e.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(educationFilePath), { recursive: true });
  fs.writeFileSync(
    educationFilePath,
    JSON.stringify(educations, null, 2),
    "utf-8"
  );
};

export const educationResolver = {
  Query: {
    getEducations: () => educations,
    getEducationById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return educations.find((e) => e.id === id) || null;
    },
  },
  Mutation: {
    createEducation: (_: any, args: Omit<Education, "id">) => {
      lastId += 1;
      const newEdu: Education = {
        id: lastId,
        ...args,
        gwa: args.gwa || "", // default to empty string if not provided
      };
      educations.push(newEdu);
      save();
      return newEdu;
    },
    updateEducation: (
      _: any,
      args: Partial<Education> & { id: number | string }
    ) => {
      const id = Number(args.id);
      const edu = educations.find((e) => e.id === id);
      if (!edu) throw new Error("Education not found");

      // Only update gwa if provided; leave old value if undefined
      if (args.gwa === undefined) {
        delete args.gwa;
      }

      Object.assign(edu, args);
      save();
      return edu;
    },
    deleteEducation: (_: any, args: { id: number | string }) => {
      const id = Number(args.id);
      const index = educations.findIndex((e) => e.id === id);
      if (index === -1) throw new Error("Education not found");

      educations.splice(index, 1);
      save();
      return true;
    },
  },
};
