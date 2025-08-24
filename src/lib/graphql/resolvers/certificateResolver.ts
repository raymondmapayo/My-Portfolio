import fs from "fs";
import path from "path";

const certificateFilePath = path.resolve(
  process.cwd(),
  "dist/certificates.json"
);

interface Certificate {
  id: number;
  title: string;
  organization: string;
  dateIssued: string;
  certificateImage: string;
  avatarImage: string;
  certificateLink: string;
}

let certificates: Certificate[] = [];
if (fs.existsSync(certificateFilePath)) {
  try {
    certificates = JSON.parse(fs.readFileSync(certificateFilePath, "utf-8"));
    if (!Array.isArray(certificates)) certificates = [];
  } catch {
    certificates = [];
  }
}

let lastId =
  certificates.length > 0 ? Math.max(...certificates.map((c) => c.id)) : 0;

const save = () => {
  fs.mkdirSync(path.dirname(certificateFilePath), { recursive: true });
  fs.writeFileSync(
    certificateFilePath,
    JSON.stringify(certificates, null, 2),
    "utf-8"
  );
};

export const certificateResolver = {
  Query: {
    getCertificates: () => certificates,
    getCertificateById: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      return certificates.find((c) => c.id === id) || null;
    },
  },
  Mutation: {
    createCertificate: (_: any, args: { input: Omit<Certificate, "id"> }) => {
      lastId += 1;
      const newCert: Certificate = { id: lastId, ...args.input };
      certificates.push(newCert);
      save();
      return newCert;
    },
    updateCertificate: (
      _: any,
      args: { id: string | number; input: Omit<Certificate, "id"> }
    ) => {
      const id = Number(args.id);
      const cert = certificates.find((c) => c.id === id);
      if (!cert) throw new Error("Certificate not found");
      Object.assign(cert, args.input);
      save();
      return cert;
    },
    deleteCertificate: (_: any, args: { id: string | number }) => {
      const id = Number(args.id);
      const idx = certificates.findIndex((c) => c.id === id);
      if (idx === -1) throw new Error("Certificate not found");
      certificates.splice(idx, 1);
      save();
      return true;
    },
  },
};
