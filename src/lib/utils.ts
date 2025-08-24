export const classNames = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");
