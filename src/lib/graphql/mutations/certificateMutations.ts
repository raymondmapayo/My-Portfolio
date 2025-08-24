import { gql } from "@apollo/client";

export const CREATE_CERTIFICATE = gql`
  mutation CreateCertificate(
    $title: String!
    $organization: String!
    $dateIssued: String!
    $certificateImage: String!
    $avatarImage: String!
    $certificateLink: String!
  ) {
    createCertificate(
      title: $title
      organization: $organization
      dateIssued: $dateIssued
      certificateImage: $certificateImage
      avatarImage: $avatarImage
      certificateLink: $certificateLink
    ) {
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

export const UPDATE_CERTIFICATE = gql`
  mutation UpdateCertificate(
    $id: ID!
    $title: String
    $organization: String
    $dateIssued: String
    $certificateImage: String
    $avatarImage: String
    $certificateLink: String
  ) {
    updateCertificate(
      id: $id
      title: $title
      organization: $organization
      dateIssued: $dateIssued
      certificateImage: $certificateImage
      avatarImage: $avatarImage
      certificateLink: $certificateLink
    ) {
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

export const DELETE_CERTIFICATE = gql`
  mutation DeleteCertificate($id: ID!) {
    deleteCertificate(id: $id)
  }
`;
