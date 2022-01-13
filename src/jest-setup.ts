export default async function () {}

jest.mock("react-markdown", () => () => {});
jest.mock("rehype-slug", () => () => {});
jest.mock("rehype-raw", () => () => {});
jest.mock("rehype-attr", () => () => {});
jest.mock("rehype-rewrite", () => () => {});
jest.mock("remark-gfm", () => () => {});
jest.mock("rehype", () => () => {});
jest.mock("rehype-autolink-headings", () => () => {});
