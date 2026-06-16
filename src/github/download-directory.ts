const OWNER = "EliotyKid";
const REPO = "IuuaI-Components";
const BRANCH = "main";

export async function getDirectoryContents(path: string) {
  const url =
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;

  const response = await fetch(url);

  return response.json();
}