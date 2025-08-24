import { gql } from "@apollo/client";

export const SEND_EMAIL = gql`
  mutation SendEmail($name: String!, $email: String!, $message: String!) {
    sendEmail(name: $name, email: $email, message: $message)
  }
`;
