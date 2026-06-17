import axios from "axios";

const OWNER = "EliotyKid";
const REPO = "IuuaI-Design";
const BRANCH = "main";

const BASE =
`https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;

export async function getManifest(
  component: string
) {
  const url =
    `${BASE}/registry/${component}/component.json`;

  const { data } =
    await axios.get(url);

  return data;
}

export async function getFile(
  component: string,
  file: string
) {
  const url =
    `${BASE}/registry/${component}/${file}`;

  const { data } =
    await axios.get(url);

  return data;
}