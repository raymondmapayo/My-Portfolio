import { gql } from "@apollo/client";

export const GET_CERTIFICATES = gql`
  query GetCertificates {
    getCertificates {
      id
      title
      organization
      dateIssued
      certificateImage
      avatarImage
      certificateLink
    }
  }
`;

export const GET_CERTIFICATE_BY_ID = gql`
  query GetCertificateById($id: ID!) {
    getCertificateById(id: $id) {
      id
      title
      organization
      dateIssued
      certificateImage
      avatarImage
      certificateLink
    }
  }
`;
